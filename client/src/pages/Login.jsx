import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='h-[70%] w-[45%] flex items-center justify-center bg-gradient-to-br from-indigo-600 to-sky-600 rounded-md'>
        <div className='h-[99.5%] w-[99.5%] bg-black/90 rounded-md'>
          <form className='flex flex-col mx-24 justify-evenly text-lg p-4 h-full'>
            <input
              type='email'
              name='email'
              placeholder='Email'
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md py-3 px-2'
            />

            <input
              type='password'
              name='password'
              placeholder='Password'
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md py-3 px-2'
            />

            <button
              type='submit'
              className='outline-none bg-indigo-600 rounded-md py-3 px-2 disabled:bg-gray-500 disabled:cursor-not-allowed'
            >
              Login
            </button>

            <p className='text-center '>
              Don't have an account?
              <Link
                to='/register'
                className='text-indigo-400 underline underline-offset-2 ml-2'
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
