import React, { useState, useEffect, useContext, useMemo } from 'react';
import useAuthService from '../../hooks/useAuthService';


const AuthContext = React.createContext({});
AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const { loading, onStateChange, createUser, signIn, logout } = useAuthService();

    useEffect(() => {
        onStateChange(setUser);
    }, []);

    const authValue = useMemo(() => ({
        loading,
        isLoggedIn: Boolean(user),
        username: user?.email,
        createUser,
        signIn,
        logout
    }), [user, loading]);

    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;