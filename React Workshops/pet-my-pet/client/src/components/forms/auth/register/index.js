import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../contexts/AuthContext";

import AuthForm from "..";

const RegisterForm = () => {
    const [isValid, setIsValid] = useState(false);
    const navigate = useNavigate();
    const { createUser } = useAuth();

    const onRegisterClickHandler = (e) => {
        e.preventDefault();

        if (!isValid) { return; }

        const username = e.target.username.value;
        const password = e.target.password.value;

        createUser(username, password)
            .then((res) => {
                if (res) {
                    navigate('/');
                }
            })
    };

    return (
        <AuthForm type="Register" onSubmitHandler={onRegisterClickHandler} setIsValid={setIsValid} />
    );
}

export default RegisterForm;