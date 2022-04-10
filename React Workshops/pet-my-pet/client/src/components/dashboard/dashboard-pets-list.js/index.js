import { useState, useEffect } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import usePetService from "../../../hooks/usePetService";

import OtherPetCard from "../../pet-card/other-pet-card";
import MyPetCard from "../../pet-card/my-pet-card";

const DashboardPetsList = ({ category }) => {
    const [pets, setPets] = useState([]);
    const { username, isLoggedIn } = useAuthContext();
    const { getAllPets } = usePetService();

    useEffect(() => {
        getAllPets(category).then((pets) => {
            setPets(pets);
        });
    }, [category]);

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
