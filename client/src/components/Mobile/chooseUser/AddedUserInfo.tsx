import none from "../../../assets/line_img/line-none.png";
import sett from "../../../assets/sett.png";
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
  return (
    <div className="flex flex-row items-center h-[55px] mx-2 my-1 gap-2 relative">
      <img
        src={line}
        alt="line-info"
        className="w-[15px] h-[15px]"
        onClick={() => setIsLine(!isLine)}
      />
      <img src={sett} alt="most-champ-info" className="w-[20px] h-[20px]" />
      <div className="flex flex-col">
        <div className="text-[10px] text-white">UNRANK</div>
        <p className="max-w-[115px] text-[12px] text-ellipsis overflow-hidden text-white text-nowrap">
          닉네임네임입니#KR1
        </p>
      </div>
      <p className="text-[13px] text-nowrap text-white">승률 50.4%</p>
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
