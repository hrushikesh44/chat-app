import ChatBubble from '../components/ChatBubble';
import ChatContainer from '../components/ChatContainer';

const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages

  return (
    <div className="flex items-center justify-center">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="">
          {/* <div>
            {skeletonMessages.map((_, idx) => (
              <ChatBubble />
            ))}
          </div> */}
          <ChatContainer />
        </div>
      </div>
    </div>
  );
};

export default MessageSkeleton;
