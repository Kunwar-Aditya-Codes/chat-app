import { Navigate, Outlet, useLocation } from 'react-router-dom';

const RequireAuth = () => {
  const location = useLocation();
  const { username } = useAuth();

  const content = username ? (
    <Outlet />
  ) : (
    <Navigate
      to={{
        pathname: '/login',
        state: { from: location.pathname },
      }}
    />
  );

  return content;
};

export default RequireAuth;
