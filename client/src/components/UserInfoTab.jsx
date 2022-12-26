import { PowerIcon } from '@heroicons/react/24/solid';

const UserInfoTab = () => {
  return (
    <div className='flex items-center justify-between border-b-2 border-b-sky-900/30 pb-3'>
      <div className='space-y-2 font-light tracking-wide'>
        <h1>Username</h1>
        <p>Email</p>
      </div>
      <div>
        <button className='rounded-md bg-sky-900/20 p-2 transition ease-in hover:bg-sky-900/90'>
          <PowerIcon className='h-5 w-5' />
        </button>
      </div>
    </div>
  );
};
export default UserInfoTab;
