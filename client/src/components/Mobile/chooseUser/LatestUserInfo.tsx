import { User } from "../../../commonTypes";
interface LatestUserInfoProps {
  user: User;
  onAddUser: (user: User) => void;
}
const LatestUserInfo: React.FC<LatestUserInfoProps> = ({ user, onAddUser }) => {
  return (
    <div className="flex flex-row items-center h-[55px] mx-2 my-1 gap-2 relative">
      <img
        src={`${user.MostChamp[0].champInfo.champ_img}`}
        alt="most-champ-info"
        className="w-[20px] h-[20px]"
      />
      <div className="flex flex-col">
        <div className="text-[10px] text-white">
          {user.tierScore.Rank}
          {user.tierScore.tier}
        </div>
        <p className="max-w-[115px] min-w-[115px] text-[12px] text-ellipsis overflow-hidden text-white text-nowrap">
          {user.gameName} {user.tagLine}
        </p>
      </div>
      <p className="min-w-[66px] text-[13px] text-nowrap text-white">
        승률 {user.winRate}%
      </p>
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
