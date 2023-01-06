const ChatContainer = ({ currentChat, selectedUser }) => {
  return (
    <div className='bg-indigo-900/20 h-full w-full rounded-md p-[0.1rem]'>
      <div className='h-full w-full  relative rounded-md'>
        <nav className='p-4 absolute top-0 w-full overflow-hidden border-b-2 shadow-lg border-indigo-600'>
          <div className='flex  items-center space-x-4'>
            <img
              src={selectedUser.profilePic}
              alt='Profile Image'
              className='w-8 h-8 rounded-full'
            />
            <p>{selectedUser.username}</p>
          </div>
        </nav>
      </div>
    </div>
  );
};
export default ChatContainer;
