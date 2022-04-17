import React from "react";
import arePetsEqual from "../../utils/misc/arePetsEqual";

const PetCard = React.memo(({ pet }) => {
    return (
        <>
            <h3>Name: {pet.name}</h3>
            <p>Category: {pet.category}</p>
            <p className="img">
                <img src={pet.imageURL} alt="pet" />
            </p>
            <p className="description">{pet.description}</p>
        </>
    );
}, arePetsEqual);

PetCard.displayName = 'PetCard';
export default PetCard;
