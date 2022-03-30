import petService from '../../../utils/petService'
import Button from '../../shared/button';

const UnpetButton = ({ id, parentCallback }) => {
    const onPetClickHandler = () => {
        petService.getById(id)
            .then(pet => {
                petService.unpet(pet)
                    .then(pet => parentCallback(pet.likes));
            });
    };
    
    return (
        <Button text="Pet" onClickHandler={onPetClickHandler}/>
    );
}

export default UnpetButton;