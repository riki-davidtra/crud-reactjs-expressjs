import React, { useState, useEffect, ChangeEvent } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

interface User {
    uuid: string;
    full_name: string;
    nick_name: string;
    email: string;
    password: string;
    role_id: string;
}

const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [full_name, setFullName] = useState<string>('');
    const [nick_name, setNickName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [role_id, setRoleId] = useState<string>('');

    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [editUser, setEditUser] = useState<User | null>(null);

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    const [alert, setAlert] = useState<{ type: string; message: string } | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/users`);
                setUsers(response.data);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            }
        };

        fetchUsers();
    }, []);

    const openDeleteModal = (uuid: string) => {
        setUserToDelete(uuid);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
        setUserToDelete(null);
    };

    const deleteUser = async () => {
        if (!userToDelete) return;

        try {
            await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/api/users/${userToDelete}`);
            setUsers(users.filter(user => user.uuid !== userToDelete));
            setUserToDelete(null);
            setShowDeleteModal(false);
            setAlert({ type: 'success', message: 'User deleted successfully!' });
        } catch (error) {
            console.error('Failed to delete user:', error);
            setAlert({ type: 'danger', message: 'Failed to delete user.' });
        }
    };

    const openEditModal = (user: User) => {
        setEditUser(user);
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditUser(null);
    };

    const updateUser = async () => {
        if (!editUser) return;

        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/users/${editUser.uuid}`, {
                full_name: editUser.full_name,
                nick_name: editUser.nick_name,
                email: editUser.email,
                password: editUser.password,
                role_id: editUser.role_id
            });

            setUsers(users.map(user => (user.uuid === editUser.uuid ? editUser : user)));
            closeEditModal();
            setAlert({ type: 'success', message: 'User updated successfully!' });
        } catch (error) {
            console.error('Failed to update user:', error);
            setAlert({ type: 'danger', message: 'Failed to update user.' });
        }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (editUser) {
            setEditUser({ ...editUser, [name]: value });
        }
    };

    return (
        <>
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
                            <th>Full Name</th>
                            <th>Nick Name</th>
                            <th>Email</th>
                            <th>Role ID</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user.uuid}>
                                <td>{index + 1}</td>
                                <td>{user.full_name}</td>
                                <td>{user.nick_name}</td>
                                <td>{user.email}</td>
                                <td>{user.role_id}</td>
                                <div className="btn-group" role="group" aria-label="Action buttons">
                                    <button className="btn btn-warning" onClick={() => openEditModal(user)}>Edit</button>
                                    <button className="btn btn-danger" onClick={() => openDeleteModal(user.uuid)}>Delete</button>
                                </div>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Delete Modal */}
            <Modal show={showDeleteModal} onHide={closeDeleteModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this user?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={closeDeleteModal}>Cancel</Button>
                    <Button variant="danger" onClick={deleteUser}>Delete</Button>
                </Modal.Footer>
            </Modal>

            {/* Edit Modal */}
            {editUser && (
                <Modal show={showEditModal} onHide={closeEditModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit User</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {editUser && (
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Full Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="full_name"
                                        value={editUser.full_name}
                                        onChange={handleChange}
                                        placeholder="Enter Full Name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nick Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nick_name"
                                        value={editUser.nick_name}
                                        onChange={handleChange}
                                        placeholder="Enter Nick Name"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={editUser.email}
                                        onChange={handleChange}
                                        placeholder="Enter Email"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Role ID</Form.Label>
                                    <Form.Control
                                        type="role_id"
                                        name="role_id"
                                        value={editUser.role_id}
                                        onChange={handleChange}
                                        placeholder="Enter Role ID"
                                    />
                                </Form.Group>
                            </Form>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={closeEditModal}>Close</Button>
                        <Button variant="primary" onClick={updateUser}>Update</Button>
                    </Modal.Footer>
                </Modal>
            )}
        </>
    );
};

export default UserList;
