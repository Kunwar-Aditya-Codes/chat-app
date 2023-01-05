const ChatSpace = () => {
  return (
    <div className='flex h-full  '>
      <div className='flex-[0.2] bg-gradient-to-br rounded-md from-indigo-600 to-sky-600 p-[0.15rem]'>
        <div className='flex flex-col h-full bg-black/90  space-y-7 rounded-md p-4'>
          <input
            type='text'
            name='search'
            id='search'
            placeholder='Search User'
            className='bg-transparent outline-none border-2 border-indigo-600 p-2 rounded-md'
          />

          {/* User list */}
          <div className='flex pt-5 flex-col space-y-4 overflow-y-scroll h-[30rem] border-t  border-t-indigo-600  '>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
            <div className='flex items-center space-x-4 hover:bg-indigo-600/10 p-2 cursor-pointer rounded-md'>
              <p className=''>Username</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat container */}
      <div></div>
    </div>
  );
};
export default ChatSpace;
