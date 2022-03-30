import petService from '../../../utils/petService'
import Button from '../../shared/button';
import AuthContext from '../../../contexts/AuthContext';

import { useContext } from 'react';

const PetButton = ({ id, parentCallback }) => {
    const {username} = useContext(AuthContext);
    
    const onPetClickHandler = () => {
        petService.getById(id)
            .then(pet => {
                petService.like(pet, username)
                    .then(pet => {
                        parentCallback(pet.likes);
                    });
            });
    };
    
    return (
        <Button text="Pet" onClickHandler={onPetClickHandler}/>
    );
}

export default PetButton;