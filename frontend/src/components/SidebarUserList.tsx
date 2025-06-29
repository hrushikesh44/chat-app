import SidebarUser from './SidebarUser';

type User = {
  fullName: string;
  profilePic: string;
};

interface SidebarUserListProps {
  users: User[];
}

const SidebarUserList = ({ users }: SidebarUserListProps) => {
  if (!users.length)
    return <div className="text-xl text-black/50 font-medium pt-4">NO USERS FOUND</div>;

  return (
    <div>
      {users.map((user, index) => (
        <SidebarUser
          user={user.fullName}
          image={user.profilePic}
          key={index}
        />
      ))}
    </div>
  );
};

export default SidebarUserList;
