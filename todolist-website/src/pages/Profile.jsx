
import NavLinks from "../components/navLinks/NavLinks";
import { Link } from 'react-router-dom';


function Profile({ user, onLogout }) {
    return (
        <div className="main-container">
            <NavLinks/>
            <h2>{user.firstName} {user.lastName}</h2>
            <p className="form-link"><Link to="/change-email" className="form-link">Change e-mail</Link></p>
            <p className="form-link"><Link to="/change-password" className="form-link">Change password</Link></p>
            <p className="form-link"><Link to="/delete-account" className="form-link">Delete account</Link></p>
            <button className="logout-button" onClick={onLogout}>Log Out</button>
        </div>
    );
}

export default Profile;