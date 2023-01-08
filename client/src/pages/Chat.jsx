import { useEffect, useState } from 'react';
import { useLogoutMutation } from '../app/slices/authApiSlice';
import { useGetLoggedInUserMutation } from '../app/slices/userApiSlice';
import ChatSpace from '../components/ChatSpace';
import { useNavigate } from 'react-router-dom';
import { PowerIcon, Bars2Icon } from '@heroicons/react/24/solid';

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const [getLoggedInUser, { data, isLoading, error }] =
    useGetLoggedInUserMutation();

  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.data.message}</div>;
  }

  return (
    <div className='h-full flex flex-col items-center max-w-[90rem] mx-auto w-full p-2 '>
      {/* User Header */}
      <div className='md:mt-4 mt-2 mb-6 bg-black rounded-md w-full p-[0.1rem] border-b-2 border-b-indigo-600'>
        <div className=' py-3 flex items-center  rounded-md justify-between px-4'>
          <div className='md:hidden'>
            <Bars2Icon
              className='h-5 w-5 cursor-pointer '
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>

          <div className='flex items-center space-x-4 '>
            <img
              src={data?.profilePic}
              alt='Profile Image'
              className='w-8 h-8 rounded-full'
            />
            <p>{data?.username}</p>
          </div>
          <div>
            <PowerIcon
              className='h-5 w-5 cursor-pointer'
              onClick={() => logout().then(() => navigate('/login'))}
            />
          </div>
        </div>
      </div>

      {/* Chat Space */}
      <div className='flex-grow w-full mb-6 '>
        <ChatSpace showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </div>
    </div>
  );
};
export default Chat;
