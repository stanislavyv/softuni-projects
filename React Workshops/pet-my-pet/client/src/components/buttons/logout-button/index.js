import authService from "../../../utils/authService";

import { useNavigate } from "react-router-dom";
import Button from "../../shared/button";

const LogoutButton = () => {
    const navigate = useNavigate();
    
    const onLogoutClickHandler = () => {
        authService.logout();
        navigate('/pets');
    }
    
    return (
        <Button onClickHandler={onLogoutClickHandler}>
            <i className="fas fa-sign-out-alt"></i> Logout
        </Button>
    );
}

export default LogoutButton;