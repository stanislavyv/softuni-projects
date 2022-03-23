import { useEffect, useState } from 'react';
import petService from '../../utils/petService'
import PetCard from '../cards/other-pet-card';

const MyPetsList = ({ username }) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        setPets(getUserPets);
    }, []);
    
    const getUserPets = (pets) => {
        petService
            .getAll()
            .then(pets => {
                return pets.filter(p => p.creator === username)
            })
    };

    return (
        <ul className="my-pets-list">
            {pets.forEach(p => {
                <PetCard {...p} />
            })}
        </ul>
    );
}

export default MyPetsList;