import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../app/slices/authSlice';

const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  let uid = null;

  if (token) {
    const decodedToken = jwtDecode(token);

    console.log(decodedToken);

    return uid;
  }

  return uid;
};

export default useAuth;
