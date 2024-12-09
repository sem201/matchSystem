import { Props } from "../../../commonTypes";
import LatestUserInfo from "./LatestUserInfo";
import { User } from "../../../commonTypes";
interface UserContainerProps extends Props {
  onAddUser: (user: User) => void;
}

const UserContainer: React.FC<UserContainerProps> = ({
  children,
  onAddUser,
}) => {
  const mockUsers: User[] = [
    { id: "1", nickname: "Player1", winRate: 50.4, tier: "DIA" },
    { id: "2", nickname: "Player2", winRate: 60.0, tier: "DIA" },
    { id: "3", nickname: "Player3", winRate: 45.8, tier: "DIA" },
    // 추가 사용자 데이터
  ];
  return (
    <>
      <div className="w-[300px] bg-[#F0E6D2] border-2 border-[#C8AA6E] rounded-[40px] bg-opacity-15 mt-7 mb-7 p-4">
        <div className="ml-3 mb-5 mt-3">최근에 같이한 친구</div>
        {mockUsers.map((user) => (
          <LatestUserInfo key={user.id} user={user} onAddUser={onAddUser} />
        ))}
        {children}
      </div>
    </>
  );
};

export default UserContainer;
