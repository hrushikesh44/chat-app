import axios from 'axios';
import { url } from '../utils/config';
import { MessageCircleMoreIcon } from 'lucide-react';
import SidebarUserList from './SidebarUserList';
import { useState } from 'react';

const ChatContainer = () => {
  const [users, setUsers] = useState([]);

  async function getUsersDetails() {
    const res = await axios.get(`${url}/message/users`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    const user = res.data.users;
    console.log(user);
    setUsers(user);
  }

  return (
    <div className="h-[70vh] w-[70vw] mx-auto flex items-center justify-center bg-purple-200 rounded-xl">
      <div className="min-w-[75vw] md:min-w-[25vw] min-h-[70vh] p-5 border-r border-neutral-400 ">
        {/*show contacts*/}
        <div className="text-black/40 border-b border-neutral-400/80 pb-2">
          {/*top */}
          <div className="flex">
            <span>
              <MessageCircleMoreIcon className="size-10" />
            </span>
            <span className="text-3xl font-bold pt-1 ml-3">Contacts</span>
          </div>
          <input
            id="contacts"
            name="contacts"
            type="checkbox"
            className="border border-gray-500 rounded bg-gray-100 accent-purple-200 pr-5"
            onChange={getUsersDetails}
          />
          <span className="text-xl font-medium pl-3">Show Users</span>
        </div>
        <div>
          <SidebarUserList users={users} />
        </div>
      </div>
      <div className="min-w-[45vw] min-h-[70vh]  hidden md:block">{/*message show */}</div>
    </div>
  );
};

export default ChatContainer;
