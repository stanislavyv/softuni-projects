import { useState, useEffect } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import usePetService from "../../../hooks/usePetService";
import { useNotification } from "../../../contexts/NotificationContext";

import PetsList from "../../pets-list";
import OtherPetCard from "../../pet-card/other-pet-card";
import MyPetCard from "../../pet-card/my-pet-card";

const DashboardPetsList = ({ category }) => {
    const [pets, setPets] = useState([]);
    const { username, isLoggedIn } = useAuth();
    const { getAllPets } = usePetService();
    const { notification } = useNotification();

    // use notification.message so useEffect() doesn't get called twice on notification state change
    useEffect(() => {
        getAllPets(category).then((pets) => {
            setPets(pets);
        });
    }, [category, notification.message]);
    return (
        <PetsList>
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
        </PetsList>
    );
};

export default DashboardPetsList;
