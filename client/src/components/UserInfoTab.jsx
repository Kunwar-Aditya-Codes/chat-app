import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../app/slices/authApiSlice';
import { logout } from '../app/slices/authSlice';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';

const UserInfoTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const username = useAuth()?.username;

  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    toast.loading('Logging out...', { id: 'logout' });
    dispatch(logout());
    const res = await logoutUser();

    if (res?.data) {
      toast.dismiss('logout');
      navigate('/login');
    }
  };

  return (
    <div className='mb-3 flex items-center justify-between border-b-2 border-b-sky-900/30 pb-3'>
      <div className='flex items-center justify-center space-x-3 font-light tracking-wide'>
        <UserCircleIcon className='h-9 w-9' />
        <h1>{username}</h1>
      </div>
      <div>
        <button className='rounded-md bg-sky-900/20 p-2 transition ease-in hover:bg-sky-700'>
          <PowerIcon className='h-4 w-4' onClick={handleLogout} />
        </button>
      </div>
    </div>
  );
};
export default UserInfoTab;
