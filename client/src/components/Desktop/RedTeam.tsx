import top from "./../../assets/line_img/line-top.png";
import jg from "./../../assets/line_img/line-jug.png";
import mid from "./../../assets/line_img/line-mid.png";
import ad from "./../../assets/line_img/line-ad.png";
import sup from "./../../assets/line_img/line-sup.png";
import none from "./../../assets/line_img/line-none.png";
import sett from "./../../assets/sett.png";
import tier from "./../../assets/tier.png";

import { useState } from "react";

import LineModal from "../Mobile/chooseUser/LineModal";

const RedTeam = () => {
  const [isLine, setIsLine] = useState<boolean>(false);
  const [line, setLine] = useState(none);
  return (
    <div className="w-[18%] min-w-[110px] max-h-[100%] border-2 border-solid border-[#8A2922] rounded-2xl flex flex-col items-center p-2">
      <img
        src={line}
        alt="라인 이미지"
        className="w-5 h-5"
        onClick={() => setIsLine(!isLine)}
      />
      <div className="w-[100%]">
        <ul>
          <li className="flex flex-row items-center justify-between">
            <img src={sett} alt="most" className="w-8 h-8" />
            <p className="text-xs">승률 50.2%</p>
          </li>
          <li className="flex flex-row items-center justify-between">
            <img src={sett} alt="most" className="w-8 h-8" />
            <p className="text-xs">승률 50.2%</p>
          </li>
          <li className="flex flex-row items-center justify-between">
            <img src={sett} alt="most" className="w-8 h-8" />
            <p className="text-xs">승률 50.2%</p>
          </li>
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

export default RedTeam;
