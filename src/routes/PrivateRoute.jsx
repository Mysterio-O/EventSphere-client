import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import Loader from '../loaders/Loader';

const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    console.log(location);

    if (loading) return <Loader />;
    if (!user) return <Navigate state={location?.pathname} to="/auth/login" />;

    return children;
};

export default PrivateRoute;
