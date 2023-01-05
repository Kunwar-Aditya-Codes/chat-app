import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentToken } from '../app/slices/authSlice';
import usePersist from '../hooks/usePersist';
import { useRefreshMutation } from '../app/slices/authApiSlice';
import { Link, Outlet } from 'react-router-dom';

const PersistChat = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isLoading, isSuccess, isError, isUninitialized, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true) {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (error) {
          console.log(error);
        }
      };

      if (!token && persist) {
        verifyRefreshToken();
      }
    }

    return () => (effectRan.current = true);
  }, []);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <div>Loading...</div>;
  } else if (isError) {
    console.log('isError');
    content = (
      <div className='min-h-screen flex items-center justify-center md:text-xl'>
        {error?.data?.message}
        <p>
          <Link to='/login'>
            <span className='underline mx-1'>Login</span>
          </Link>
          to continue
        </p>
      </div>
    );
  } else if (isSuccess && trueSuccess) {
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistChat;
