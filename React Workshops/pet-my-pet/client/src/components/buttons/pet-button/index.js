import petService from '../../../utils/petService'
import Button from '../../shared/button';

const PetButton = ({ id, parentCallback }) => {
    const onPetClickHandler = () => {
        petService.getById(id)
            .then(pet => {
                petService.like(pet)
                    .then(pet => parentCallback(pet.likes));
            });
    };
    
    return (
        <Button text="Pet" onClickHandler={onPetClickHandler}/>
    );
}

export default PetButton;