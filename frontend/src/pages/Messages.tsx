import ChatContainer from '../components/ChatContainer';

const Messages = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="">
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default Messages;
