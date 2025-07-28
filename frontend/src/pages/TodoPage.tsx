import React from 'react';
import TodoList from '../components/TodoList';

const TodoPage: React.FC = () => {
    return (
        <div>
            <div className="container mb-5">
                <h1 className='mb-3'>Todo List</h1>
                <TodoList />
            </div>
        </div>
    );
};

export default TodoPage;
