import petService from "../../../utils/petService";
import Button from "../../shared/button";
import AuthContext from "../../../contexts/AuthContext";

import { useContext } from "react";

const PetButton = ({ id, parentCallback, hasAlreadyLiked }) => {
    const { username } = useContext(AuthContext);

    const onPetClickHandler = async () => {
        const pet = await petService.getById(id);
        const likes = await petService.like(pet, username);

        parentCallback(likes, !hasAlreadyLiked);
    };

    return <Button text="Pet" onClickHandler={onPetClickHandler} />;
};

export default PetButton;
