import axios from 'axios';
import { url } from '../utils/config';

interface userProps {
  user: string;
  image: string;
  email: string;
}

const SidebarUser = ({ user, image, email }: userProps) => {
  async function getMessages(email: string) {
    const res = await axios.get(`${url}/message/getMessages?email=${email}`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    const messages = res.data;
    console.log(messages);
  }

  return (
    <div
      className="flex min-w-[10vw] h-full p-2 m-3 rounded-xl border border-black/10 hover:border-black/30 group hover:scale-105 duration-300 bg-purple-200"
      onClick={() => getMessages(email)}
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
