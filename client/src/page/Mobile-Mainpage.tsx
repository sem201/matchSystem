import TeamContainer from "../components/Mobile/Main/TeamContainer";
import UserContainer from "../components/Mobile/chooseUser/UserContainer";

const MobileMainpage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-[100vw] max-h-[100vh] overflow-y-scroll">
      <div className="font-blackHanSans flex flex-row items-center justify-center space-x-4 w-full mb-6 mt-5">
        <button className="w-[20vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap">
          인원추가
        </button>
        <button className="w-[20vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap">
          모드선택
        </button>
        <button className="w-[20vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap">
          사용법
        </button>
      </div>
      <TeamContainer color="RED" />
      <TeamContainer color="BLUE" />

      <button className="font-blackHanSans w-[40vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap">
        팀짜기
      </button>
      <UserContainer />
    </div>
  );
};

export default MobileMainpage;
