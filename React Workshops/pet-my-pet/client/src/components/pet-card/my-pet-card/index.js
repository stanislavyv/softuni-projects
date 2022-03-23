import PetCard from "..";
import petService from "../../../utils/petService";

const MyPetCard = (props) => {
    const deleteCallback = () => {
        petService.deletePet(props.id);
    }

    return (
        <li className="myPet">
            <PetCard props={props} type='my' parentCallback={deleteCallback}/>
        </li>
    );
};

export default MyPetCard;