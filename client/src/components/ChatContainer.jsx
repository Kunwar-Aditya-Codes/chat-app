import { useState } from 'react';
import { useCreateChatMutation } from '../app/slices/chatApiSlice';

const ChatContainer = ({ currentChat, selectedUser }) => {
  const [textMessage, setTextMessage] = useState('');
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

        <div className='h-[31rem] overflow-y-scroll p-2'>
          {/* Messages here */}
        </div>

        <form className=''>
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
