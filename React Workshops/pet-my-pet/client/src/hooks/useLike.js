import { useState, useEffect, useContext } from "react";

import AuthContext from "../contexts/AuthContext";
import petService from "../utils/petService";

const useLike = (petId, initialLikes) => {
    const [likes, setLikes] = useState(initialLikes);
    const [hasAlreadyLiked, setHasAlreadyLiked] = useState(false);
    const {username, isLoggedIn} = useContext(AuthContext);

    useEffect(() => {
        setLikes(initialLikes);
    }, [initialLikes]);

    useEffect(() => {
        if (isLoggedIn) {
            petService
                .hasUserLikedPet(petId, username)
                .then((res) => {
                    setHasAlreadyLiked(res);
                });
        }
    }, [petId, username, isLoggedIn]);

    const likeCallback = (newLikes, newHasAlreadyLiked) => {
        setLikes(newLikes);
        setHasAlreadyLiked(newHasAlreadyLiked);
    };

    return {likes, hasAlreadyLiked, likeCallback};
}

export default useLike;