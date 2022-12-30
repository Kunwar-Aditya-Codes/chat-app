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
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyToken = async () => {
        console.log('verifyToken');

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
    console.log('no persist');
    content = <Outlet />;
  } else if (isLoading) {
    console.log('isLoading');
    content = <div>Loading...</div>;
  } else if (isError) {
    console.log('isError');
    content = (
      <div>
        <div>{error.message}</div>
        <Link to='/login'>Login</Link>
      </div>
    );
  } else if (isSuccess && success) {
    console.log('isSuccess');
    content = <Outlet />;
  } else if (isUninitialized) {
    console.log('isUninitialized');
    content = <Outlet />;
  }

  return content;
};

export default PersistChat;
