import set from "../../../assets/set.png";
import close from "../../../assets/close.svg";

export default function UserContainer() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col items-center justify-start w-[80vw] h-[80vh] bg-[#F0E6D2] bg-opacity-15 rounded-3xl border-2 border-[#C8AA6E]">
        <div className="flex flex-row items-center justify-center space-x-4 w-full mb-6 mt-5">
          <button className="w-[18vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[9px] text-[#0F2041] flex items-center justify-center font-black">
            인원추가
          </button>
          <button className="w-[18vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[9px] text-[#0F2041] flex items-center justify-center font-extrabold">
            모드선택
          </button>
          <button className="w-[18vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[9px] text-[#0F2041] flex items-center justify-center font-extrabold">
            사용법
          </button>
        </div>
        <div className="text-[#FFFFFF] flex space-x-2">
          *
          <img src={set} alt="set" className="max-w-[7vw] max-h-[4vh]" />
          <div className="flex flex-col ">
            <p className="text-[8px]">티어입니다</p>
            <p className="text-[11px]">닉네임 입니다</p>
          </div>
          <div className="flex items-center space-x-1"></div>
          <p className="text-[11px]">#KR1</p>
          <p className="text-[11px]">승률 72.3%</p>
          <div />
          <img src={close} alt="close" />
        </div>
      </div>
    </div>
  );
}
