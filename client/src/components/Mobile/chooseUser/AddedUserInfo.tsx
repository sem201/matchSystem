import none from "../../../assets/line_img/line-none.png";
import { useState } from "react";
import LineModal from "./LineModal";
import { User } from "../../../commonTypes";

interface AddedUserInfoProps {
  user: User;
  onRemoveUser: (user: User) => void;
}

const UserInfo: React.FC<AddedUserInfoProps> = ({ user, onRemoveUser }) => {
  const [isLine, setIsLine] = useState<boolean>(false);
  const [line, setLine] = useState(none);
  console.log(user.MostChamp);
  return (
    <div className="flex flex-row items-center h-[55px] mx-2 my-1 gap-2 relative">
      <img
        src={line}
        alt="line-info"
        className="w-[15px] h-[15px]"
        onClick={() => setIsLine(!isLine)}
      />
      <img
        src={user.MostChamp[0].champInfo.champ_img}
        alt="most-champ-info"
        className="w-[20px] h-[20px]"
      />
      <div className="flex flex-col">
        <div className="text-[10px] text-white">{user.tierScore.Rank}</div>
        <p className="max-w-[115px] min-w-[115px] text-[12px] text-ellipsis overflow-hidden text-white text-nowrap">
          {user.gameName} {user.tagLine}
        </p>
      </div>
      <p className="min-w-[66px] text-[13px] text-nowrap text-white">
        승률 {user.winRate}%
      </p>
      <button
        className="w-[10px] bg-inherit text-white"
        onClick={() => onRemoveUser(user)}
      >
        X
      </button>
      {isLine && <LineModal setLine={setLine} setIsLine={setIsLine} />}
    </div>
  );
};

export default UserInfo;
