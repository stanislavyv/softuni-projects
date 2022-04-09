import { useState, useEffect } from "react";
import usePetService from "../../../hooks/usePetService";
import useAuthContext from "../../../hooks/useAuthContext";

import Button from "../../shared/button";

const PetButton = async ({ id, parentCallback, hasAlreadyLiked }) => {
    const [pet, setPet] = useState({});
    const { username } = useAuthContext()
    const { getPetById, likePet } = usePetService();

    useEffect(() => {
        getPetById(id)
            .then(setPet);
    }, [id])

    const onPetClickHandler = async () => {
        const likes = await likePet(pet, username);

        parentCallback(likes, !hasAlreadyLiked);
    };

    return <Button text="Pet" onClickHandler={onPetClickHandler} />;
};

export default PetButton;
