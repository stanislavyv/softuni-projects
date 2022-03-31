import { useState, useEffect, useContext } from "react";

import OtherPetCard from "../../pet-card/other-pet-card";
import MyPetCard from "../../pet-card/my-pet-card";
import AuthContext from "../../../contexts/AuthContext";

import petService from "../../../utils/petService";

const DashboardPetsList = (props) => {
    const [pets, setPets] = useState([]);
    const { username, isLoggedIn } = useContext(AuthContext);

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
