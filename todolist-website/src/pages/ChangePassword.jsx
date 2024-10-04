import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import NavLinks from "../components/navLinks/NavLinks";
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import { API_BASE_URL } from "../utils/ApiUrl";

function ChangePassword({ user, onLogout }) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") saveNewPassword();
    };

    function validateFields(oldPassword, newPassword) {
        if (!oldPassword || !newPassword) {
            return 'All fields are required.';
        }
        if (oldPassword !== user.password) {
            return 'Incorrect old password.';
        }
        if (newPassword.length < 6) {
            return 'New password must be at least 6 characters long.';
        }
        if (user.password === newPassword) {
            return 'New password is the same as current one'
        }

        return null;
    }

    const saveNewPassword = async () => {
        const errorMessage = validateFields(oldPassword, newPassword);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }
        setIsLoading(true);
        try {
            const url = `${API_BASE_URL}/user/password?email=${encodeURIComponent(user.email)}&newPassword=${encodeURIComponent(newPassword)}`;
            const response = await axios.put(url);
            alert('Password changed successfully.');
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
                    placeholder="Enter old password"
                    onKeyDown={handleKeyDown}
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Enter new password"
                    onKeyDown={handleKeyDown}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />
            </div>

            <button className="form-button" type="button" onClick={saveNewPassword} disabled={isLoading}>{isLoading ? 'Changing...' : 'Change Password'}</button>
        </div>
    );
}

export default ChangePassword;
