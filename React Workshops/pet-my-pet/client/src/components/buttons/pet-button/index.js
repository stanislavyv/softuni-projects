import React, { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";

import { getPetById, likePet } from "../../../utils/petService";

import Button from "../../shared/button";

const arePropsEqual = (prev, curr) => {
    return prev.id === curr.id &&
        prev.hasAlreadyLiked === curr.hasAlreadyLiked;
};

const PetButton = React.memo(({ id, parentCallback, hasAlreadyLiked }) => {
    const [pet, setPet] = useState({});
    const { username } = useAuth()

    useEffect(() => {
        getPetById(id)
            .then(setPet);
    }, [id])

    const onPetClickHandler = async () => {
        const likes = await likePet(pet, username);
        parentCallback(likes, !hasAlreadyLiked);
    };

    return (
        <Button onClickHandler={onPetClickHandler}>
            <i className="fas fa-heart"></i> Pet
        </Button>
    );
}, arePropsEqual);

PetButton.displayName = 'PetButton';
export default PetButton;
