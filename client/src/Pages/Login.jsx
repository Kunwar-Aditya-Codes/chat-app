import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  //TODO! - Complete the handleSubmit function
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
  };

  return (
    <div className='flex h-full items-center justify-center '>
      <form
        onSubmit={handleSubmit}
        className='flex  h-[65%] w-[80%] max-w-[28rem] flex-col justify-evenly rounded-md border border-sky-900/20 bg-sky-900/5 p-4 lg:justify-around'
      >
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={userData.email}
          onChange={handleInput}
          autoFocus
          required
          autoComplete='off'
          className='border-b-2 border-sky-900/40 bg-transparent pb-2 pl-2 outline-none focus:border-sky-700 md:text-lg '
        />
        <input
          type='password'
          placeholder='Password'
          name='password'
          value={userData.password}
          onChange={handleInput}
          required
          autoComplete='off'
          className='border-b-2 border-sky-900/40 bg-transparent pb-2 pl-2 outline-none focus:border-sky-700 md:text-lg '
        />
        <button
          type='submit'
          disabled={!userData.email || !userData.password}
          className='rounded-full bg-sky-900/10 py-2 px-4 text-center text-lg tracking-wide text-sky-500  disabled:cursor-not-allowed disabled:border-sky-900/30 disabled:bg-sky-900/5 disabled:text-sky-900/40 '
        >
          Login
        </button>
        <div className='flex items-center justify-around'>
          <Link to='/register'>
            <button className=' border-b px-1 text-center tracking-wide  lg:text-lg'>
              Register
            </button>
          </Link>

          <Link to='/'>
            <button className=' border-b px-1 text-center tracking-wide  lg:text-lg'>
              Home
            </button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
