import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../app/slices/authApiSlice';
import toast from 'react-hot-toast';
import { setCredentials } from '../app/slices/authSlice';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading('Logging in...', {
      id: 'login',
    });

    const res = await login(userInput);

    if (res.error) {
      if (res.error.status === 400) {
        toast.error(res.error.data.message, {
          id: 'login',
        });
      } else {
        toast.error('Something went wrong', {
          id: 'login',
        });
      }
      return;
    }

    dispatch(setCredentials({ accessToken: res.data.accessToken }));

    toast.success('Logged in successfully', {
      id: 'login',
    });

    navigate('/chat');

    setUserInput({
      email: '',
      password: '',
    });
  };

  return (
    <div className='h-full flex items-center justify-center'>
      <div className='h-[70%] w-[45%] flex items-center justify-center bg-gradient-to-br from-indigo-600 to-sky-600 rounded-md'>
        <div className='h-[99.5%] w-[99.5%] bg-black/90 rounded-md'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col mx-24 justify-evenly text-lg p-4 h-full'
          >
            <input
              type='email'
              name='email'
              value={userInput.email}
              onChange={handleChange}
              placeholder='Email'
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md py-3 px-2'
            />

            <input
              type='password'
              name='password'
              value={userInput.password}
              onChange={handleChange}
              placeholder='Password'
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md py-3 px-2'
            />

            <button
              type='submit'
              disabled={isLoading || !userInput.email || !userInput.password}
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
