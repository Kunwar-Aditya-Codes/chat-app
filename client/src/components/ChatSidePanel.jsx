import { useEffect, useState } from 'react';
import { useSearchUsersMutation } from '../app/slices/userSearchApiSlice';

const ChatSidePanel = () => {
  const [search, setSearch] = useState('');
  const [allUsers, setAllUsers] = useState([]);

  const [searchUsers, { data, isLoading, isError, isSuccess }] =
    useSearchUsersMutation();

  useEffect(() => {
    if (search.length > 2) {
      searchUsers(search);

      if (isSuccess) {
        setAllUsers(data?.users);
      }
    } else {
      setAllUsers([]);
    }
  }, [search]);

  return (
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
  );
};
export default ChatSidePanel;
