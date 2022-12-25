import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='flex h-screen flex-col bg-gradient-to-br from-[#040814] via-[#030a1a] to-[#050514] text-[#d8d8d8]'>
      <div className='flex-grow'>
        <Outlet />
      </div>
      <footer className='bg-sky-900/10 p-4'>
        <p className='text-center text-sm'>
          &copy; {new Date().getFullYear()} Chat App - Kunwar Aditya. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default Layout;
