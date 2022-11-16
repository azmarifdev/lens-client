import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../AuthProvider/AuthProvider';
import Loading from '../Components/Others/Loading';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    if (user && user?.uid) {
        return children;
    }

    if (loading) {
        return <Loading />;
    }
    
    return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
