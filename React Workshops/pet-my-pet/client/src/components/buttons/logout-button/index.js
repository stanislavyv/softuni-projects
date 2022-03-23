import authService from "../../../utils/authService";

const LogoutButton = () => {
    const onLogoutClickHandler = () => {
        authService.logout()
            .catch(console.log);
    }
    
    return (
        <a href="" onClick={onLogoutClickHandler}>
            <i className="fas fa-sign-out-alt"></i>
            Logout
        </a>
    );
}

export default LogoutButton;