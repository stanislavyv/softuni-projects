import { useState, useEffect } from "react";
import useAuthContext from "../../../hooks/useAuthContext";

import OtherPetCard from "../../pet-card/other-pet-card";
import MyPetCard from "../../pet-card/my-pet-card";

import petService from "../../../utils/petService";

const DashboardPetsList = (props) => {
    const [pets, setPets] = useState([]);
    const { username, isLoggedIn } = useAuthContext();

    useEffect(() => {
        const category = props.category;

        petService.getAll(category).then((pets) => {
            setPets(pets);
        });
    }, [props.category]);

    return (
        <ul className="other-pets-list">
            {pets?.map((pet) => {
                if (isLoggedIn) {
                    return pet.creator.toLowerCase() === username.toLowerCase() ? (
                        <MyPetCard key={pet.id} {...pet} />
                    ) : (
                        <OtherPetCard key={pet.id} {...pet} />
                    );
                }
                
                return <OtherPetCard key={pet.id} {...pet} />;
            })}
        </ul>
    );
};

export default DashboardPetsList;
