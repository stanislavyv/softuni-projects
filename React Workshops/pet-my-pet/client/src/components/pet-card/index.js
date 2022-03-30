import { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import PetButton from '../buttons/pet-button';
import UnpetButton from '../buttons/unpet-button'
import AuthContext from '../../contexts/AuthContext';

const PetCard = ( { props, type, parentCallback } ) => {
    const {username} = useContext(AuthContext);
    const [hasAlreadyLiked, setHasAlreadyLiked] = useState(false);

    useEffect(() => {
        setHasAlreadyLiked(Boolean(props.peopleLiked) ? props.peopleLiked.includes(username) : false);
    }, [props.peopleLiked, username])
    
    return (
        <>
            <h3>Name: {props.name}</h3>
            <p>Category: {props.category}</p>
            <p className="img">
                <img
                    src={props.imageURL} alt="pet"
                />
            </p>
            <p className="description">{props.description}</p>
            <div className="pet-info">
                { type === 'other' ?
                    <> 
                        {hasAlreadyLiked 
                            ? <UnpetButton id={props.id} parentCallback={parentCallback}  />
                            : <PetButton id={props.id} parentCallback={parentCallback} />
                        }
                        
                        <Link to={`/pets/edit/${props.id}`}>
                            <button className="button">Details</button>
                        </Link>
                        <i className="fas fa-heart"></i> <span>{props.likes}</span>
                    </>
                  :
                    <>
                        <a href='' className='button' onClick={parentCallback}>Delete</a>
                        <Link to={`/pets/edit/${props.id}`} className='button' >Edit</Link>
                    </>
                }
            </div>
        </>
        );
};

export default PetCard;