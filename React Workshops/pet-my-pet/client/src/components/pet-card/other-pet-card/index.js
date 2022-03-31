import { useContext } from "react";
import useLike from "../../../hooks/useLike";

import { Link } from "react-router-dom";

import PetCard from "..";
import PetButton from "../../buttons/pet-button";
import UnpetButton from "../../buttons/unpet-button";
import AuthContext from "../../../contexts/AuthContext";

const OtherPetCard = (props) => {
    const {likes, hasAlreadyLiked, likeCallback} = useLike(props.id, props.likes);
    const {isLoggedIn} = useContext(AuthContext);

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
                                    parentCallback={likeCallback}
                                />
                            ) : (
                                <PetButton
                                    id={props.id}
                                    hasAlreadyLiked={hasAlreadyLiked}
                                    parentCallback={likeCallback}
                                />
                            )}
                        </>
                    )}
                    <Link to={`/pets/${props.id}`}>
                        <button className="button">Details</button>
                    </Link>
                    <i className="fas fa-heart"></i> <span>{likes}</span>
                </>
            </div>
        </li>
    );
};

export default OtherPetCard;
