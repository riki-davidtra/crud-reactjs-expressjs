import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import UserRegistrationPage from './pages/UserRegistrationPage';
import UserPage from './pages/UserPage';
import TodoPage from './pages/TodoPage';

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/todos" element={<TodoPage />} />
          <Route path="/user_registration" element={<UserRegistrationPage />} />
          <Route path="/users" element={<UserPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;


