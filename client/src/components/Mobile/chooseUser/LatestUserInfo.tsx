import sett from "../../../assets/sett.png";
import { User } from "../../../commonTypes";
interface LatestUserInfoProps {
  user: User;
  onAddUser: (user: User) => void;
}
const LatestUserInfo: React.FC<LatestUserInfoProps> = ({ user, onAddUser }) => {
  return (
    <div className="flex flex-row items-center h-[55px] mx-2 my-1 gap-2 relative">
      <img src={sett} alt="most-champ-info" className="w-[20px] h-[20px]" />
      <div className="flex flex-col">
        <div className="text-[10px] text-white">UNRANK</div>
        <p className="max-w-[115px] text-[12px] text-ellipsis overflow-hidden text-white text-nowrap">
          닉네임네임입니#KR1
        </p>
      </div>
      <p className="text-[13px] text-nowrap text-white">승률 50.4%</p>
      <button
        onClick={() => onAddUser(user)}
        className="w-[10px] bg-inherit text-white"
      >
        +
      </button>
    </div>
  );
};

export default LatestUserInfo;
