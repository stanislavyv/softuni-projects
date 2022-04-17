import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLike from "../../hooks/useLike";
import { useAuthContext } from "../../contexts/AuthContext";
import usePetService from '../../hooks/usePetService';

import PetButton from "../buttons/pet-button";
import UnpetButton from "../buttons/unpet-button";

const OtherPetDetails = () => {
    const [pet, setPet] = useState({});
    const { id } = useParams();
    const { likes, hasAlreadyLiked, togggleLike } = useLike(id, pet.likes);
    const { isLoggedIn } = useAuthContext();
    const { getPetById } = usePetService();

    useEffect(() => {
        getPetById(id)
            .then(setPet);
    }, [id])

    return (
        <section className="detailsOtherPet">
            <h3>{pet.name}</h3>
            <p>
                Pet counter: {likes}
                {isLoggedIn && (
                    <>
                        {hasAlreadyLiked ? (
                            <UnpetButton
                                id={id}
                                hasAlreadyLiked={hasAlreadyLiked}
                                parentCallback={togggleLike}
                            />
                        ) : (
                            <PetButton
                                id={id}
                                hasAlreadyLiked={hasAlreadyLiked}
                                parentCallback={togggleLike}
                            />
                        )}
                    </>
                )}
            </p>
            <p className="img">
                <img src={pet.imageURL} alt="Pet" />
            </p>
            <p className="description">{pet.description}</p>
        </section>
    );
};

export default OtherPetDetails;
