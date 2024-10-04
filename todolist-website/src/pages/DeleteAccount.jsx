import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavLinks from "../components/navLinks/NavLinks";
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import { API_BASE_URL } from "../utils/ApiUrl";

function DeleteAccount({ user, onLogout }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") deleteAccountData();
    };

    function validatePassword(password) {
        if (!password) {
            return 'Password is required.';
        }
        if (password !== user.password) {
            return 'Incorrect password.';
        }

        return null;
    }

    const deleteAccountData = async () => {
        const errorMessage = validatePassword(password);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setIsLoading(true);
        try {
            await axios.delete(`${API_BASE_URL}/user/${user.id}`);
            alert('Account deleted successfully.');
            onLogout();
            navigate('/register');
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
            </div>

            <button className="logout-button" type="button" onClick={deleteAccountData} disabled={isLoading}>{isLoading ? 'Deleting...' : 'Delete Account'}</button>
        </div>
    );
}

export default DeleteAccount;