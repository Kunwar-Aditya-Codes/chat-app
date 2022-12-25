import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className=' h-screen bg-gradient-to-br from-[#040814] via-[#030a1a] to-[#050514] text-[#d8d8d8]'>
      <Outlet />
    </div>
  );
};

export default Layout;
