import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import petService from '../../utils/petService';
import PetButton from '../pet-button';

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState({});    
    const [likes, setLikes] = useState(pet.likes);
    
    useEffect(() => {
        petService
            .getById(id)
            .then(res => {
                return setPet(res)});
    }, [id]);

    const likesCallback = (newLikes) => {
        setLikes(newLikes);
    };

    return (
        <section className="detailsOtherPet">
            <h3>{pet.name}</h3>
            <p>
                Pet counter: {likes}
                <PetButton id={id} parentCallback={likesCallback}/>
            </p>
            <p className="img">
                <img
                    src={pet.imageURL}
                    alt="Pet"
                />
            </p>
            <p className="description">{pet.description}</p>
        </section>
    );    
}

export default PetDetails;