import { useNavigate } from "react-router-dom";

import AuthForm from "..";
import authService from "../../../../utils/authService";

const RegisterForm = () => {
    const navigate = useNavigate();
    
    const onRegisterClickHandler = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        authService.createUser(username, password)
            .then(navigate('/'));
    };

    return (
        <AuthForm type="Register" onSubmitHandler={onRegisterClickHandler} />
    );
}

export default RegisterForm;