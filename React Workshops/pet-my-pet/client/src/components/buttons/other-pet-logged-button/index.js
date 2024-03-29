import { useAuth } from "../../../contexts/AuthContext";

import PetButton from "../../buttons/pet-button";
import UnpetButton from "../../buttons/unpet-button";

const OtherPetLoggedButton = ({ hasAlreadyLiked, id, toggleLike }) => {
    const { isLoggedIn } = useAuth();

    return (
        <>
            {isLoggedIn && (
                <>
                    {hasAlreadyLiked ? (
                        <UnpetButton
                            id={id}
                            hasAlreadyLiked={hasAlreadyLiked}
                            parentCallback={toggleLike}
                        />
                    ) : (
                        <PetButton
                            id={id}
                            hasAlreadyLiked={hasAlreadyLiked}
                            parentCallback={toggleLike}
                        />
                    )}
                </>
            )}
        </>
    );
}

export default OtherPetLoggedButton;