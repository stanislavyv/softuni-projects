import React from "react";

import { useEffect, useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";

import { getPetById, unpet } from "../../../utils/petService";

import Button from "../../shared/button";

const arePropsEqual = (prev, curr) => {
    return prev.id === curr.id &&
           prev.hasAlreadyLiked === curr.hasAlreadyLiked;
};

const UnpetButton = React.memo(({ id, parentCallback, hasAlreadyLiked }) => {
    const [pet, setPet] = useState({});
    const { username } = useAuth()

    useEffect(() => {
        getPetById(id)
            .then(setPet);
    }, [id])

    const onUnpetClickHandler = async () => {
        const likes = await unpet(pet, username);
        parentCallback(likes, !hasAlreadyLiked);
    };

    return (
        <Button onClickHandler={onUnpetClickHandler}>
            <i className="fas fa-heart"></i> Unpet
        </Button>
    );
}, arePropsEqual);

UnpetButton.displayName = 'UnpetButton';
export default UnpetButton;
