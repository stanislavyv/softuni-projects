import { useState, useEffect } from "react";
import useAuthContext from "./useAuthContext";
import usePetService from './usePetService';

const useLike = (petId, initialLikes) => {
    const [likes, setLikes] = useState(initialLikes);
    const [hasAlreadyLiked, setHasAlreadyLiked] = useState(false);
    const { username, isLoggedIn } = useAuthContext();
    const { hasUserLikedPet } = usePetService();

    useEffect(() => {
        setLikes(initialLikes);
    }, [initialLikes]);

    useEffect(() => {
        if (isLoggedIn) {
            hasUserLikedPet(petId, username)
                .then((res) => {
                    setHasAlreadyLiked(res);
                });
        }
    }, [petId, username, isLoggedIn]);

    const likeCallback = (newLikes, newHasAlreadyLiked) => {
        setLikes(newLikes);
        setHasAlreadyLiked(newHasAlreadyLiked);
    };

    return { likes, hasAlreadyLiked, likeCallback };
}

export default useLike;