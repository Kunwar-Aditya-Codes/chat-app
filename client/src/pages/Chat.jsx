import { useEffect, useState } from 'react';
import { useLogoutMutation } from '../app/slices/authApiSlice';
import { useGetLoggedInUserMutation } from '../app/slices/userApiSlice';
import ChatSpace from '../components/ChatSpace';
import { useNavigate } from 'react-router-dom';
import { PowerIcon, Bars2Icon, XMarkIcon } from '@heroicons/react/24/solid';
import { randomQuotes } from '../misc/Quotes';

const Chat = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [quote, setQuote] = useState();

  const [getLoggedInUser, { data, isLoading, error }] =
    useGetLoggedInUserMutation();

  const [logout] = useLogoutMutation();

  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuote = randomQuotes();
    setQuote(fetchQuote);
  }, []);

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
      {modalOpen && (
        <div className='absolute bg-black/80 w-full h-full z-[100000] flex overflow-hidden items-center justify-center top-0'>
          <div className='bg-black h-[80%] w-[90%] flex flex-col  max-w-7xl rounded-md border border-indigo-600'>
            <div className='w-full flex items-center justify-end p-4'>
              <XMarkIcon
                className='w-8 h-8 cursor-pointer'
                onClick={() => setModalOpen(false)}
              />
            </div>
            <div className='flex-grow flex flex-col items-center  space-y-8 font-light p-2'>
              <img
                src={data?.profilePic}
                alt=''
                className='w-[45%] sm:w-[30%] md:w-[20%]'
              />
              <div className='flex flex-col items-center space-y-6 md:flex-[0.5]'>
                <h1 className='text-2xl lg:text-3xl'>{data?.username}</h1>
                <h2 className='text-lg lg:text-2xl'>{data?.email}</h2>
                {quote && (
                  <div className='text-center lg:text-lg px-4 italic'>
                    <p>"{quote.quote}"</p> <span>-{quote.author}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div className='md:mt-4 mt-2 mb-6 bg-black rounded-md w-full p-[0.1rem] border-b-2 border-b-indigo-600'>
        <div className=' py-3 flex items-center  rounded-md justify-between px-4'>
          <div className='md:hidden'>
            <Bars2Icon
              className='h-5 w-5 cursor-pointer '
              onClick={() => setShowSidebar(!showSidebar)}
            />
          </div>

          <div
            className='flex items-center space-x-4 cursor-pointer'
            onClick={() => setModalOpen(true)}
          >
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
