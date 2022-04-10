import { useAuthContext } from "../contexts/AuthContext";

import { Navigate } from 'react-router-dom';

const AuthRoute = ({ children }) => {
    const { isLoggedIn } = useAuthContext();

    return (isLoggedIn ? children : <Navigate to='/login' />);
}

export default AuthRoute;