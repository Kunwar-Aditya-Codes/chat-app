import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='flex h-full items-center justify-center'>
      <div className='flex h-[80%] w-[80%] flex-col items-center justify-evenly rounded-md border border-sky-900/20 bg-sky-900/5 p-4'>
        <h1 className='text-center text-4xl font-bold text-sky-300 lg:text-6xl'>
          Welcome to chat app!
        </h1>

        <div className='flex flex-col items-center space-y-10'>
          <Link to='/login'>
            <button className='rounded border border-sky-300 py-2 px-4 text-center font-bold transition ease-in-out hover:scale-105 hover:border-sky-500 hover:shadow-sm hover:shadow-sky-300 lg:text-xl '>
              Login
            </button>
          </Link>

          <Link to='/register'>
            <button className='rounded border border-sky-300 py-2 px-4 text-center font-bold transition ease-in-out hover:scale-105 hover:border-sky-500 hover:shadow-sm hover:shadow-sky-300 lg:text-xl'>
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Home;
