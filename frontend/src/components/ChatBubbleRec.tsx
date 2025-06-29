interface chatBubbleProps {
  profilePic: string;
  name: string;
  time: string;
  message: string;
}

const ChatBubbleRec = ({ profilePic, name, time, message }: chatBubbleProps) => {
  return (
    <div className="flex items-start gap-2.5 p-3 mr-auto">
      <img
        className="w-8 h-8 rounded-full"
        src={profilePic || '/avatar.png'}
        alt="Jese image"
      />
      <div className="flex flex-col w-full max-w-[320px] leading-1.5 p-1 border-gray-200 rounded-e-xl rounded-es-xl bg-purple-900/30 h-fit">
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <span className="text-sm font-semibold text-gray-900 dark:text-white">{name}</span>
          <span className="text-sm font-normal text-gray-500 dark:text-gray-400">{time}</span>
        </div>
        <p className="text-sm font-normal py-2.5 text-black/50 dark:text-white">{'message'}</p>
      </div>
    </div>
  );
};

export default ChatBubbleRec;
