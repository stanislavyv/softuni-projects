import { getAuth,
         onAuthStateChanged,
         createUserWithEmailAndPassword,
         signInWithEmailAndPassword,
         signOut } from "firebase/auth";

const authService = () => {
    const auth = getAuth();

    const onStateChange = (callback) => {
        onAuthStateChanged(auth, callback);
    };

    const createUser = (username, password) => {
        return createUserWithEmailAndPassword(auth, username, password);
    };

    const signIn = (username, password) => {
        return signInWithEmailAndPassword(auth, username, password);
    };

    const logout = () => {
        return signOut(auth);
    };

    return {
        onStateChange,
        createUser,
        signIn,
        logout
    };
};

export default authService();