import { useState } from "react";

import * as formValidator from "../../../utils/formValidator";

import Button from "../../shared/button";
import Fieldset from "../../shared//form/fieldset";
import Form from "../../shared/form";
import FormLegend from "../../shared/form/form-legend";
import Field from "../../shared/form/field";
import InputError from "../../shared/input-error";

const AuthForm = ({ type, onSubmitHandler, setIsValid }) => {
    const [errors, setErrors] = useState({
        username: '',
        password: ''
    });

    const onUsernameBlurHandler = (e) => {
        const usernameValue = e.target.value;

        if (!formValidator.isEmailValid(usernameValue)) {
            setErrors(state => ({ ...state, username: 'Username too short!' }));
            setIsValid(false);
        } else {
            setErrors(state => ({ ...state, username: '' }));
            setIsValid(true);
        }
    };

    const onPasswordBlurHandler = (e) => {
        const passwordValue = e.target.value;

        if (!formValidator.isPasswordValid(passwordValue)) {
            setErrors(state => ({ ...state, password: 'Password too short!' }));
            setIsValid(false);
        } else {
            setErrors(state => ({ ...state, password: '' }));
            setIsValid(true);
        }
    };

    return (
        <Form onSubmitHandler={onSubmitHandler}>
            <Fieldset>
                <FormLegend>{type}</FormLegend>
                <Field type='username' auth>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onBlur={onUsernameBlurHandler}
                    />
                    <i className="fas fa-user"></i>
                </Field>
                <InputError message={errors.username} />

                <Field type='password' auth>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onBlur={onPasswordBlurHandler}
                    />
                    <i className="fas fa-key"></i>
                </Field>
                <InputError message={errors.password} />

                <Button type='submit'>
                    {type}
                </Button>
            </Fieldset>
        </Form>
    );
}

export default AuthForm;