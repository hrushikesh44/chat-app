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
        <div className="size-8 md:size-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={profilePic || '/avatar.png'}
            className="size-6 md:size-10"
          />
        </div>
      </div>
      <div className="chat-header text-neutral-500">
        You
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className="chat-bubble bg-[#777070] text-sm md:text-lg  shadow-md text-neutral-100">{message}</div>
      <div className="chat-footer opacity-50">{time}</div>
    </div>
  );
};

export default ChatBubbleSend;
