import { PowerIcon, UserCircleIcon } from '@heroicons/react/24/solid';

const UserInfoTab = () => {
  return (
    <div className='mb-3 flex items-center justify-between border-b-2 border-b-sky-900/30 pb-3'>
      <div className='flex items-center justify-center space-x-3 font-light tracking-wide'>
        <UserCircleIcon className='h-9 w-9' />
        <h1>Username</h1>
      </div>
      <div>
        <button className='rounded-md bg-sky-900/20 p-2 transition ease-in hover:bg-sky-900/90'>
          <PowerIcon className='h-4 w-4' />
        </button>
      </div>
    </div>
  );
};
export default UserInfoTab;
