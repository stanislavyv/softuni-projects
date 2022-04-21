import React from "react";

import PetCard from "..";
import PetCardWrapper from "../pet-card-wrapper";
import DeleteButton from "../../buttons/delete-button";
import EditButton from "../../buttons/edit-button";

import toUpperCase from '../../../utils/misc/toUpperCase';
import arePetsEqual from "../../../utils/misc/arePetsEqual";
import PetInfo from "../pet-info";

const MyPetCard = React.memo((pet) => {
    return (
        <PetCardWrapper as='li'>
            <PetCard pet={{ ...pet, category: toUpperCase(pet.category) }} />
            <PetInfo>
                <DeleteButton id={pet.id} />
                <EditButton id={pet.id} />
            </PetInfo>
        </PetCardWrapper>
    );
}, arePetsEqual);

MyPetCard.displayName = 'MyPetCard';
export default MyPetCard;
