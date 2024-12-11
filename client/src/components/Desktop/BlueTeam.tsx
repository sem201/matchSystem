import none from "./../../assets/line_img/line-none.png";
import tier from "./../../assets/tier.png";
import PlusIcon from "../../assets/svg/add.svg";

import { useState } from "react";

import LineModal from "../Mobile/chooseUser/LineModal";
import { User } from "../../commonTypes";

interface BlueTeamProps {
  user?: User;
}
const BlueTeam: React.FC<BlueTeamProps> = ({ user }) => {
  const [isLine, setIsLine] = useState<boolean>(false);
  const [line, setLine] = useState(none);
  return (
    <div className="w-[18%] max-h-[100%] border-2 border-solid border-[#004A82] rounded-2xl flex flex-col items-center p-2">
      <img
        src={line}
        alt="라인 이미지"
        className="w-5 h-5"
        onClick={() => setIsLine(!isLine)}
      />
      <div className="w-[100%]">
        <ul>
          {/* 유저 정보가 있을 경우 */}
          {user ? (
            <li
              key={user.id}
              className="flex flex-row items-center justify-between"
            >
              <p className="text-xs font-bold">{user.nickname}</p>
            </li>
          ) : (
            // 유저 정보가 없을 경우
            <li className="text-center text-gray-500">
              <img src={PlusIcon} alt="Add" className="" />
            </li>
          )}
        </ul>
      </div>
      <p className="text-xs overflow-hidden text-ellipsis text-nowrap">
        닉네임닉네입니다#KR1
      </p>
      <img src={tier} alt="tier" className="h-9" />
      {isLine && <LineModal setLine={setLine} setIsLine={setIsLine} />}
    </div>
  );
};

export default BlueTeam;
