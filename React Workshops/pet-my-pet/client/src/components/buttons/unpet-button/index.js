import petService from "../../../utils/petService";
import Button from "../../shared/button";
import AuthContext from "../../../contexts/AuthContext";

import { useContext } from "react";
import usePet from "../../../hooks/usePet";

const UnpetButton = ({ id, parentCallback, hasAlreadyLiked }) => {
    const { username } = useContext(AuthContext);
    const pet = usePet(id);

    const onUnpetClickHandler = async () => {
        const likes = await petService.unpet(pet, username);

        parentCallback(likes, !hasAlreadyLiked);
    };

    return <Button text="Unpet" onClickHandler={onUnpetClickHandler} />;
};

export default UnpetButton;
