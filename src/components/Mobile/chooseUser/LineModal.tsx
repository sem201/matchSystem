import none from "../../../assets/line-none.png";
import top from "../../../assets/line-top.png";
import jg from "../../../assets/line-jug.png";
import mid from "../../../assets/line-mid.png";
import ad from "../../../assets/line-ad.png";
import sup from "../../../assets/line-sup.png";

const LineModal = ({ isLine }) => {
  return (
    <div className="absolute flex flex-row bg-white border-[1.5px] border-[#C8AA6E] rounded-[15px] w-[120px] h-[20px] items-center justify-around">
      <img src={top} className="w-[15px] h-[15px]" />
      <img src={jg} className="w-[15px] h-[15px]" />
      <img src={mid} className="w-[15px] h-[15px]" />
      <img src={ad} className="w-[15px] h-[15px]" />
      <img src={sup} className="w-[15px] h-[15px]" />
    </div>
  );
};

export default LineModal;
