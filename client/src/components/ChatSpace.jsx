import { useEffect, useState } from 'react';
import {
  useGetChatsMutation,
  useCreateChatMutation,
} from '../app/slices/chatApiSlice';
import useAuth from '../hooks/useAuth';
import toast from 'react-hot-toast';
import { useSearchUserMutation } from '../app/slices/userApiSlice';
import ChatContainer from './ChatContainer';

const ChatSpace = () => {
  const id = useAuth();

  const [searchText, setSearchText] = useState('');
  const [userChatList, setUserChatList] = useState([]);
  

  const [getChats, { data, isLoading, error }] = useGetChatsMutation();
  const [searchUser, { data: searchData }] = useSearchUserMutation();
  const [createChat] = useCreateChatMutation();

  // set search data
  useEffect(() => {
    if (searchData) {
      setUserChatList(searchData);
    }
  }, [searchData]);

  // get chats
  useEffect(() => {
    if (!searchText || searchText.length === 0) {
      getChats(id);
    }
  }, [searchText, getChats, id]);

  // set user chat list
  useEffect(() => {
    if (isLoading) {
      toast.loading('Loading...', { id: 'fetch' });
    }
    if (error) {
      toast.error(error.data.message, { id: 'fetch' });
    }
    if (data) {
      toast.dismiss('fetch');
      const chats = data.map((chat) =>
        chat.users.find((user) => user._id !== id)
      );
      setUserChatList(chats);
    }
  }, [data, isLoading, error]);

  // search user
  useEffect(() => {
    if (searchText && searchText.length > 3) {
      searchUser(searchText);
    }
  }, [searchText, searchUser]);

  // create chat
  const handleCreateChat = async (selectedUser) => {
    if (selectedUser) {
      const chat = await createChat({
        senderId: id,
        receiverId: selectedUser._id,
      });

      console.log(chat);
    }
  };

  return (
    <div className='flex h-full  '>
      <div className='flex-[0.2] bg-gradient-to-br rounded-md from-indigo-600 to-sky-600 p-[0.15rem]'>
        <div className='flex flex-col h-full bg-black/90  space-y-7 rounded-md p-4'>
          <input
            type='text'
            name='search'
            id='search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Search User'
            className='bg-transparent outline-none border-2 border-indigo-600 p-2 rounded-md'
          />

          {/* User list */}
          <div className='flex pt-5 flex-col space-y-4 overflow-y-scroll h-[30rem] border-t  border-t-indigo-600  '>
            {userChatList.map((user) => (
              <div
                key={user._id}
                onClick={() => handleCreateChat(user)}
                className='flex items-center space-x-4 cursor-pointer hover:bg-indigo-900 transition ease-in rounded-md p-2'
              >
                <img
                  src={user.profilePic}
                  alt='Profile Image'
                  className='w-8 h-8 rounded-full'
                />
                <p>{user.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div>
        <ChatContainer />
      </div>
    </div>
  );
};
export default ChatSpace;
