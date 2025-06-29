import axios from 'axios';
import { url } from '../utils/config';
import { useState } from 'react';

interface userProps {
  user: string;
  image: string;
}

const SidebarUser = ({ user, image }: userProps) => {
  const [email, setEmail] = useState('');
  async function getEmail() {
    const res = await axios.get(`${url}/auth/userDetails`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    const mail = res.data.email;
    console.log(res.data);
    setEmail(mail);
  }
  async function showMessages() {
    await getEmail();
    const res = await axios.get(`${url}/message/getMessages`, {
      params: { email },
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    const messages = res.data;
    console.log(messages);
  }

  return (
    <div
      className="flex min-w-[10vw] h-full p-2 m-3 rounded-xl border border-neutral-500 group hover:scale-105 duration-300 "
      onClick={showMessages}
    >
      <img
        src={image || '/avatar.png'}
        alt="user"
        className="size-10 rounded-full "
      />
      <span className="text-xl text-neutral-500 font-normal pl-2 pt-1 group-hover:text-neutral-800 group-hover:scale-105 duration-300">
        {user}
      </span>
    </div>
  );
};

export default SidebarUser;
