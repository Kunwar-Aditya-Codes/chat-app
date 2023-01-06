import { useEffect, useState } from 'react';
import {
  useGetChatsMutation,
  useCreateChatMutation,
} from '../app/slices/chatApiSlice';
import useAuth from '../hooks/useAuth';
import { useSearchUserMutation } from '../app/slices/userApiSlice';
import ChatContainer from './ChatContainer';

const ChatSpace = () => {
  const id = useAuth();

  const [searchText, setSearchText] = useState('');
  const [userChatList, setUserChatList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

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
      console.log('fetching');
    }
    if (error) {
      console.log(error);
    }
    if (data) {
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
  const handleCreateChat = async () => {
    if (selectedUser) {
      const chat = await createChat({
        senderId: id,
        receiverId: selectedUser._id,
      });

      if (chat) {
        setCurrentChat(chat);
      }
    }
  };

  useEffect(() => {
    if (selectedUser) {
      handleCreateChat();
    }
  }, [selectedUser]);

  return (
    <div className='flex h-full  '>
      <div className='flex-[0.2] bg-indigo-900/20 rounded-md  p-[0.15rem]'>
        <div className='flex flex-col h-full   space-y-7 rounded-md p-4'>
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
                onClick={() => setSelectedUser(user)}
                className='flex items-center space-x-4 cursor-pointer hover:bg-indigo-900/20 transition ease-in rounded-md p-2'
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
      <div className='flex-grow ml-6'>
        {currentChat && selectedUser && (
          <ChatContainer
            currentChat={currentChat}
            selectedUser={selectedUser}
          />
        )}

        {!currentChat && !selectedUser && (
          <div className='flex items-center justify-center h-full'>
            <p className='text-2xl text-indigo-600'>Select a user to chat</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default ChatSpace;
