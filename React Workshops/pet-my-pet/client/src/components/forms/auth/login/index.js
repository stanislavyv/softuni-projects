import { useNavigate } from "react-router-dom";

import AuthForm from "..";
import authService from "../../../../utils/authService";

const LoginForm = () => {
    const navigate = useNavigate();

    const onLoginClickHandler = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        authService.signIn(username, password)
            .then(navigate('/'));
    };

    return (
        <AuthForm type="Login" onSubmitHandler={onLoginClickHandler} />
    );
}

export default LoginForm;