import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path ? 'nav-link active' : 'nav-link';

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-success">
            <div className="container-fluid">
                <Link className="navbar-brand fw-bold" to="/">TES FRONTEND</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link className={isActive('/')} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={isActive('/user_registration')} to="/user_registration">User Registration</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={isActive('/users')} to="/users">Users</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={isActive('/todos')} to="/todos">Todos</Link>
                        </li>
                    </ul>
                    <form className="d-flex">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-primary text-light" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Header;
