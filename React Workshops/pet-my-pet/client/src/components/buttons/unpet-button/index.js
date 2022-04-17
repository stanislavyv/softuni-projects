import React from "react";

import { useEffect, useState } from "react";
import usePetService from "../../../hooks/usePetService";
import { useAuthContext } from "../../../contexts/AuthContext";

import Button from "../../shared/button";

const arePropsEqual = (prev, curr) => {
    return prev.id === curr.id &&
           prev.hasAlreadyLiked === curr.hasAlreadyLiked;
};

const UnpetButton = React.memo(({ id, parentCallback, hasAlreadyLiked }) => {
    const [pet, setPet] = useState({});
    const { username } = useAuthContext()
    const { getPetById, unpet } = usePetService();

    useEffect(() => {
        getPetById(id)
            .then(setPet);
    }, [id])

    const onUnpetClickHandler = async () => {
        const likes = await unpet(pet, username);

        parentCallback(likes, !hasAlreadyLiked);
    };

    return <Button text="Unpet" onClickHandler={onUnpetClickHandler} />;
}, arePropsEqual);

UnpetButton.displayName = 'UnpetButton';
export default UnpetButton;
