import React from 'react';
import UserRegistration from '../components/UserRegistration';

const UserPage: React.FC = () => {
    return (
        <div>
            <div className="container mb-5">
                <h1 className='mb-3'>User Registration</h1>
                <UserRegistration />
            </div>
        </div>
    );
};

export default UserPage;
