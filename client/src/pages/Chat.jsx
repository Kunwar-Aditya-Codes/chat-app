import { useEffect } from 'react';
import { useGetLoggedInUserMutation } from '../app/slices/userApiSlice';
import ChatSpace from '../components/ChatSpace';

const Chat = () => {
  const [getLoggedInUser, { data, isLoading, error }] =
    useGetLoggedInUserMutation();

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
    <div className='h-full flex flex-col items-center max-w-[90rem] mx-auto w-full '>
      <div className='mt-4 mb-10 bg-gradient-to-br from-indigo-600 to-sky-600 rounded-md w-full p-[0.1rem] '>
        <div className='bg-black/90 py-3 flex items-center rounded-md justify-between px-4'>
          <div className='flex items-center space-x-4 '>
            <img
              src={data?.profilePic}
              alt='Profile Image'
              className='w-8 h-8 rounded-full'
            />

            <p>{data?.username}</p>
          </div>
          <div>
            <button>Logout</button>
          </div>
        </div>
      </div>
      <div className='flex-grow w-full mb-6'>
        <ChatSpace />
      </div>
    </div>
  );
};
export default Chat;
