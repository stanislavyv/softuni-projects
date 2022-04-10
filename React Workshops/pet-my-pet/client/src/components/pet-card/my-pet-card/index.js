import PetCard from "..";
import DeleteButton from "../../buttons/delete-button";
import { Link } from "react-router-dom";

import { toUpperCase } from '../../../utils/misc/toUpperCase';

const MyPetCard = (props) => {
    return (
        <li className="myPet">
            <PetCard pet={{ ...props, category: toUpperCase(props.category) }} />
            <div className="pet-info">
                <DeleteButton id={props.id} />
                <Link to={`/pets/edit/${props.id}`} className="button">
                    Edit
                </Link>
            </div>
        </li>
    );
};

export default MyPetCard;
