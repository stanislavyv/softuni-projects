import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import petService from '../../utils/petService';

const PetDetails = () => {
    const { id } = useParams();
    const [pet, setPet] = useState({});    
    
    useEffect(() => {
        petService
            .getById(id)
            .then(res => {
                return setPet(res)});
    }, [id]);

    return (
        <section className="detailsOtherPet">
            <h3>{pet.name}</h3>
            <p>
                Pet counter: {pet.likes}
                <a href="#"
                    ><button className="button">
                        <i className="fas fa-heart"></i> Pet
                    </button>
                </a>
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