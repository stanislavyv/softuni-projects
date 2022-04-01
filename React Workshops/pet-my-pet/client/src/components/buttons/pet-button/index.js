import petService from "../../../utils/petService";
import Button from "../../shared/button";

import usePet from "../../../hooks/usePet";
import useAuthContext from "../../../hooks/useAuthContext";

const PetButton = ({ id, parentCallback, hasAlreadyLiked }) => {
    const pet = usePet(id);
    const { username } = useAuthContext();

    const onPetClickHandler = async () => {
        const likes = await petService.like(pet, username);

        parentCallback(likes, !hasAlreadyLiked);
    };

    return <Button text="Pet" onClickHandler={onPetClickHandler} />;
};

export default PetButton;
