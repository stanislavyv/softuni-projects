import { useNavigate } from "react-router-dom";

import AuthForm from "../../../shared/auth-form";
import authService from "../../../../utils/authService";

const RegisterForm = () => {
    const navigate = useNavigate();
    
    const onRegisterClickHandler = (e) => {
        e.preventDefault();

        const username = e.target.username.value;
        const password = e.target.password.value;

        authService.createUser(username, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigate('/');
            })
            .catch(console.log);
    };

    return (
        <AuthForm type="Register" onSubmitHandler={onRegisterClickHandler} />
    );
}

export default RegisterForm;