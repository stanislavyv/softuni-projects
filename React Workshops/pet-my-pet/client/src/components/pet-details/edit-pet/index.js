import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotification } from '../../../contexts/NotificationContext';

import { getPetById, editPet } from '../../../utils/petService';
import * as formValidator from "../../../utils/formValidator";

import InputError from '../../shared/input-error';
import PetCardWrapper from '../../pet-card/pet-card-wrapper';
import PetDetailsWrapper from '../pet-details-wrapper';
import Button from '../../shared/button';

const StyledEditForm = styled.form`
    display: flex;
    justify-content: center;
    flex-direction: column;

    & button {
        align-self: center;
        margin: 10px 0;
    }
`;

const EditPet = () => {
    const [pet, setPet] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const { id } = useParams();
    const navigate = useNavigate();
    const { notifyInfo, notifyError } = useNotification();

    useEffect(() => {
        getPetById(id)
            .then(setPet);
    }, [id]);

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
        if (errorMessage) { return; }

        const newDescription = e.target.description.value;

        editPet(id, newDescription)
            .then(() => {
                navigate('/pets');
                notifyInfo(`Successfully edited ${pet.name}!`);
            });
    };

    return (
        <PetDetailsWrapper>
            <PetCardWrapper>
                <h3>{pet.name}</h3>
                <p>Pet counter: <i className="fas fa-heart"></i> {pet.likes}</p>
                <p className="img-wrapper">
                    <img
                        src={pet.imageURL}
                        alt="Pet"
                    />
                </p>
                <StyledEditForm onSubmit={onDescriptionSubmitHandler}>
                    <textarea
                        type="text"
                        name="description"
                        rows='5'
                        cols='30'
                        defaultValue={pet.description}
                        onBlur={onDescriptionBlurHandler}
                    />
                    <InputError message={errorMessage} />
                    <Button type='submit'>
                        Save
                    </Button>
                </StyledEditForm>
            </PetCardWrapper>
        </PetDetailsWrapper>
    );
}

export default EditPet;