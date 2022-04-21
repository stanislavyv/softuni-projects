import Button from "../../shared/button";
import Fieldset from "../../shared//form/fieldset";
import Form from "../../shared/form";
import FormLegend from "../../shared/form/form-legend";
import Field from "../../shared/form/field";

const AuthForm = ({ type, onSubmitHandler }) => {
    return (
        <Form onSubmitHandler={onSubmitHandler}>
            <Fieldset>
                <FormLegend>{type}</FormLegend>
                <Field type='username' auth>
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                    />
                    <i className="fas fa-user"></i>
                </Field>
                <Field type='password' auth>
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                    />
                    <i className="fas fa-key"></i>
                </Field>
                
                <Button type='submit'>
                    {type}
                </Button>
            </Fieldset>
        </Form>
    );
}

export default AuthForm;