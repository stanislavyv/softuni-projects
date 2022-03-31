import petService from "../../../utils/petService";
import Button from "../../shared/button";
import AuthContext from "../../../contexts/AuthContext";

import { useContext } from "react";
import usePet from "../../../hooks/usePet";

const PetButton = ({ id, parentCallback, hasAlreadyLiked }) => {
    const pet = usePet(id);
    const { username } = useContext(AuthContext);

    const onPetClickHandler = async () => {
        const likes = await petService.like(pet, username);

        parentCallback(likes, !hasAlreadyLiked);
    };

    return <Button text="Pet" onClickHandler={onPetClickHandler} />;
};

export default PetButton;
