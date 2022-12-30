import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectToken } from '../app/slices/authSlice';

const useAuth = () => {
  const token = useSelector(selectToken);

  if (token) {
    const decoded = jwtDecode(token);

    return decoded;
  }

  return null;
};

export default useAuth;
