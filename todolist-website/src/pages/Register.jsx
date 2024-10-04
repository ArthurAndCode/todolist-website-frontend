import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { API_BASE_URL } from "../utils/ApiUrl";
import ErrorMessage from '../components/errorMessage/ErrorMessage';


function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  
  function validateFields({ firstName, lastName, email, password }) {
    if (!firstName || !lastName || !email || !password) {
      return 'All fields are required.';
    }
  
    if (!/\S+@\S+\.\S+/.test(email)) {
      return 'Invalid email format.';
    }
  
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    }

    return null;
  }

  const handleRegistration = async () => {
    const errorMessage = validateFields({ firstName, lastName, email, password });
    if (errorMessage) {
      setError(errorMessage);
      return;
    } 
    setIsLoading(true);

    try {
      const userData = {
        firstName,
        lastName,
        email,
        password
      };

      await axios.post(`${API_BASE_URL}/user`, userData);
      setRegistrationSuccess(true);
    } catch (error) {
      setError(error.response?.data || 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleRegistration();
  };

  const renderSuccessMessage = () => (
    <>
      <h1>Registration Successful!</h1>
      <div className="form-link">
        <p>To access your new account <Link to="/login">Login here</Link></p>
      </div>
    </>
  );

  return (
    <div className='main-container'>
      {registrationSuccess ? (
        renderSuccessMessage()
      ) : (
        <>
          <h2>Get On Board</h2>
          <ErrorMessage message={error} />
          <div className="input-container">
            <input 
              type="text" 
              placeholder="Firstname" 
              value={firstName}
              onKeyDown={handleKeyDown}
              onChange={(e) => setFirstName(e.target.value)} 
            />

            <input 
              type="text" 
              placeholder="Lastname" 
              value={lastName}
              onKeyDown={handleKeyDown}
              onChange={(e) => setLastName(e.target.value)} 
            />

            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onKeyDown={handleKeyDown} 
              onChange={(e) => setEmail(e.target.value)} 
            />

            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onKeyDown={handleKeyDown} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>
          
          <button className="form-button" onClick={handleRegistration} disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Register'}
          </button>

          <div className="form-link">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </>
      )}
    </div>
  );
}

export default Register;
