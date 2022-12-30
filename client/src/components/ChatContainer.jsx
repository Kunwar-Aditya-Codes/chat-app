import useAuth from '../hooks/useAuth';

const ChatContainer = () => {
  const username = useAuth()?.username;

  return (
    <div className='flex h-[40rem] flex-grow flex-col rounded-md bg-sky-900/10 p-4'>
      {username ? (
        <h1 className='flex h-full items-center justify-center text-center text-4xl'>
          Welcome back {username}!
        </h1>
      ) : (
        <>
          <div className='mb-4  flex-grow overflow-y-scroll p-4'>
            <h1 className='w-fit rounded-md bg-sky-700 py-2 px-4 text-lg font-light'>
              Hi this is a message!
            </h1>
          </div>

          <div>
            <input
              type='text'
              autoFocus
              className='h-12 w-full rounded-md border border-sky-700 bg-sky-900/10 p-4 outline-none'
              placeholder='Type a message...'
            />
          </div>
        </>
      )}
    </div>
  );
};
export default ChatContainer;
