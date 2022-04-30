import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../../contexts/NotificationContext";

import { createUser } from "../../../../utils/authService";

import AuthForm from "..";

const RegisterForm = () => {
    const [isValid, setIsValid] = useState(false);
    const { notifyError } = useNotification();
    const navigate = useNavigate();

    const onRegisterClickHandler = (e) => {
        e.preventDefault();

        if (!isValid) { return; }

        const username = e.target.username.value;
        const password = e.target.password.value;

        createUser(username, password)
            .then((res) => {
                if (res) {
                    navigate('/');
                } else {
                    notifyError('Email already in use!');
                }
            })
    };

    return (
        <AuthForm type="Register" onSubmitHandler={onRegisterClickHandler} setIsValid={setIsValid} />
    );
}

export default RegisterForm;