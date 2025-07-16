interface chatBubbleProps {
  profilePic?: string;
  name?: string;
  time?: string;
  message: string;
}

const ChatBubbleRec = ({ profilePic, name, time, message }: chatBubbleProps) => {
  return (
    <div className="chat chat-start">
      <div className="chat-image avatar p-1.5">
        <div className="size-6 md:size-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={profilePic || '/avatar.png'}
          />
        </div>
      </div>
      <div className="chat-header text-neutral-500">
        {name}
        <time className="text-xs opacity-50">{time}</time>
      </div>
      <div className="chat-bubble bg-[#fefefe] text-neutral-500 shadow-md text-sm md:text-lg">{message}</div>
      <div className="chat-footer opacity-50">{/*Delivered*/}</div>
    </div>
  );
};

export default ChatBubbleRec;
