import useLike from "../../../hooks/useLike";
import { useAuthContext } from "../../../contexts/AuthContext";

import { Link } from "react-router-dom";

import PetCard from "..";
import PetButton from "../../buttons/pet-button";
import UnpetButton from "../../buttons/unpet-button";

import { toUpperCase } from "../../../utils/misc/toUpperCase"

const OtherPetCard = (pet) => {
    const { likes, hasAlreadyLiked, likeCallback } = useLike(
        pet.id,
        pet.likes
    );
    const { isLoggedIn } = useAuthContext();
    return (
        <li className="otherPet">
            <PetCard pet={{ ...pet, category: toUpperCase(pet.category) }} />
            <div className="pet-info">
                <>
                    {isLoggedIn && (
                        <>
                            {hasAlreadyLiked ? (
                                <UnpetButton
                                    id={pet.id}
                                    hasAlreadyLiked={hasAlreadyLiked}
                                    parentCallback={likeCallback}
                                />
                            ) : (
                                <PetButton
                                    id={pet.id}
                                    hasAlreadyLiked={hasAlreadyLiked}
                                    parentCallback={likeCallback}
                                />
                            )}
                        </>
                    )}
                    <Link to={`/pets/${pet.id}`}>
                        <button className="button">Details</button>
                    </Link>
                    <i className="fas fa-heart"></i> <span>{likes}</span>
                </>
            </div>
        </li>
    );
};

export default OtherPetCard;
