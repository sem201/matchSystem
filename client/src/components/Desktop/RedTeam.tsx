import none from "./../../assets/line_img/line-none.png";
import tier from "./../../assets/tier.png";
import PlusIcon from "../../assets/svg/add.svg";
import close from "../../assets/svg/close.svg";

import { useState } from "react";

import LineModal from "../Mobile/chooseUser/LineModal";
import { User } from "../../commonTypes";

interface RedTeamProps {
  user?: User;
}

const RedTeam: React.FC<RedTeamProps> = ({ user }) => {
  const [isLine, setIsLine] = useState<boolean>(false);
  const [line, setLine] = useState(none);

  // 유저가 없을 경우 배경을 다르게 설정
  const backgroundClass = user ? "bg-[#D1C3C3]" : "bg-[#F0E6D2] bg-opacity-15";

  return (
    <div
      className={`w-[18%] max-h-[100%] border-2 border-solid border-[#8A2922] rounded-2xl flex flex-col items-center p-2 ${backgroundClass}`}
    >
      <div className="w-[100%]">
        <ul>
          {/* 유저 정보가 있을 경우 */}
          {user ? (
            <li
              key={user.id}
              className="flex flex-col items-center justify-center"
            >
              <img
                src={line}
                alt="라인 이미지"
                className="w-5 h-5"
                onClick={() => setIsLine(!isLine)}
              />
              <p className="text-xs font-bold">{user.nickname}</p>
              <img src={tier} alt="tier" className="h-9" />
              {isLine && <LineModal setLine={setLine} setIsLine={setIsLine} />}
              <img src={close} alt="close" className="w-5 h-5 cursor-pointer" />
            </li>
          ) : (
            // 유저 정보가 없을 경우
            <li className="text-gray-500">
              <img src={PlusIcon} alt="Add" className="" />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default RedTeam;
