import { useEffect, useState } from 'react';
import petService from '../../../utils/petService'
import MyPetCard from '../../pet-card/my-pet-card';

const MyPetsList = ({ username }) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        petService
            .getAll()
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