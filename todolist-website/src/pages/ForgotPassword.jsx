
import React, { useState } from 'react';
import axios from 'axios';
import ErrorMessage from '../components/errorMessage/ErrorMessage';
import { useNavigate, Link } from 'react-router-dom';
import { API_BASE_URL } from "../utils/ApiUrl";

function ForgotPassword() {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleKeyDown = (e) => {
        if (e.key === "Enter") sendEmail();
    };

    function validateEmail(email) {
        if (!email) {
            return 'Email is required.';
        }

        if (!/\S+@\S+\.\S+/.test(email)) {
            return 'Invalid email format.';
        }

        return null;
    }

    const sendEmail = async () => {
        const errorMessage = validateEmail(email);
        if (errorMessage) {
            setError(errorMessage);
            return;
        }

        setIsLoading(true);

        try {
            const url = `${API_BASE_URL}/user/reset-password?email=${encodeURIComponent(email)}`;
            await axios.post(url);
            alert('Password reset link sent successfully.');
            navigate('/');
        } catch (error) {
            setError(error.response?.data || 'An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="main-container">
            <h2>Don't Worry</h2>
            <p>We'll send you a link to reset your password.</p>
            <ErrorMessage message={error} />
            <div className="email-input">
                <input
                    type="text"
                    placeholder="Enter your e-mail..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={handleKeyDown}
                    disabled={isLoading}
                />
                <button  className="add-button" onClick={sendEmail} disabled={isLoading}>
                    {isLoading ? 'Sending...' : 'Send'}
                </button>
            </div>
            <div className="form-link">
                <p>Don't have an account? <Link to="/register">Sign up here</Link></p>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </div>
        </div>
    );
}

export default ForgotPassword;

