import React from 'react';
import UserList from '../components/UserList';

const UserPage: React.FC = () => {
    return (
        <div>
            <div className="container mb-5">
                <h1 className='mb-3'>User List</h1>
                <UserList />
            </div>
        </div>
    );
};

export default UserPage;
