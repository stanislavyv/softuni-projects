import { useContext, useEffect } from "react";
import AuthContext from "../contexts/AuthContext";

import { Navigate } from 'react-router-dom';

const isAuth = (WrappedComponent) => {
    const Component = (props) => {
        const { isAuthenticated } = useContext(AuthContext);

        return isAuthenticated ? <WrappedComponent {...props} /> : <Navigate to='/login' />;
    };

    return <Component />;
};

export default isAuth;
