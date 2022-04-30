import { useMemo } from "react";
import { useNotification } from "../contexts/NotificationContext";

import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

import { useAuthState } from "react-firebase-hooks/auth";

const useAuthService = () => {
    const { notifyError } = useNotification();
    const auth = getAuth();

    const [, loading] = useAuthState(auth);

    const onStateChange = (callback) => {
        onAuthStateChanged(auth, callback);
    };

    const createUser = (username, password) => {
        return createUserWithEmailAndPassword(auth, username, password)
            .catch(e => {
                console.log(e);
                notifyError('E-mail already in use!');
            });
    };

    const signIn = (username, password) => {
        return signInWithEmailAndPassword(auth, username, password)
            .catch(e => {
                console.log(e);
                notifyError('Invalid e-mail or password!');
            });
    };

    const logout = () => {
        return signOut(auth).catch(console.log);
    };

    const returnValue = useMemo(() => ({
        loading,
        onStateChange,
        createUser,
        signIn,
        logout,
    }), [loading]);

    return returnValue;
};

export default useAuthService;
