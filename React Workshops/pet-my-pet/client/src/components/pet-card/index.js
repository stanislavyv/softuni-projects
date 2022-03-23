import { useState } from 'react';

import { Link } from 'react-router-dom';
import PetButton from '../buttons/pet-button'

const PetCard = ( { props, type, parentCallback } ) => {
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
                        <PetButton id={props.id} parentCallback={parentCallback}/>
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