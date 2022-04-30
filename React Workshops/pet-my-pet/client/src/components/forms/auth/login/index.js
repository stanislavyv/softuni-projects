import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";

import AuthForm from "..";

const LoginForm = () => {
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const { signIn } = useAuth();

    const onLoginClickHandler = (e) => {
        e.preventDefault();

        if (!isValid) { return; }

        const username = e.target.username.value;
        const password = e.target.password.value;

        signIn(username, password)
            .then((res) => {
                if (res) {
                    navigate('/');
                }
            })
    };

    return (
        <AuthForm type="Login" onSubmitHandler={onLoginClickHandler} setIsValid={setIsValid} />
    );
}

export default LoginForm;