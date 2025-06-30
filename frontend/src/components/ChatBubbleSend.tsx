interface chatBubbleProps {
  profilePic?: string;
  name?: string;
  time?: string;
  message: string;
}

const ChatBubbleSend = ({ profilePic, time, message }: chatBubbleProps) => {
  return (
    <div className="chat chat-end pr-1.5">
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={profilePic || '/avatar.png'}
          />
        </div>
      </div>
      <div className="chat-header text-neutral-500">
        You
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className="chat-bubble bg-purple-900/30  shadow-md text-neutral-500">{message}</div>
      <div className="chat-footer opacity-50">{time}</div>
    </div>
  );
};

export default ChatBubbleSend;
