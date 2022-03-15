import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import petService from '../../../utils/petService';
import * as formValidator from '../helpers/formValidator';

import InputError from '../../shared/input-error';

const EditPet = () => {
    const [pet, setPet] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        petService.getById(id)
            .then(res => {
                setPet(res);
            });
    }, []);

    const onDescriptionBlurHandler = (e) => {
        const descriptionValue = e.target.value;

        if (!formValidator.isDescriptionValid(descriptionValue)) {
            setErrorMessage('Description is too short!');
        } else {
            setErrorMessage('');
        }
    };

    const onDescriptionSubmitHandler = (e) => {
        e.preventDefault();
        const newDescription = e.target.description.value;

        petService.edit(id, newDescription)
            .then(res => {
                console.log(res);
                setPet(res);
                navigate('/pets');
            });
    };

    return (
        <section className="detailsMyPet">
            <h3>{pet.name}</h3>
            <p>Pet counter: <i className="fas fa-heart"></i> {pet.likes}</p>
            <p className="img">
                <img
                    src={pet.imageURL}
                    alt="Pet"
                />
            </p>
            <form onSubmit={onDescriptionSubmitHandler}>
                <textarea 
                    type="text"
                    name="description"
                    defaultValue={pet.description}
                    onBlur={onDescriptionBlurHandler}
                />
                <InputError message={errorMessage} />
                <button type="submit" className="button">Save</button>
            </form>
        </section>
    );
}

export default EditPet;