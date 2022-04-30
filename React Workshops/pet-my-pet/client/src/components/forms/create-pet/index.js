import { useReducer } from "react";
import { useNavigate } from "react-router-dom";
import usePetService from "../../../hooks/usePetService";
import { useAuth } from "../../../contexts/AuthContext";

import * as formValidator from "../../../utils/formValidator";

import InputError from "../../shared/input-error";
import Button from "../../shared/button";
import Form from "../../shared/form";
import Fieldset from "../../shared/form/fieldset";
import FormLegend from "../../shared/form/form-legend";
import Field from "../../shared/form/field";

const errorReducer = (state, { type, payload }) => {
    switch (type) {
        case "name":
            return { ...state, name: payload };
        case "description":
            return { ...state, description: payload };
        default:
            return state;
    }
}

const CreatePet = () => {
    const [errors, dispatch] = useReducer(errorReducer, {
        name: '',
        description: ''
    });
    const { username } = useAuth();
    const navigate = useNavigate();
    const { createPet } = usePetService();

    const onNameBlurHandler = (e) => {
        const nameValue = e.target.value;
        const type = 'name';

        if (!formValidator.isPetNameValid(nameValue)) {
            dispatch({ type, payload: 'Name is too short!' });
        } else {
            dispatch({ type, payload: '' });
        }
    };

    const onDescriptionBlurHandler = (e) => {
        const descriptionValue = e.target.value;
        const type = 'description';

        if (!formValidator.isDescriptionValid(descriptionValue)) {
            dispatch({ type, payload: 'Description is too short!' });
        } else {
            dispatch({ type, payload: '' });
        }
    };

    const onCreateSubmitHandler = (e) => {
        e.preventDefault();

        if (errors.name || errors.description) { return; }

        const petObject = {
            name: e.target.name.value,
            description: e.target.description.value,
            imageURL: e.target.imageURL.value,
            category: e.target.category.value.toLowerCase(),
            likes: 0,
            creator: username,
            peopleLiked: []
        };
        createPet(petObject);
        navigate('/pets');
    };

    return (
        <Form onSubmitHandler={onCreateSubmitHandler}>
            <Fieldset>
                <FormLegend>Add new Pet</FormLegend>
                <Field type='name'>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Name"
                        onBlur={onNameBlurHandler}
                    />
                </Field>
                <InputError message={errors.name} />

                <Field type='description'>
                    <textarea
                        rows="4"
                        cols="45"
                        type="text"
                        name="description"
                        id="description"
                        resize="none"
                        placeholder="Description"
                        onBlur={onDescriptionBlurHandler}
                    ></textarea>
                </Field>
                <InputError message={errors.description} />

                <Field type='image'>
                    <input
                        type="text"
                        name="imageURL"
                        id="image"
                        placeholder="Image"
                    />
                </Field>
                <Field type='category'>
                    <select type="text" name="category">
                        <option>Cat</option>
                        <option>Dog</option>
                        <option>Parrot</option>
                        <option>Reptile</option>
                        <option>Other</option>
                    </select>
                </Field>

                <Button type='submit'>
                    Add Pet
                </Button>
            </Fieldset>
        </Form>
    );
}

export default CreatePet;