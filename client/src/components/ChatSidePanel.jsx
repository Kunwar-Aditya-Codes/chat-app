const ChatSidePanel = () => {
  return (
    <div className='mr-4  flex h-[40rem]  flex-col space-y-6 border-r-2 border-r-sky-900/30 pr-4'>
      <div className='mt-2'>
        <input
          type='text'
          placeholder='Search User'
          className='rounded-md bg-sky-900/20 px-2 py-2 outline-none'
        />
      </div>
      <div className='flex flex-col space-y-4 overflow-y-scroll text-lg'>
        <p className='cursor-pointer rounded-md bg-sky-900/10 px-4 py-3 hover:bg-sky-900/30 '>
          User 1
        </p>
        <p className='cursor-pointer rounded-md bg-sky-900/10 px-4 py-3 hover:bg-sky-900/30'>
          User 2
        </p>
        <p className='cursor-pointer rounded-md bg-sky-900/10 px-4 py-3 hover:bg-sky-900/30'>
          User 3
        </p>
        <p className='cursor-pointer rounded-md bg-sky-900/10 px-4 py-3 hover:bg-sky-900/30'>
          User 4
        </p>
        <p className='cursor-pointer rounded-md bg-sky-900/10 px-4 py-3 hover:bg-sky-900/30'>
          User 5
        </p>
        <p className='cursor-pointer rounded-md bg-sky-900/10 px-4 py-3 hover:bg-sky-900/30'>
          User 6
        </p>
      </div>
    </div>
  );
};
export default ChatSidePanel;
