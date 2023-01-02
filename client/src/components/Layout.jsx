import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='h-screen bg-[#060809] text-zinc-300'>
      <Outlet />
    </div>
  );
};

export default Layout;
