import { useState, useEffect } from "react";
import authService from "../utils/authService";

const useUser = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        authService.onStateChange(setUser);
    }, []);

    const authInfo = {
        isLoggedIn: Boolean(user),
        username: user?.email,
    };
    
    return authInfo;
}

export default useUser;