import { Outlet } from 'react-router-dom';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className='h-screen flex flex-col bg-[#060809] text-zinc-300'>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
