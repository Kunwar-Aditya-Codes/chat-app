import { useEffect, useRef, useState } from 'react';
import {
  useGetChatsMutation,
  useCreateChatMutation,
} from '../app/slices/chatApiSlice';
import useAuth from '../hooks/useAuth';
import { useSearchUserMutation } from '../app/slices/userApiSlice';
import ChatContainer from './ChatContainer';
import { io } from 'socket.io-client';

const ChatSpace = ({ showSidebar, setShowSidebar }) => {
  const id = useAuth();

  const [searchText, setSearchText] = useState('');
  const [userChatList, setUserChatList] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const socket = useRef();

  const [getChats, { data, isLoading, error }] = useGetChatsMutation();
  const [searchUser, { data: searchData }] = useSearchUserMutation();
  const [createChat] = useCreateChatMutation();

  useEffect(() => {
    socket.current = io('https://mern-chat-w5is.onrender.com');
    // socket.current = io('http://localhost:5000');

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.current.emit('add-user', id);
  }, [id]);

  // set search data
  useEffect(() => {
    searchData && setUserChatList(searchData);
  }, [searchData]);

  // get chats & search user
  useEffect(() => {
    if (!searchText || searchText.length === 0) {
      getChats(id);
    }

    if (searchText && searchText.length > 3) {
      searchUser(searchText);
    }
  }, [searchText, searchUser, getChats, id]);

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
  }, [isLoading, error, data, id]);

  // create chat
  const handleCreateChat = async () => {
    if (selectedUser) {
      const chat = await createChat({
        senderId: id,
        receiverId: selectedUser._id,
      });

      if (chat) {
        setCurrentChat(chat);
        setShowSidebar(false);
      }
    }
  };

  useEffect(() => {
    if (selectedUser) {
      handleCreateChat();
    }
  }, [selectedUser]);

  return (
    <div className='flex h-full relative'>
      {/* Sidebar */}

      <div
        className={`
        ${showSidebar ? 'translate-x-0' : '-translate-x-full'}
        md:flex-[0.2] bg-black rounded-md md:flex  p-[0.15rem] md:translate-x-0 transition ease-out duration-300  w-full flex-grow absolute md:relative z-[1000]`}
      >
        <div className='flex flex-col h-full   space-y-5 rounded-md p-4'>
          <input
            type='text'
            name='search'
            id='search'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder='Search User'
            className='bg-transparent outline-none border-2 border-indigo-600 p-2 rounded-md'
          />

          <hr className='border-t-2 border-t-indigo-600' />
          {/* User list */}
          <div className='flex flex-col space-y-4 overflow-y-scroll h-[30rem]   '>
            {userChatList.map((user) => (
              <div
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className='flex items-center space-x-4 cursor-pointer hover:bg-indigo-900/20 transition ease-in rounded-md p-2 mr-3'
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
      <div className='flex-grow md:ml-6 px-1 mb-3 md:mb-0 '>
        {currentChat && selectedUser && (
          <ChatContainer
            socket={socket.current}
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
