import { useEffect, useState } from 'react';

import { getAllPets } from '../../../utils/petService';

import PetsList from '../../pets-list';
import MyPetCard from '../../pet-card/my-pet-card';

const MyPetsList = ({ username }) => {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        getAllPets()
            .then(pets => {
                const userPets = pets.filter(p => p.creator?.toLowerCase() === username.toLowerCase());
                setPets(userPets);
            })
    }, [username]);

    return (
        <>
            {pets.length > 0 ?
                (<PetsList>
                    {pets.map(p => {
                        return <MyPetCard key={p.id} {...p} />
                    })}
                </PetsList>) :
                (<div>You haven't added pets yet!</div>)}
        </>
    );
}

export default MyPetsList;