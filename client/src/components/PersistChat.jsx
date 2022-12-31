import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, Outlet } from 'react-router-dom';
import { useRefreshMutation } from '../app/slices/authApiSlice';
import { selectToken } from '../app/slices/authSlice';
import usePersist from '../hooks/usePersist';

const PersistChat = () => {
  const [persist] = usePersist();
  const token = useSelector(selectToken);
  const effectRan = useRef(false);
  const [success, setSuccess] = useState(false);

  const [refresh, { isLoading, isSuccess, isError, isUninitialized, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      const verifyToken = async () => {
        try {
          await refresh();
          setSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };

      if (!token && persist) {
        verifyToken();
      }
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    content = (
      <div className='flex h-screen flex-col items-center justify-center space-y-4'>
        <div className='text-4xl'>
          {error.data?.message || 'Something went wrong.'}
        </div>
        <Link to='/login' className='text-xl underline underline-offset-4'>
          Login
        </Link>
      </div>
    );
  } else if (isSuccess && success) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    content = <Outlet />;
  }

  return content;
};

export default PersistChat;
