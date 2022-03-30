import petService from '../../../utils/petService'
import Button from '../../shared/button';
import AuthContext from '../../../contexts/AuthContext';

import { useContext } from 'react';

const UnpetButton = ({ id, parentCallback }) => {
    const {username} = useContext(AuthContext);
    
    const onUnpetClickHandler = () => {
        petService.getById(id)
            .then(pet => {
                petService.unpet(pet, username)
                    .then(pet => parentCallback(pet.likes));
            });
    };
    
    return (
        <Button text="Unpet" onClickHandler={onUnpetClickHandler}/>
    );
}

export default UnpetButton;