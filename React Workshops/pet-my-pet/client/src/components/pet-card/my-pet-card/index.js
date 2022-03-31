import PetCard from "..";
import { Link } from "react-router-dom";
import petService from "../../../utils/petService";

const MyPetCard = (props) => {
    const deleteCallback = () => {
        petService.deletePet(props.id);
    };

    return (
        <li className="myPet">
            <PetCard props={props} />
            <div className="pet-info">
                <a href="" className="button" onClick={deleteCallback}>
                    Delete
                </a>
                <Link to={`/pets/edit/${props.id}`} className="button">
                    Edit
                </Link>
            </div>
        </li>
    );
};

export default MyPetCard;
