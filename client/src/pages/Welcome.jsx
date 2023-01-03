import { Link } from 'react-router-dom';

const Welcome = () => {
  return (
    <div className='h-full flex items-center justify-center '>
      <div className=' h-[80%] w-[80%] bg-gradient-to-tr shadow-lg from-indigo-600  to-sky-600 rounded-md flex items-center justify-center'>
        <div className='bg-black/90 h-[99.5%] w-[99.5%] rounded-md flex'>
          <div className='flex-[0.5] p-4 text-lg flex flex-col items-center justify-center space-y-16'>
            <h1 className='text-indigo-600 font-bold text-8xl'>Mern Chat</h1>
            <p className='text-justify  font-light px-9'>
              Mern Chat is a real time chat application built with React, Node,
              and MongoDB. It is a full stack application that allows users to
              create an account, login, and chat with other users in real time.
            </p>
          </div>
          <div className='flex-[0.5] flex flex-col items-center justify-center space-y-16'>
            <Link to='/login'>
              <button className='bg-indigo-600 hover:bg-indigo-700 text-white text-2xl py-4 px-8 rounded'>
                Login
              </button>
            </Link>

            <Link to='/register'>
              <button className='bg-indigo-600 hover:bg-indigo-700 text-white text-2xl py-4 px-8 rounded'>
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Welcome;
