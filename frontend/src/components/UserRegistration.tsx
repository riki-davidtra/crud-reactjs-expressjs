import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';

interface IFormInput {
    fullName: string;
    nickName: string;
    email: string;
    password: string;
    confirmPassword: string;
    roleId: number;
}

const UserRegistration: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, getValues, reset } = useForm<IFormInput>();
    const [alert, setAlert] = useState<{ message: string, type: 'success' | 'danger' } | null>(null);

    const onSubmit: SubmitHandler<IFormInput> = async (data) => {
        try {
            if (data.password !== data.confirmPassword) {
                setAlert({ message: 'Passwords do not match', type: 'danger' });
                return;
            }

            await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/users`, {
                full_name: data.fullName,
                nick_name: data.nickName,
                email: data.email,
                password: data.password,
                role_id: data.roleId
            });
            setAlert({ message: 'Registration successful', type: 'success' });
            reset();
        } catch (error) {
            setAlert({ message: 'Registration failed', type: 'danger' });
        }
    };

    return (
        <div className="container">
            {alert && (
                <Alert variant={alert.type} onClose={() => setAlert(null)} dismissible>
                    {alert.message}
                </Alert>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            {...register('fullName', { required: 'Full Name is required' })}
                            placeholder='Enter Full Name'
                            className="form-control"
                            autoFocus
                        />
                        {errors.fullName && <p className="text-small text-danger">{errors.fullName.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="nickName" className="form-label">Nick Name:</label>
                        <input
                            type="text"
                            id="nickName"
                            {...register('nickName', { required: 'Nick Name is required' })}
                            placeholder='Enter Nick Name'
                            className="form-control"
                        />
                        {errors.nickName && <p className="text-small text-danger">{errors.nickName.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email:</label>
                        <input
                            type="text"
                            id="email"
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[^@\s]+@[^@\s]+\.[^@\s]+$/,
                                    message: 'Invalid email address'
                                }
                            })}
                            placeholder='Enter Email'
                            className="form-control"
                        />
                        {errors.email && <p className="text-small text-danger">{errors.email.message}</p>}
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            {...register('password', {
                                required: 'Password is required', minLength: {
                                    value: 8,
                                    message: 'Password must be at least 8 characters long'
                                }
                            })}
                            placeholder='Enter Password'
                            className="form-control"
                        />
                        {errors.password && <p className="text-small text-danger">{errors.password.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="confirmPassword" className="form-label">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword', {
                                required: 'Confirm password is required',
                                validate: value =>
                                    value === getValues('password') || 'Passwords do not match',
                                minLength: {
                                    value: 8,
                                    message: 'Confirm password must be at least 8 characters long'
                                }
                            })}
                            placeholder='Enter Confirm Password'
                            className="form-control"
                        />
                        {errors.confirmPassword && <p className="text-small text-danger">{errors.confirmPassword.message}</p>}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="roleId" className="form-label">Role ID:</label>
                        <input
                            type="number"
                            id="roleId"
                            {...register('roleId', { required: 'Role ID is required' })}
                            placeholder='Enter Role ID'
                            className="form-control"
                        />
                        {errors.roleId && <p className="text-small text-danger">{errors.roleId.message}</p>}
                    </div>
                </div>

                <div className="col-12">
                    <button type="submit" className="btn btn-primary">Register</button>
                </div>
            </form>
        </div>
    );
};

export default UserRegistration;
