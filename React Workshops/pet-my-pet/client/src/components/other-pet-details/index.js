import { useParams } from "react-router-dom";
import usePet from "../../hooks/usePet";
import useLike from "../../hooks/useLike";

import PetButton from "../buttons/pet-button";
import UnpetButton from "../buttons/unpet-button";

const OtherPetDetails = () => {
    const { id } = useParams();
    const pet = usePet(id);
    const {likes, hasAlreadyLiked, likeCallback} = useLike(id, pet.likes);

    return (
        <section className="detailsOtherPet">
            <h3>{pet.name}</h3>
            <p>
                Pet counter: {likes}
                <>
                            {hasAlreadyLiked ? (
                                <UnpetButton
                                    id={id}
                                    hasAlreadyLiked={hasAlreadyLiked}
                                    parentCallback={likeCallback}
                                />
                            ) : (
                                <PetButton
                                    id={id}
                                    hasAlreadyLiked={hasAlreadyLiked}
                                    parentCallback={likeCallback}
                                />
                            )}
                        </>
            </p>
            <p className="img">
                <img src={pet.imageURL} alt="Pet" />
            </p>
            <p className="description">{pet.description}</p>
        </section>
    );
};

export default OtherPetDetails;
