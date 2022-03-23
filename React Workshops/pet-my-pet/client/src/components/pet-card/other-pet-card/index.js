import { useState } from 'react';
import PetCard from '..';

const OtherPetCard = (props) => {
    const [likes, setLikes] = useState(props.likes);
    
    const likesCallback = (newLikes) => {
        setLikes(newLikes);
    };

    return (
        <li className="otherPet">
            <PetCard props={props} type='other' parentCallback={likesCallback}/>
        </li>
    );
};

export default OtherPetCard;