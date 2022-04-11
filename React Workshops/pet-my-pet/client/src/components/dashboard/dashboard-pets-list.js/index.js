import { useState, useEffect } from "react";
import { useAuthContext } from "../../../contexts/AuthContext";
import usePetService from "../../../hooks/usePetService";

import OtherPetCard from "../../pet-card/other-pet-card";
import MyPetCard from "../../pet-card/my-pet-card";
import { useNotificationContext } from "../../../contexts/NotificationContext";

const DashboardPetsList = ({ category }) => {
    const [pets, setPets] = useState([]);
    const { username, isLoggedIn } = useAuthContext();
    const { getAllPets } = usePetService();
    const { notification } = useNotificationContext();

    // use notification.message so useEffect() doesn't get called twice on notification state change
    useEffect(() => {
        console.log('hi');
        getAllPets(category).then((pets) => {
            setPets(pets);
        });
    }, [category, notification.message]);
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
