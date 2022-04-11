import React, { useContext } from 'react';

const AuthContext = React.createContext({});
AuthContext.displayName = 'AuthContext';

export const useAuthContext = () => useContext(AuthContext);

export default AuthContext;