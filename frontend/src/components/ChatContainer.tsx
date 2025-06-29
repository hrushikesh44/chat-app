import axios from 'axios';
import { url } from '../utils/config';
import { MessageCircleMoreIcon, Send } from 'lucide-react';
import { useRef, useState } from 'react';
import ChatBubbleRec from './ChatBubbleRec';
import ChatBubbleSend from './ChatBubbleSend';

type User = {
  fullName: string;
  profilePic: string;
  email: string;
};

const ChatContainer = () => {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [profilePic, setProfilePic] = useState('');
  const [messages, setMessages] = useState();
  const messageRef = useRef<HTMLInputElement>(null);
  const [selectedUser, setSelectedUser] = useState('');

  async function getUsersDetails() {
    const res = await axios.get(`${url}/message/users`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    const user = res.data.users;
    setUsers(user);
    setEmail(user.email);
    setProfilePic(user.profilePic);
  }

  async function getMessages(email: string) {
    const res = await axios.get(`${url}/message/getMessages?email=${email}`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    const messages = res.data;
    console.log(messages);
    setSelectedUser(res.data.receiver);
    console.log(selectedUser);
  }

  async function sendMessage(email: string) {
    const text = messageRef.current?.value;
    console.log(text);
    const data = {
      text: text,
    };
    console.log(localStorage.getItem('token'));
    const res = await axios.post(`${url}/message/send?email=${email}`, data, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    const response = res.data;
    console.log(response);
  }

  return (
    <div className="h-[70vh] w-[70vw] mx-auto flex items-center justify-center bg-purple-200 rounded-xl mt-10 shadow-md shadow-neutral-400">
      <div className="min-w-[75vw] md:min-w-[25vw] min-h-[70vh] p-5 border-r border-neutral-400 ">
        {/*show contacts*/}
        <div className="text-black/40 border-b border-neutral-400/80 pb-2">
          {/*top */}
          <div className="flex pb-2">
            <span>
              <MessageCircleMoreIcon className="size-10" />
            </span>
            <span className="text-3xl font-bold pt-1 ml-3">Contacts</span>
          </div>
          <input
            id="contacts"
            name="contacts"
            type="radio"
            className="border border-gray-500 rounded-full bg-gray-100/10 accent-purple-200 pr-5 ml-3"
            onChange={getUsersDetails}
          />
          <span className="text-xl font-medium pl-3">Show Users</span>
        </div>
        <div>
          {/*sidebar user list*/}
          <div className="min-w-[13vw] min-h-[55vh] border border-black/10 rounded-xl mt-3 bg-purple-500/10">
            {(users as User[]).map((user, index) => (
              <div
                key={index}
                className="flex min-w-[10vw] h-full p-2 m-3 rounded-xl border border-black/10 hover:border-black/30 group hover:scale-105 duration-300 bg-purple-200"
                onClick={() => getMessages(user.email)}
              >
                <img
                  src={user.profilePic || '/avatar.png'}
                  alt="user"
                  className="size-10 rounded-full "
                />
                <span className="text-xl text-neutral-500 font-normal pl-2 pt-1 group-hover:text-neutral-800 group-hover:scale-105 duration-300">
                  {user.fullName}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="min-w-[45vw] min-h-[70vh]  hidden md:block">
        {/*message show */}
        <div className="bg-purple-500/10 min-h-[65vh] min-w-[35vw] max-w-[40vw] m-5 mx-auto rounded-xl border border-black/10">
          <div className="min-w-[35vw] max-w-[38vw] min-h-[55vh] max-h-[55vh] flex flex-col overflow-scroll bg-purple-100 m-3 mx-auto rounded-xl custom-scrollbar">
            <ChatBubbleRec profilePic={profilePic} />
            <ChatBubbleSend />
            <ChatBubbleRec />
            <ChatBubbleSend />
            <ChatBubbleRec />
            <ChatBubbleSend />
            <ChatBubbleRec />
            <ChatBubbleRec />
          </div>
          <div className="flex">
            <input
              type="text"
              className="pl-5 text-xl rounded-full md:min-w-[20vw] lg:min-w-[32vw] h-14 bg-purple-200 ml-5 border border-black/10
              text-black/40 focus:outline-none focus:ring-0"
              placeholder="Type here..."
              ref={messageRef}
            />
            <button
              className=" ml-2 xl:ml-3 p-4 xl:p-3 h-fit min-w-[2vw] md:min-w-[5vw] bg-purple-600/10 rounded-full border border-black/10 text-xl flex items-center
            font-bold text-black/40 cursor-pointer hover:scale-105 hover:text-black/60 hover:border-black/30 duration-200 group"
              onClick={() => sendMessage(selectedUser)}
            >
              <span className="hidden xl:block">Send{}</span>
              <Send className="size-7 lg:size-5 group-hover:translate-x-0.5 transition-transform ease-in-out duration-300" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
