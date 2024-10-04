import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Checkbox from '../components/checkbox/Checkbox';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import { API_BASE_URL } from "../utils/ApiUrl";

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMeChecked, setRememberMeChecked] = useState(false);
  const navigate = useNavigate();

  function validateFields({ email, password }) {
    if (!email || !password) {
      return 'All fields are required.';
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format.';
    }

    return null;
  }

  const handleLogin = async () => {
    const errorMessage = validateFields({ email, password });
    if (errorMessage) {
      setError(errorMessage);
      return;
    }
    setIsLoading(true);

    try {
      const url = `${API_BASE_URL}/user?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&rememberMe=${rememberMeChecked}`;
      const response = await axios.get(url, { withCredentials: true });
      onLogin(response.data);
      navigate('/');
    } catch (error) {
      setError(error.response?.data || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };

  return (
    <div className="main-container">
      <h2>Hello again</h2>
      <ErrorMessage message={error} />

      <div className="input-container">
        <input
          type="email"
          placeholder="Enter email"
          onKeyDown={handleKeyDown}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Enter password"
          onKeyDown={handleKeyDown}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="input-options">
        <Checkbox
          checked={rememberMeChecked}
          onChange={() => setRememberMeChecked(!rememberMeChecked)}
        />
        <Link to="/forgotpassword">Forgot password?</Link>
      </div>

      <button
        className="form-button"
        type="button"
        onClick={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? 'Logging in...' : 'Log In'}
      </button>

      <div className="form-link">
        <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
      </div>
    </div>
  );
}

export default Login;
