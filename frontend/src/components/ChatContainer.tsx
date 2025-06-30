import axios from 'axios';
import { url } from '../utils/config';
import { MessageCircleMoreIcon, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import ChatBubbleRec from './ChatBubbleRec';
import ChatBubbleSend from './ChatBubbleSend';
import socket from '../lib/socket';

type User = {
  fullName: string;
  profilePic: string;
  _id: string;
};

type Message = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
};

const ChatContainer = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [profilePic, setProfilePic] = useState('');
  const [fullName, setFullName] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState('');
  const messageRef = useRef<HTMLInputElement>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [selectedUser, setSelectedUser] = useState('');
  const [currentUserId, setCurrentUserId] = useState('');
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const selectedUserRef = useRef<string>('');

  // Scroll to bottom on new message
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    selectedUserRef.current = selectedUser;
  }, [selectedUser]);

  // Socket.io setup
  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;
    socket.auth = { userId };
    socket.connect();

    socket.on('newMessage', (newMessage: Message) => {
      const activeChatUser = selectedUserRef.current;
      if (newMessage.senderId === activeChatUser || newMessage.receiverId === activeChatUser) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    socket.on('getOnlineUsers', (onlineIds: string[]) => {
      setOnlineUsers(onlineIds);
    });

    return () => {
      socket.off('newMessage');
      socket.off('getOnlineUsers');
      socket.disconnect();
    };
  }, []); // ✅ only run once on mount

  // Get users and current user info
  async function getUsersDetails() {
    try {
      const res = await axios.get(`${url}/message/users`, {
        headers: { token: localStorage.getItem('token') },
      });

      const localRes = await axios.get(`${url}/auth/checkAuth`, {
        headers: { token: localStorage.getItem('token') },
      });

      const userId = localRes.data.userId;
      localStorage.setItem('userId', userId);
      setCurrentUserId(userId);

      setUsers(res.data.users);
      setFullName(localRes.data.fullName);
      setProfilePic(localRes.data.profilePic);
    } catch (err) {
      console.error('Error fetching user details', err);
    }
  }

  // Get chat messages with selected user
  async function getMessages(userId: string) {
    try {
      const res = await axios.get(`${url}/message/getMessages?userId=${userId}`, {
        headers: { token: localStorage.getItem('token') },
      });

      setSelectedUser(userId);
      setMessages(res.data.messages);
      console.log(selectedUser);
      console.log(currentUserId);
    } catch (err) {
      console.error('Error fetching messages', err);
    }
  }

  // Send message
  async function sendMessage(receiverId: string) {
    const text = messageRef.current?.value;
    if (!text?.trim()) return;

    try {
      const res = await axios.post(
        `${url}/message/send?userId=${receiverId}`,
        { text },
        { headers: { token: localStorage.getItem('token') } }
      );

      const newMessage = res.data.newMessage;
      setMessages((prev) => [...prev, newMessage]);
      setMessage('');
    } catch (err) {
      console.error('Error sending message', err);
    }
  }

  const isUserOnline = (userId: string) => onlineUsers.includes(userId);

  return (
    <div className="h-[70vh] w-[70vw] mx-auto flex items-center justify-center bg-purple-200 rounded-xl mt-10 shadow-md shadow-neutral-400">
      <div className="min-w-[75vw] md:min-w-[25vw] min-h-[70vh] p-5 border-r border-neutral-400">
        {/* Contacts Panel */}
        <div className="text-black/40 border-b border-neutral-400/80 pb-2">
          <div className="flex pb-2">
            <MessageCircleMoreIcon className="size-10" />
            <span className="text-3xl font-bold pt-1 ml-3">Contacts</span>
          </div>
          <input
            type="radio"
            className="border border-gray-500 rounded-full bg-gray-100/10 accent-purple-200 pr-5 ml-3"
            onChange={getUsersDetails}
          />
          <span className="text-xl font-medium pl-3">Show Users</span>
        </div>

        <div className="min-w-[13vw] min-h-[55vh] border border-black/10 rounded-xl mt-3 bg-purple-500/10">
          {users.map((user) => (
            <div
              key={user._id}
              className="flex justify-between items-center p-2 m-3 rounded-xl border border-black/10 hover:border-black/30 group hover:scale-105 duration-300 bg-purple-200 cursor-pointer"
              onClick={() => getMessages(user._id)}
            >
              <div className="flex items-center">
                <img
                  src={user.profilePic || '/avatar.png'}
                  alt="user"
                  className="size-10 rounded-full"
                />
                <span className="text-xl text-neutral-500 font-normal pl-2 pt-1 group-hover:text-neutral-800 group-hover:scale-105 duration-300">
                  {user.fullName}
                </span>
              </div>
              {isUserOnline(user._id) && (
                <div
                  className="w-3 h-3 bg-green-500 rounded-full animate-pulse"
                  title="Online"
                ></div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="min-w-[45vw] min-h-[70vh] hidden md:block">
        {/* Chat Window */}
        <div className="bg-purple-500/10 min-h-[65vh] min-w-[35vw] max-w-[40vw] m-5 mx-auto rounded-xl border border-black/10">
          <div className="min-w-[35vw] max-w-[38vw] min-h-[55vh] max-h-[55vh] flex flex-col overflow-y-auto bg-purple-100 m-3 mx-auto rounded-xl custom-scrollbar">
            {messages.map((msg) =>
              msg.senderId === currentUserId ? (
                <ChatBubbleSend
                  key={msg._id}
                  message={msg.text}
                  name={fullName}
                  profilePic={profilePic}
                />
              ) : (
                <ChatBubbleRec
                  key={msg._id}
                  message={msg.text}
                  name={users.find((u) => u._id === selectedUser)?.fullName || 'User'}
                  profilePic={
                    users.find((u) => u._id === selectedUser)?.profilePic || '/avatar.png'
                  }
                />
              )
            )}

            <div ref={messageEndRef} />
          </div>

          <div className="flex">
            <input
              type="text"
              className="pl-5 text-xl rounded-full md:min-w-[20vw] lg:min-w-[32vw] h-14 bg-purple-200 ml-5 border border-black/10
              text-black/40 focus:outline-none focus:ring-0"
              placeholder="Type here..."
              ref={messageRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') sendMessage(selectedUser);
              }}
            />
            <button
              className="ml-2 xl:ml-3 p-4 xl:p-3 h-fit min-w-[2vw] md:min-w-[5vw] bg-purple-600/10 rounded-full border border-black/10 text-xl flex items-center
            font-bold text-black/40 cursor-pointer hover:scale-105 hover:text-black/60 hover:border-black/30 duration-200 group"
              onClick={() => sendMessage(selectedUser)}
            >
              <span className="hidden xl:block">Send</span>
              <Send className="size-7 lg:size-5 group-hover:translate-x-0.5 transition-transform ease-in-out duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
