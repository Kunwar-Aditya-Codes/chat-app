import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className='h-full flex items-center justify-center'>
      <div className='h-[80%] w-[45%] flex items-center justify-center bg-gradient-to-br from-indigo-600 to-sky-600 rounded-md'>
        <div className='h-[99.5%] w-[99.5%] bg-black/90 rounded-md'>
          <form className='flex flex-col mx-24 justify-evenly text-lg p-4 h-full'>
            <input
              type='text'
              name='username'
              placeholder='Username'
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md py-3 px-2'
            />

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

            <input
              type='file'
              name='profilePic'
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md 
                cursor-pointer file:cursor-pointer file:bg-indigo-600  file:text-white   file:mr-2  file:rounded-md file:py-2 file:px-3 
              '
            />

            <button
              type='submit'
              className='outline-none bg-indigo-600 rounded-md py-3 px-2 disabled:bg-gray-500 disabled:cursor-not-allowed'
            >
              Register
            </button>

            <p className='text-center '>
              Already have an account?
              <Link
                to='/login'
                className='text-indigo-400 underline underline-offset-2 ml-2'
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Register;
