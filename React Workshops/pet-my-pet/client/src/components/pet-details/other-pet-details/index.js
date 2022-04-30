import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useLike from "../../../hooks/useLike";

import { getPetById } from "../../../utils/petService";

import PetCardWrapper from "../../pet-card/pet-card-wrapper";
import PetDetailsWrapper from "../pet-details-wrapper";
import PetImage from "../../pet-card/pet-image";
import OtherPetLoggedButton from "../../buttons/other-pet-logged-button";

const OtherPetDetails = () => {
    const [pet, setPet] = useState({});
    const { id } = useParams();
    const { hasAlreadyLiked, toggleLike } = useLike(id, pet.likes);

    useEffect(() => {
        getPetById(id)
            .then(setPet);
    }, [id])

    return (
        <PetDetailsWrapper>
            <PetCardWrapper otherDetails>
                <h3 className="pet-name">{pet.name}</h3>
                <p className="pet-counter">
                    <span className="bold-span">Pet counter:</span> {pet.likes}
                </p>
                <OtherPetLoggedButton
                    id={pet.id}
                    hasAlreadyLiked={hasAlreadyLiked}
                    toggleLike={toggleLike}
                />
                <PetImage url={pet.imageURL} />
                <p className="pet-description">{pet.description}</p>
            </PetCardWrapper>
        </PetDetailsWrapper>
    );
};

export default OtherPetDetails;
