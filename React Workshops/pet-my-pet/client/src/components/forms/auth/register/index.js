import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AuthForm from "..";
import authService from "../../../../utils/authService";

const RegisterForm = () => {
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();

    const onRegisterClickHandler = (e) => {
        e.preventDefault();

        if (!isValid) { return; }

        const username = e.target.username.value;
        const password = e.target.password.value;

        authService.createUser(username, password)
            .then(navigate('/'));
    };

    return (
        <AuthForm type="Register" onSubmitHandler={onRegisterClickHandler} setIsValid={setIsValid} />
    );
}

export default RegisterForm;