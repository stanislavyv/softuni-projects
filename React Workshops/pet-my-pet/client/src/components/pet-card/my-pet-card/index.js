import PetCard from "..";
import DeleteButton from "../../buttons/delete-button";
import { Link } from "react-router-dom";

import { toUpperCase } from '../../../utils/misc/toUpperCase';

const MyPetCard = (pet) => {
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
};

export default MyPetCard;
