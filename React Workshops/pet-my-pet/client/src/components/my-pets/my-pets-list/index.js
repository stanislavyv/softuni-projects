import { useEffect, useState } from 'react';
import usePetService from '../../../hooks/usePetService';

import MyPetCard from '../../pet-card/my-pet-card';

const MyPetsList = ({ username }) => {
    const [pets, setPets] = useState([]);
    const { getAllPets } = usePetService();

    useEffect(() => {
        getAllPets()
            .then(pets => {
                const userPets = pets.filter(p => p.creator?.toLowerCase() === username.toLowerCase());
                setPets(userPets);
            })
    }, []);

    return (
        <ul className="my-pets-list">
            {pets.map(p => {
                return <MyPetCard key={p.id} {...p} />
            })}
        </ul>
    );
}

export default MyPetsList;