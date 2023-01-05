const Footer = () => {
  return (
    <div className='bg-gradient-to-br from-indigo-600 to-sky-600 pt-[0.1rem]'>
      <div className='bg-black/90 p-3 text-center '>
        <p>&copy; {new Date().getFullYear()} Mern Chat - Kunwar Aditya.</p>
        <p>All rights reserved.</p>
      </div>
    </div>
  );
};
export default Footer;
