import ChatSidePanel from '../components/ChatSidePanel';
import UserInfoTab from '../components/UserInfoTab';

const Chat = () => {
  return (
    <div className='mx-auto h-[45rem] max-w-[90rem] p-4'>
      <UserInfoTab />
      <ChatSidePanel />
    </div>
  );
};
export default Chat;
