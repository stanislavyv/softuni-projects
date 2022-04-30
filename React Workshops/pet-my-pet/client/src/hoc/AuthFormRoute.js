import { useAuth } from "../contexts/AuthContext";

import { Navigate } from 'react-router-dom';

const AuthFormRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    return (!isLoggedIn ? children : <Navigate to='/pets' />);
}

export default AuthFormRoute;