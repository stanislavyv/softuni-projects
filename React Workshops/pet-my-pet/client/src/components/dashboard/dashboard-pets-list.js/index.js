import { useState, useEffect } from "react";
import OtherPetCard from "../../cards/other-pet-card";
import petService from "../../../utils/petService";

const DashboardPetsList = (props) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        const category = props.category;

        petService
            .getAll(category)
            .then(pets => {
                setPets(pets);
            });
    }, [props.category]);

    return (
        <ul className="other-pets-list">
            {pets?.map(pet => {
                return <OtherPetCard key={pet.id} {...pet} />
            })}
        </ul>
    );
};

export default DashboardPetsList;