import {
    getAuth,
    onAuthStateChanged,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";

export const auth = getAuth();

export const onStateChange = (callback) => {
    onAuthStateChanged(auth, callback);
};

export const createUser = (username, password) => {
    return createUserWithEmailAndPassword(auth, username, password)
        .catch(e => {
            console.log(e);
        });
};

export const signIn = (username, password) => {
    return signInWithEmailAndPassword(auth, username, password)
        .catch(e => {
            console.log(e);
        });
};

export const logout = () => {
    return signOut(auth).catch(console.log);
};