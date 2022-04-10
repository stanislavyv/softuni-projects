import { useEffect, useState } from "react";
import usePetService from "../../../hooks/usePetService";
import { useAuthContext } from "../../../contexts/AuthContext";

import Button from "../../shared/button";

const UnpetButton = ({ id, parentCallback, hasAlreadyLiked }) => {
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
};

export default UnpetButton;
