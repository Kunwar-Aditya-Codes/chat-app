import { PowerIcon } from '@heroicons/react/24/solid';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../app/slices/authApiSlice';
import { useLogginUserMutation } from '../app/slices/userApiSlice';
import { logout } from '../app/slices/authSlice';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const UserInfoTab = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [logoutUser] = useLogoutMutation();
  const [logginUser, { data, isSuccess }] = useLogginUserMutation();

  const handleLogout = async () => {
    toast.loading('Logging out...', { id: 'logout' });
    dispatch(logout());
    const res = await logoutUser();

    if (res?.data) {
      toast.dismiss('logout');
      navigate('/login');
    }
  };

  useEffect(() => {
    logginUser();
  }, []);

  return (
    <div className='mb-3 flex items-center justify-between border-b-2 border-b-sky-900/30 pb-3'>
      {isSuccess && (
        <div className='flex items-center justify-center space-x-3 font-light tracking-wide'>
          <img
            src={data?.user?.profileImage}
            alt='Profile Image'
            className='h-9 w-9 rounded-full'
          />
          <h1>{data?.user?.username}</h1>
        </div>
      )}
      <div>
        <button className='rounded-md bg-sky-900/20 p-2 transition ease-in hover:bg-sky-700'>
          <PowerIcon className='h-4 w-4' onClick={handleLogout} />
        </button>
      </div>
    </div>
  );
};
export default UserInfoTab;
