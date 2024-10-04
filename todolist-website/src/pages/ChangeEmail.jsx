import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavLinks from "../components/navLinks/NavLinks";
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import { API_BASE_URL } from "../utils/ApiUrl";

function ChangeEmail({ user, onLogout }) {
    const [password, setPassword] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") saveNewEmail();
    };

    function validateFields(password, newEmail) {
        if (!password || !newEmail) {
            return 'All fields are required.';
        }
        if (password !== user.password) {
            return 'Incorrect password.';
        }
        if (!/\S+@\S+\.\S+/.test(newEmail)) {
            return 'Invalid email format.';
          }

        return null;
    }

    const saveNewEmail = async () => {
        const errorMessage = validateFields(password, newEmail);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setIsLoading(true);
        try {
            const url = `${API_BASE_URL}/user/email?email=${encodeURIComponent(user.email)}&newEmail=${encodeURIComponent(newEmail)}`;
            const response = await axios.put(url);
            alert('E-mail changed successfully.');
            onLogout();
            navigate('/login');
        } catch (error) {
            setError(error.response?.data || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="main-container">
            <NavLinks/>
            <ErrorMessage message={error} />
            
            <div className="input-container">
                <input
                    type="password"
                    placeholder="Enter password"
                    onKeyDown={handleKeyDown}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Enter new e-mail"
                    onKeyDown={handleKeyDown}
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
            </div>

            <button className="form-button" type="button" onClick={saveNewEmail} disabled={isLoading}>{isLoading ? 'Changing...' : 'Change E-mail'}</button>
        </div>
    );
}

export default ChangeEmail;