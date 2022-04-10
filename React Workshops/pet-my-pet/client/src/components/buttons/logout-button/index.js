import authService from "../../../utils/authService";

import { Link } from "react-router-dom";

const LogoutButton = () => {
    const onLogoutClickHandler = () => {
        authService.logout();
    }
    
    return (
        <Link to="/pets" onClick={onLogoutClickHandler}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
        </Link>
    );
}

export default LogoutButton;