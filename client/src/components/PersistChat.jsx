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
        console.log('verifyRefreshToken');
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

    // eslint-disable-next-line
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
      <div className='min-h-screen bg-zinc-900 text-fuchsia-500 flex items-center justify-center md:text-xl'>
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
    console.log('isSuccess');
    content = <Outlet />;
  } else if (token && isUninitialized) {
    console.log('isUninitialized');
    console.log(isUninitialized);
    content = <Outlet />;
  }

  return content;
};

export default PersistChat;
