import { Props } from "../../../commonTypes";
import LatestUserInfo from "./LatestUserInfo";
import { User } from "../../../commonTypes";
interface UserContainerProps extends Props {
  users: User[];
  onAddUser: (user: User) => void;
}

const UserContainer: React.FC<UserContainerProps> = ({
  children,
  users,
  onAddUser,
}) => {
  return (
    <>
      <div className="w-[300px] bg-[#F0E6D2] border-2 border-[#C8AA6E] rounded-[40px] bg-opacity-15 mt-7 mb-7 p-4">
        <div className="ml-3 mb-5 mt-3 text-white">최근에 같이한 친구</div>
        <hr />
        {users.map((user) => (
          <LatestUserInfo key={user.id} user={user} onAddUser={onAddUser} />
        ))}
        {children}
      </div>
    </>
  );
};

export default UserContainer;
