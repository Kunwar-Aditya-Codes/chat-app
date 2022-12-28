import jwtDecode from 'jwt-decode';
import { useSelector } from 'react-redux';
import { selectToken } from '../app/slices/authSlice';

const useAuth = () => {
  const token = useSelector(selectToken);

  if (token) {
    const decoded = jwtDecode(token);

    console.log('decoded', decoded);
  }
};

export default useAuth;
