import { useState } from 'react';
import petService from '../../utils/petService'
import Button from '../shared/button';

const PetButton = ({id}) => {
    const [likes, setLikes] = useState(0);
    
    const onPetClickHandler = () => {
        petService.like()
            .then(res => {

            );
    };
    
    return (
        <Button text="Pet" onClickHandler={onPetClickHandler}/>
    );
}

export default PetButton;