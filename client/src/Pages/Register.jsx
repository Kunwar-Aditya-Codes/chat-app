import { useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Register = () => {
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    profileImage: '',
  });
  const [loading, setLoading] = useState(false);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleImage = async (file) => {
    setLoading(true);

    if (file === undefined) {
      toast.error('Please select a valid image file');
      setLoading(false);
      return;
    }

    if (file.type === 'image/jpeg' || file.type === 'image/png') {
      const data = new FormData();
      data.append('file', file);
      data.append('upload_preset', 'chat-app');
      data.append('cloud_name', 'aditya-kunwar');

      const res = await fetch(
        'https://api.cloudinary.com/v1_1/aditya-kunwar/image/upload',
        {
          method: 'POST',
          body: data,
        }
      );

      const resData = await res.json();
      console.log(resData);
      setUserData({ ...userData, profileImage: resData.url.toString() });
      toast.success('Image uploaded successfully');
      setLoading(false);
    } else {
      toast.error('Please select a valid image file');
      setLoading(false);
    }
  };

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
          type='text'
          placeholder='Username'
          autoFocus
          name='username'
          value={userData.username}
          onChange={handleInput}
          required
          autoComplete='off'
          className='border-b-2 border-sky-900/40 bg-transparent pb-2 pl-2 outline-none focus:border-sky-700 md:text-lg  '
        />
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={userData.email}
          onChange={handleInput}
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
        <input
          type='file'
          id='profileImage'
          name='profileImage'
          accept='image/png, image/jpeg'
          onChange={(e) => handleImage(e.target.files[0])}
          required
          className='cursor-pointer border-b-2  border-sky-900/40 bg-transparent pb-2 pl-2 outline-none file:mr-4 file:cursor-pointer file:rounded-full file:border-none file:bg-sky-900/10 file:px-4 file:py-1 file:text-sky-500 focus:border-sky-700 md:text-lg '
        />

        <button
          type='submit'
          isLoading={loading}
          disabled={
            !userData.username ||
            !userData.email ||
            !userData.password ||
            !userData.profileImage
          }
          className='rounded-full bg-sky-900/10 py-2 px-4 text-center text-lg tracking-wide text-sky-500  disabled:cursor-not-allowed disabled:border-sky-900/30 disabled:bg-sky-900/5 disabled:text-sky-900/40 '
        >
          Register
        </button>

        <div className='flex items-center justify-around'>
          <Link to='/login'>
            <button className=' border-b px-1 text-center tracking-wide  lg:text-lg'>
              Login
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
export default Register;
