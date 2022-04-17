import React from "react";

import PetCard from "..";
import DeleteButton from "../../buttons/delete-button";
import { Link } from "react-router-dom";

import toUpperCase from '../../../utils/misc/toUpperCase';
import arePetsEqual from "../../../utils/misc/arePetsEqual";

const MyPetCard = React.memo((pet) => {
    return (
        <li className="myPet">
            <PetCard pet={{ ...pet, category: toUpperCase(pet.category) }} />
            <div className="pet-info">
                <DeleteButton id={pet.id} />
                <Link to={`/pets/edit/${pet.id}`} className="button">
                    Edit
                </Link>
            </div>
        </li>
    );
}, arePetsEqual);

MyPetCard.displayName = 'MyPetCard';
export default MyPetCard;
