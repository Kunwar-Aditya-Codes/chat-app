import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterMutation } from '../app/slices/authApiSlice';
import toast from 'react-hot-toast';

const Register = () => {
  const [userInput, setUserInput] = useState({
    username: '',
    email: '',
    password: '',
    profilePic: '',
  });

  const navigate = useNavigate();

  const [register, { isLoading }] = useRegisterMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleProfilePic = async (file) => {
    toast.loading('Uploading profile pic...', {
      id: 'profilePic',
    });

    const reader = new FormData();
    reader.append('file', file);
    reader.append('upload_preset', 'chat-app');
    reader.append('cloud_name', 'aditya-kunwar');
    reader.append('folder', 'profileImage');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/aditya-kunwar/image/upload',
      {
        method: 'POST',
        body: reader,
      }
    );

    const data = await res.json();

    setUserInput({ ...userInput, profilePic: data?.url });

    toast.dismiss('profilePic');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    toast.loading('Registering...', {
      id: 'register',
    });

    const res = await register(userInput);

    if (res.error) {
      console.log(res.error);
      if (res.error.status === 400) {
        toast.error(res.error.data.message, {
          id: 'register',
        });
      } else {
        toast.error('Something went wrong', {
          id: 'register',
        });
      }
      return;
    }

    toast.success('Registered successfully', {
      id: 'register',
    });

    navigate('/login');

    setUserInput({
      username: '',
      email: '',
      password: '',
      profilePic: '',
    });

    toast.dismiss('register');
  };

  return (
    <div className='h-full flex items-center justify-center'>
      <div className='h-[80%] w-[45%] flex items-center justify-center bg-gradient-to-br from-indigo-600 to-sky-600 rounded-md'>
        <div className='h-[99.5%] w-[99.5%] bg-black/90 rounded-md'>
          <form
            onSubmit={handleSubmit}
            className='flex flex-col mx-24 justify-evenly text-lg p-4 h-full'
          >
            <input
              type='text'
              name='username'
              placeholder='Username'
              value={userInput.username}
              onChange={handleChange}
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md py-3 px-2'
            />

            <input
              type='email'
              name='email'
              placeholder='Email'
              value={userInput.email}
              onChange={handleChange}
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md py-3 px-2'
            />

            <input
              type='password'
              name='password'
              placeholder='Password'
              value={userInput.password}
              onChange={handleChange}
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md py-3 px-2'
            />

            <input
              type='file'
              name='profilePic'
              onChange={(e) => handleProfilePic(e.target.files[0])}
              className='outline-none bg-transparent border-2 border-indigo-600 rounded-md 
                cursor-pointer file:cursor-pointer file:bg-indigo-600  file:text-white   file:mr-2  file:rounded-md file:py-2 file:px-3 
              '
            />

            <button
              type='submit'
              disabled={
                isLoading ||
                !userInput.profilePic ||
                !userInput.username ||
                !userInput.email ||
                !userInput.password
              }
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
