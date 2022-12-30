import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const RequireAuth = () => {
  const location = useLocation();
  const username = useAuth()?.username;

  const content = username ? (
    <Outlet />
  ) : (
    <Navigate to='/login' state={{ from: location.pathname }} replace />
  );

  return content;
};

export default RequireAuth;
