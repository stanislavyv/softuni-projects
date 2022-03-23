import { useState } from 'react';
import { Link } from 'react-router-dom';
import PetButton from '../pet-button';

const PetCard = (props) => {
    const [likes, setLikes] = useState(props.likes);
    
    const likesCallback = (newLikes) => {
        setLikes(newLikes);
    };

    return (
        <li className="otherPet">
        <h3>Name: {props.name}</h3>
        <p>Category: {props.category}</p>
        <p className="img">
            <img
                src={props.imageURL} alt="pet"
            />
        </p>
        <p className="description">{props.description}</p>
        <div className="pet-info">
            <PetButton id={props.id} parentCallback={likesCallback}/>
            <Link to={`/pets/edit/${props.id}`}>
                <button className="button">Details</button>
            </Link>
            <i className="fas fa-heart"></i> <span>{likes}</span>
        </div>
        </li>
    );
};

export default PetCard;