const Footer = () => {
  return (
    <div className='bg-indigo-900/20 border-t-2 border-t-indigo-600 pt-[0.1rem]'>
      <div
        className=' text-sm py-4 space-x-2 flex items-center justify-center
       text-center '
      >
        <p>&copy; {new Date().getFullYear()} Mern Chat - Kunwar Aditya.</p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};
export default Footer;
