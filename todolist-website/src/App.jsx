
import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Home from './pages/Home.jsx';
import Profile from './pages/Profile.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import ChangePassword from './pages/ChangePassword.jsx';
import ChangeEmail from './pages/ChangeEmail.jsx';
import DeleteAccount from './pages/DeleteAccount.jsx';
import ProtectedRoutes from './utils/ProtectedRoutes.jsx';
import NotFoundPage from './pages/NotFoundPage';
import axios from 'axios';
import { API_BASE_URL } from './utils/ApiUrl';

function App() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/me`, { withCredentials: true });
        setUser(response.data);
        navigate('/');
      } catch (error) {
        setUser(null);
      }
    };
    fetchUser();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    axios.post(`${API_BASE_URL}/user/logout`, {}, { withCredentials: true })
    setUser(null);
  };
  

  return (
    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoutes user={user} />}>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/profile" element={<Profile user={user} onLogout={handleLogout} />} />
          <Route path="/change-password" element={<ChangePassword user={user} onLogout={handleLogout} />} />
          <Route path="/change-email" element={<ChangeEmail user={user} onLogout={handleLogout} />} />
          <Route path="/delete-account" element={<DeleteAccount user={user} onLogout={handleLogout} />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;

