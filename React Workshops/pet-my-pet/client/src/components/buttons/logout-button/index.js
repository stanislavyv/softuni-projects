import { useAuth } from "../../../contexts/AuthContext";

import { useNavigate } from "react-router-dom";
import Button from "../../shared/button";

const LogoutButton = () => {
    const { logout } = useAuth();
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