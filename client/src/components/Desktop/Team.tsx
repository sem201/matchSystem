import BlueTeam from "./BlueTeam";
import RedTeam from "./RedTeam";
import Versus from "./Versus";

export default function Team() {
  const redTeamCount = 5;
  const blueTeamCount = 5;
  return (
    <div className="w-[66vw] h-[66vh] border border-solid border-[#C89B3C] rounded-2xl px-[3vw] py-[3vh] flex flex-col gap-[20px] bg-[#F0E6D2] bg-opacity-30">
      {/* Red Team 영역 */}
      <div className="w-[100%] h-[100%] flex gap-[25px]">
        {Array.from({ length: redTeamCount }).map((_, idx) => (
          <RedTeam key={idx} />
        ))}
      </div>
      <div>
        <Versus />
      </div>
      {/* Blue Team 영역 */}
      <div className="w-[100%] h-[100%] flex gap-[25px]">
        {Array.from({ length: blueTeamCount }).map((_, idx) => (
          <BlueTeam key={idx} />
        ))}
      </div>
    </div>
  );
}
