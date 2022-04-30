import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useNotification } from "../../../../contexts/NotificationContext";

import { signIn } from "../../../../utils/authService";

import AuthForm from "..";

const LoginForm = () => {
    const [isValid, setIsValid] = useState(false);
    const { notifyError } = useNotification();
    const navigate = useNavigate();

    const onLoginClickHandler = (e) => {
        e.preventDefault();

        if (!isValid) { return; }

        const username = e.target.username.value;
        const password = e.target.password.value;

        signIn(username, password)
            .then((res) => {
                if (res) {
                    navigate('/');
                } else {
                    notifyError('Invalid e-mail or password!');
                }
            })
    };

    return (
        <AuthForm type="Login" onSubmitHandler={onLoginClickHandler} setIsValid={setIsValid} />
    );
}

export default LoginForm;