import React from "react";

import useLike from "../../../hooks/useLike";
import { useAuthContext } from "../../../contexts/AuthContext";

import { Link } from "react-router-dom";

import PetCard from "..";
import PetButton from "../../buttons/pet-button";
import UnpetButton from "../../buttons/unpet-button";

import toUpperCase from "../../../utils/misc/toUpperCase"
import arePetsEqual from "../../../utils/misc/arePetsEqual";

const OtherPetCard = React.memo((pet) => {
    const { likes, hasAlreadyLiked, togggleLike } = useLike(
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
                                    parentCallback={togggleLike}
                                />
                            ) : (
                                <PetButton
                                    id={pet.id}
                                    hasAlreadyLiked={hasAlreadyLiked}
                                    parentCallback={togggleLike}
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
}, arePetsEqual);

OtherPetCard.displayName = 'OtherPetCard';
export default OtherPetCard;
