import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

interface Todo {
    uuid: string;
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string;
    user_id: string;
}

interface User {
    id: string;
    full_name: string;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [status, setStatus] = useState<string>('');
    const [priority, setPriority] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [userId, setUserId] = useState<string>('');
    const [users, setUsers] = useState<User[]>([]);

    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<Todo | null>(null);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [todoToDelete, setTodoToDelete] = useState<string | null>(null);

    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/todos`);
                setTodos(response.data);
            } catch (error) {
                console.error('Failed to fetch todos:', error);
            }
        };

        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchTodos();
        fetchUsers();
    }, []);

    const addTodo = async () => {
        if (!title || !description || !status || !priority || !dueDate || !userId) {
            setAlert({ type: 'danger', message: 'All fields are required' });
            return;
        }

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/todos`, { title, description, status, priority, due_date: dueDate, user_id: userId });
            setTodos([...todos, { uuid: response.data.uuid, title, description, status, priority, due_date: dueDate, user_id: userId }]);
            setTitle('');
            setDescription('');
            setStatus('');
            setPriority('');
            setDueDate('');
            setUserId('');
            setAlert({ type: 'success', message: 'Todo added successfully!' });
        } catch (error) {
            console.error('Failed to add todo:', error);
            setAlert({ type: 'danger', message: 'Failed to add todo.' });
        }
    };

    const openDeleteModal = (uuid: string) => {
        setTodoToDelete(uuid);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setTodoToDelete(null);
    };

    const deleteTodo = async () => {
        if (!todoToDelete) return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${todoToDelete}`);
            setTodos(todos.filter(todo => todo.uuid !== todoToDelete));
            setTodoToDelete(null);
            setShowDeleteModal(false);
            setAlert({ type: 'success', message: 'Todo deleted successfully!' });
        } catch (error) {
            console.error('Failed to delete todo:', error);
            setAlert({ type: 'danger', message: 'Failed to delete todo.' });
        }
    };

    const openEditModal = (todo: Todo) => {
        setEditTodo(todo);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditTodo(null);
    };

    const updateTodo = async () => {
        if (!editTodo) return;

        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/todos/${editTodo.uuid}`, {
                title: editTodo.title,
                description: editTodo.description,
                status: editTodo.status,
                priority: editTodo.priority,
                due_date: editTodo.due_date,
                user_id: editTodo.user_id
            });

            setTodos(todos.map(todo => (todo.uuid === editTodo.uuid ? editTodo : todo)));
            closeEditModal();
            setAlert({ type: 'success', message: 'Todo updated successfully!' });
        } catch (error) {
            console.error('Failed to update todo:', error);
            setAlert({ type: 'danger', message: 'Failed to update todo.' });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editTodo) {
            setEditTodo({ ...editTodo, [name]: value });
        }
    };

    return (
        <>
            <div className='row'>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="title" className='form-label'>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter Title"
                            className='form-control'
                            autoFocus
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className='form-label'>Description</label>
                        <textarea
                            name="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter Description"
                            className='form-control'
                            cols={50}
                            rows={8}
                        />
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="status" className='form-label'>Status</label>
                        <select name="status" value={status} onChange={(e) => setStatus(e.target.value)} className='form-control'>
                            <option value="">- select -</option>
                            <option value="pending">Pending</option>
                            <option value="completed">Completed</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="priority" className='form-label'>Priority</label>
                        <select name="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className='form-control'>
                            <option value="">- select -</option>
                            <option value="low">Low</option>
                            <option value="medium">Medium</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="dueDate" className='form-label'>Due Date</label>
                        <input
                            type="date"
                            name="dueDate"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className='form-control'
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="userId" className='form-label'>User</label>
                        <select
                            name="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className='form-control'
                        >
                            <option value="">- select -</option>
                            {users.map(user => (
                                <option key={user.id} value={user.id}>
                                    ID{user.id}-{user.full_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <button className='mb-5 btn btn-primary' onClick={addTodo}>Add Todo</button>

            {alert && (
                <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
                    {alert.message}
                </Alert>
            )}

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Priority</th>
                            <th>Due Date</th>
                            <th>User</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {todos.map((todo, index) => (
                            <tr key={todo.uuid} className='text-nowrap'>
                                <td>{index + 1}</td>
                                <td>{todo.title}</td>
                                <td style={{
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    maxWidth: '250px'
                                }}>{todo.description}</td>
                                <td>{todo.status}</td>
                                <td>{todo.priority}</td>
                                <td>{todo.due_date}</td>
                                <td>{todo.user_id}</td>
                                <div className="btn-group" role="group" aria-label="Action buttons">
                                    <button className="btn btn-warning" onClick={() => openEditModal(todo)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => openDeleteModal(todo.uuid)}>Delete</button>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div >

            {/* Delete Modal */}
            < Modal show={showDeleteModal} onHide={closeDeleteModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Delete Todo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this todo?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={deleteTodo}>Delete</Button>
                </Modal.Footer>
            </Modal >

            {/* Edit Modal */}
            {
                editTodo && (
                    <Modal show={showEditModal} onHide={closeEditModal} size="lg">
                        <Modal.Header closeButton>
                            <Modal.Title>Edit Todo</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            {editTodo && (
                                <Form>
                                    <div className="row">
                                        <div className="col-md-6">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Title</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    name="title"
                                                    value={editTodo.title}
                                                    onChange={handleChange}
                                                    placeholder="Enter Title"
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Description</Form.Label>
                                                <Form.Control
                                                    as="textarea"
                                                    name="description"
                                                    value={editTodo.description}
                                                    onChange={handleChange}
                                                    placeholder="Enter Description"
                                                    rows={8}
                                                />
                                            </Form.Group>
                                        </div>
                                        <div className="col-md-6">
                                            <Form.Group className="mb-3">
                                                <Form.Label>Status</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="status"
                                                    value={editTodo.status}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">- select -</option>
                                                    <option value="pending">Pending</option>
                                                    <option value="completed">Completed</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Priority</Form.Label>
                                                <Form.Control
                                                    as="select"
                                                    name="priority"
                                                    value={editTodo.priority}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">- select -</option>
                                                    <option value="low">Low</option>
                                                    <option value="medium">Medium</option>
                                                    <option value="high">High</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Due Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    name="due_date"
                                                    value={editTodo.due_date}
                                                    onChange={handleChange}
                                                />
                                            </Form.Group>
                                            <Form.Group className="mb-3">
                                                <Form.Label>User</Form.Label>
                                                <Form.Select
                                                    name="user_id"
                                                    value={editTodo?.user_id || ''}
                                                    onChange={handleChange}
                                                >
                                                    <option value="">- select -</option>
                                                    {users.map(user => (
                                                        <option key={user.id} value={user.id}>
                                                            ID{user.id}-{user.full_name}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                            </Form.Group>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={closeEditModal}>Close</Button>
                            <Button variant="primary" onClick={updateTodo}>Update</Button>
                        </Modal.Footer>
                    </Modal>
                )
            }
        </>
    );
};

export default TodoList;
