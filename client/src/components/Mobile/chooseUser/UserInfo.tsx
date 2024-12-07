import top from "../../../assets/line_img/line-top.png";
import jg from "../../../assets/line_img/line-jug.png";
import mid from "../../../assets/line_img/line-mid.png";
import ad from "../../../assets/line_img/line-ad.png";
import sup from "../../../assets/line_img/line-sup.png";
import none from "../../../assets/line_img/line-none.png";
import sett from "../../../assets/sett.png";
import { useState } from "react";
import LineModal from "./LineModal";

const UserInfo = () => {
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
      <div className="flex flex-col whitespace-nowrap">
        <div className="text-[10px]">UNRANK</div>
        <p className="text-[12px]">닉네임네임입니#KR1</p>
      </div>
      <p className="text-[13px] text-nowrap">승률 50.4%</p>
      <button className="ml-[-25px] bg-inherit">X</button>
      {isLine && <LineModal setLine={setLine} setIsLine={setIsLine} />}
    </div>
  );
};

export default UserInfo;
