import ChatSidePanel from '../components/ChatSidePanel';
import UserInfoTab from '../components/UserInfoTab';

const Chat = () => {
  return (
    <div className='mx-auto h-[45rem] max-w-[90rem]   p-4'>
      <UserInfoTab />
      <div className='flex h-full '>
        <ChatSidePanel />
      </div>
    </div>
  );
};
export default Chat;
