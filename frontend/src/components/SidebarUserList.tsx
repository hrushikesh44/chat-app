import axios from 'axios';
import { url } from '../utils/config';

type User = {
  fullName: string;
  profilePic: string;
  email: string;
};

interface SidebarUserListProps {
  users: User[];
}

const SidebarUserList = ({ users }: SidebarUserListProps) => {
  async function getMessages(email: string) {
    const res = await axios.get(`${url}/message/getMessages?email=${email}`, {
      headers: {
        token: localStorage.getItem('token'),
      },
    });
    const messages = res.data;
    console.log(messages);
  }
  if (!users) return <div className="text-xl text-black/50 font-medium pt-4">NO USERS FOUND</div>;

  return (
    <div className="min-w-[13vw] min-h-[55vh] border border-black/10 rounded-xl mt-3 bg-purple-500/10">
      {users.map((user, index) => (
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
  );
};

export default SidebarUserList;
