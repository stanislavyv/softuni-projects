import { useNavigate } from "react-router-dom";

import { logout } from "../../../utils/authService";

import Button from "../../shared/button";

const LogoutButton = () => {
    const navigate = useNavigate();
    
    const onLogoutClickHandler = () => {
        logout();
        navigate('/pets');
    }
    
    return (
        <Button onClickHandler={onLogoutClickHandler}>
            <i className="fas fa-sign-out-alt"></i> Logout
        </Button>
    );
}

export default LogoutButton;