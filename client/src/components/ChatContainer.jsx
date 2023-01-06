import { useEffect, useState } from 'react';
import {
  useCreateMessageMutation,
  useGetMessagesMutation,
} from '../app/slices/messagesApiSlice';
import useAuth from '../hooks/useAuth';

const ChatContainer = ({ currentChat, selectedUser }) => {
  const id = useAuth();

  const [textMessage, setTextMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const [createMessage] = useCreateMessageMutation();
  const [getMessages, { data, isLoading, error }] = useGetMessagesMutation();

  const handleCreateMessage = async (e) => {
    e.preventDefault();
    if (textMessage.length > 0) {
      await createMessage({
        message: textMessage,
        sender: id,
        chatId: currentChat.data._id,
      });
      setTextMessage('');
    }
  };

  useEffect(() => {
    getMessages(currentChat.data._id);
  }, [currentChat, getMessages]);

  useEffect(() => {
    if (isLoading) {
      console.log('fetching messages');
    }
    if (error) {
      console.log(error);
    }
    if (data) {
      console.log(data);
      setMessages(data);
    }
  }, [data, isLoading, error]);

  useEffect(() => {
    const chatContainer = document.querySelector('#chat-container');
    chatContainer.scrollTop = chatContainer.scrollHeight;
  }, [messages]);

  return (
    <div className='bg-indigo-900/20 h-full w-full rounded-md p-[0.1rem]'>
      <div className='h-full flex flex-col w-full  rounded-md '>
        <nav className='p-4   z-[100]  border-b-2 shadow-lg border-indigo-600'>
          <div className='flex  items-center space-x-4'>
            <img
              src={selectedUser.profilePic}
              alt='Profile Image'
              className='w-8 h-8 rounded-full'
            />
            <p>{selectedUser.username}</p>
          </div>
        </nav>

        <div
          id='chat-container'
          className='h-[31rem] overflow-y-scroll flex flex-col  p-2'
        >
          {/* Messages here */}
          {messages &&
            messages.length > 0 &&
            messages.map((message) => (
              <div
                key={message._id}
                className={`${
                  message.sender._id === id ? 'justify-end' : 'justify-start'
                } p-2  w-full  flex text-white my-2`}
              >
                <p className='bg-indigo-600 rounded-md p-2 '>
                  {message.message}
                </p>
              </div>
            ))}
        </div>

        <form onSubmit={handleCreateMessage} className=''>
          <input
            type='text'
            name='textMessage'
            id='textMessage'
            value={textMessage}
            onChange={(e) => setTextMessage(e.target.value)}
            placeholder='Type a message'
            className='w-full h-12 rounded-md bg-transparent p-4 border-2 border-indigo-900 focus:outline-none focus:border-indigo-600'
          />
        </form>
      </div>
    </div>
  );
};
export default ChatContainer;
