import { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

import PetCard from "..";
import PetButton from "../../buttons/pet-button";
import UnpetButton from "../../buttons/unpet-button";
import AuthContext from "../../../contexts/AuthContext";

import petService from "../../../utils/petService";

const OtherPetCard = (props) => {
    const [likes, setLikes] = useState(props.likes);
    const [hasAlreadyLiked, setHasAlreadyLiked] = useState(false);
    const { username, isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn) {
            petService
                .hasUserLikedPet(props.id, username)
                .then((res) => setHasAlreadyLiked(res));
        }
    }, [props.id, username, isLoggedIn]);

    const petBtnCallback = (newLikes, newHasAlreadyLiked) => {
        setLikes(newLikes);
        setHasAlreadyLiked(newHasAlreadyLiked);
    };

    return (
        <li className="otherPet">
            <PetCard props={props} />
            <div className="pet-info">
                <>
                    {isLoggedIn && (
                        <>
                            {hasAlreadyLiked ? (
                                <UnpetButton
                                    id={props.id}
                                    hasAlreadyLiked={hasAlreadyLiked}
                                    parentCallback={petBtnCallback}
                                />
                            ) : (
                                <PetButton
                                    id={props.id}
                                    hasAlreadyLiked={hasAlreadyLiked}
                                    parentCallback={petBtnCallback}
                                />
                            )}
                        </>
                    )}
                    <Link to={`/pets/edit/${props.id}`}>
                        <button className="button">Details</button>
                    </Link>
                    <i className="fas fa-heart"></i> <span>{likes}</span>
                </>
            </div>
        </li>
    );
};

export default OtherPetCard;
