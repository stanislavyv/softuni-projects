import { useState, useEffect, useMemo } from "react";
import { useAuth } from "../contexts/AuthContext";
import usePetService from './usePetService';

const useLike = (petId, initialLikes) => {
    const [likes, setLikes] = useState(initialLikes);
    const [hasAlreadyLiked, setHasAlreadyLiked] = useState(false);

    const { username, isLoggedIn } = useAuth();
    const { hasUserLikedPet } = usePetService();

    useEffect(() => {
        if (isLoggedIn) {
            hasUserLikedPet(petId, username)
                .then((res) => {
                    setHasAlreadyLiked(res);
                });
        }
    }, [petId, username, isLoggedIn]);

    const toggleLike = (newLikes, newHasAlreadyLiked) => {
        setLikes(newLikes);
        setHasAlreadyLiked(newHasAlreadyLiked);
    };

    const value = useMemo(() => ({
        likes,
        hasAlreadyLiked,
        toggleLike
    }), [hasAlreadyLiked]);

    return value;
}

export default useLike;