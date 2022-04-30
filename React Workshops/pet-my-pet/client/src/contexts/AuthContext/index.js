import React, { useState, useEffect, useContext, useMemo } from 'react';
import { useAuthState } from "react-firebase-hooks/auth";

import { auth, onStateChange } from '../../utils/authService';

const AuthContext = React.createContext({});
AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [, loading] = useAuthState(auth);

    useEffect(() => {
        onStateChange(setUser);
    }, []);

    const authValue = useMemo(() => ({
        loading,
        isLoggedIn: Boolean(user),
        username: user?.email,
    }), [user, loading]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;