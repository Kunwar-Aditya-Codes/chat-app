import { useEffect } from 'react';
import useAuth from '../hooks/useAuth';

const ChatUser = ({ chat }) => {
  const id = useAuth();

  console.log("This is the logged in user's id: ", id);

  useEffect(() => {
    const user = chat.users.find((user) => user !== id);

  }, [chat, id]);

  return <div>ChatUser</div>;
};
export default ChatUser;
