import petService from "../../../utils/petService";
import Button from "../../shared/button";

import usePet from "../../../hooks/usePet";
import useAuthContext from "../../../hooks/useAuthContext";

const UnpetButton = ({ id, parentCallback, hasAlreadyLiked }) => {
    const { username } = useAuthContext()
    const pet = usePet(id);

    const onUnpetClickHandler = async () => {
        const likes = await petService.unpet(pet, username);

        parentCallback(likes, !hasAlreadyLiked);
    };

    return <Button text="Unpet" onClickHandler={onUnpetClickHandler} />;
};

export default UnpetButton;
