import "../forms.css";

import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import * as formValidator from "../helpers/formValidator";
import petService from "../../../utils/petService";

import InputError from "../../shared/input-error";
import AuthContext from "../../../contexts/AuthContext";

const CreatePet = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const {username} = useContext(AuthContext);
    const navigate = useNavigate();
    
    const onDescriptionBlurHandler = (e) => {
        const descriptionValue = e.target.value;

        if (!formValidator.isDescriptionValid(descriptionValue)) {
            setErrorMessage('Description is too short!');
        } else {
            setErrorMessage('');
        }
    };

    const onCreateSubmitHandler = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const description= e.target.description.value;
        const imageURL = e.target.imageURL.value;
        const category = e.target.category.value;
        const creator = username;
        const peopleLiked = [];

        const petObject = { name,
                            description,
                            imageURL,
                            category,
                            likes: 0,
                            creator,
                            peopleLiked
        };
        petService.create(petObject);
        navigate('/pets');
    };

    return (
        <section className="create">
            <form onSubmit={onCreateSubmitHandler}>
                <fieldset>
                    <legend>Add new Pet</legend>
                    <p className="field">
                        <label htmlFor="name">Name</label>
                        <span className="input">
                            <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Name"
                            />
                            <span className="actions"></span>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="description">Description</label>
                        <span className="input">
                            <textarea
                            rows="4"
                            cols="45"
                            type="text"
                            name="description"
                            id="description"
                            placeholder="Description"
                            onBlur={onDescriptionBlurHandler}
                            ></textarea>
                        <span className="actions"></span>
                        </span>
                    <InputError message={errorMessage} />
                    </p>
                    <p className="field">
                        <label htmlFor="image">Image</label>
                        <span className="input">
                            <input
                            type="text"
                            name="imageURL"
                            id="image"
                            placeholder="Image"
                            />
                            <span className="actions"></span>
                        </span>
                    </p>
                    <p className="field">
                        <label htmlFor="category">Category</label>
                        <span className="input">
                            <select type="text" name="category">
                                <option>Cat</option>
                                <option>Dog</option>
                                <option>Parrot</option>
                                <option>Reptile</option>
                                <option>Other</option>
                            </select>
                            <span className="actions"></span>
                        </span>
                    </p>
                    <input
                    className="button submit"
                    type="submit"
                    value="Add Pet"
                    />
                </fieldset>
            </form>
        </section>
    );
}

export default CreatePet;