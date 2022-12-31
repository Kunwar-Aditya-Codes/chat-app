import { useEffect, useState } from 'react';
import {
  useCreateChatMutation,
  useGetChatQuery,
} from '../app/slices/chatApiSlice';
import { useSearchUsersMutation } from '../app/slices/userApiSlice';
import useAuth from '../hooks/useAuth';

// ! Fix the user list issue

const ChatSidePanel = () => {
  const [search, setSearch] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const username = useAuth()?.username;
  const loggedUserId = useAuth()?.id;

  const [searchUsers, { data, isLoading, isError, isSuccess }] =
    useSearchUsersMutation();

  const [
    createChat,
    {
      isLoading: isChatLoading,
      isError: isChatError,
      data: chatData,
      isSuccess: isChatSuccess,
    },
  ] = useCreateChatMutation();

  const {
    data: chatDataQuery,
    isLoading: isChatLoadingQuery,
    isError: isChatErrorQuery,
    isSuccess: isChatSuccessQuery,
  } = useGetChatQuery(
    {},
    {
      refetchOnFocus: true,
    }
  );

  useEffect(() => {
    if (search === '' && isChatSuccessQuery) {
      setAllUsers(
        chatDataQuery.map((chat) =>
          chat.users.find((user) => user._id !== loggedUserId)
        )
      );
    }

    if (search.length > 2) {
      searchUsers(search);

      if (isSuccess) {
        setAllUsers(data?.users);
      }
    }
  }, [search, isChatLoadingQuery]);

  const handleCreateChat = async (userId) => {
    const response = await createChat(userId);
    console.log(response);
  };

  return (
    <div className='flex h-full'>
      {/* Side Panel */}
      <div className='mr-4 hidden h-[40rem] flex-col space-y-6 overflow-x-hidden  border-r-2 border-r-sky-900/30 pr-4 md:flex'>
        <div className='mt-2'>
          <input
            type='text'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder='Search User'
            className='rounded-md bg-sky-900/20 px-2 py-2 outline-none'
          />
        </div>
        <div className='flex flex-col space-y-4 overflow-y-scroll text-lg'>
          {allUsers &&
            allUsers.map((user) => (
              <div
                key={user._id}
                onClick={() => handleCreateChat(user._id)}
                className='flex cursor-pointer items-center justify-start space-x-2 rounded-md bg-sky-900/10 py-3 pl-2 hover:bg-sky-900/30 '
              >
                <img
                  src={user.profileImage}
                  alt='profile'
                  className='h-8 w-8 rounded-full'
                />
                <p>{user.username}</p>
              </div>
            ))}
        </div>
      </div>

      {/* Chat Container */}
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
    </div>
  );
};
export default ChatSidePanel;
