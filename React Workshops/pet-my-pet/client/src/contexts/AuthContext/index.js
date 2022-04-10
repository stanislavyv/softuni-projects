import React, { useContext } from 'react';

const AuthContext = React.createContext({});

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;