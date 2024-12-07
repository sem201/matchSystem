import top from "../../../assets/line_img/line-top.png";
import jg from "../../../assets/line_img/line-jug.png";
import mid from "../../../assets/line_img/line-mid.png";
import ad from "../../../assets/line_img/line-ad.png";
import sup from "../../../assets/line_img/line-sup.png";
interface Props {
  setLine: (line: string) => void;
  setIsLine: (isLine: boolean) => void;
}
const LineModal = ({ setLine, setIsLine }: Props) => {
  const handleClick = (newLine: string) => {
    setLine(newLine);
    setIsLine(false);
  };
  return (
    <div className="absolute flex flex-row bg-white border-[1.5px] border-[#C8AA6E] rounded-[15px] w-[120px] h-[20px] items-center justify-around">
      <img
        src={top}
        className="w-[15px] h-[15px] cursor-pointer"
        onClick={() => handleClick(top)}
      />
      <img
        src={jg}
        className="w-[15px] h-[15px] cursor-pointer"
        onClick={() => handleClick(jg)}
      />
      <img
        src={mid}
        className="w-[15px] h-[15px] cursor-pointer"
        onClick={() => handleClick(mid)}
      />
      <img
        src={ad}
        className="w-[15px] h-[15px] cursor-pointer"
        onClick={() => handleClick(ad)}
      />
      <img
        src={sup}
        className="w-[15px] h-[15px] cursor-pointer"
        onClick={() => handleClick(sup)}
      />
    </div>
  );
};

export default LineModal;
