import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className='h-screen flex flex-col  bg-[#060809] text-zinc-300'>
      <div className='flex-grow overflow-hidden'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
