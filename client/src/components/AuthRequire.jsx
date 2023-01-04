import { Outlet, Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const AuthRequire = () => {
  const location = useLocation();
  const uid = useAuth();
  return (
    <>
      {uid ? (
        <Outlet />
      ) : (
        <Navigate
          to='/login'
          state={{
            from: location,
          }}
          replace
        />
      )}
    </>
  );
};
export default AuthRequire;
