import BlueTeam from "./BlueTeam";
import RedTeam from "./RedTeam";
import Versus from "./Versus";
import { User } from "../../commonTypes";

interface TeamProps {
  redTeam: User[];
  blueTeam: User[];
  onRemoveUser: (userId: number) => void;
}

const Team: React.FC<TeamProps> = ({ redTeam, blueTeam, onRemoveUser }) => {
  const redTeamCount = 5;
  const blueTeamCount = 5;
  return (
    <div className="lg:col-span-2 lg:row-span-3 border border-solid border-[#C89B3C] rounded-2xl xs:px-[1vw] xs:py-[1vh] md:px-[2vw] md:py-[2vh] xl:px-[3vw] xl:py-[3vh] flex flex-col xl:gap-[20px] lg:gap-[5px] bg-[#F0E6D2] bg-opacity-30 lg:overflow-hidden">
      {/* Red Team 영역 */}
      <div className="w-[100%] h-[100%] flex xs:gap-[10px] lg:gap-[15px] xl:gap-[25px] justify-center">
        {Array.from({ length: redTeamCount }).map((_, idx) => (
          <RedTeam key={idx} user={redTeam[idx]} onRemoveUser={onRemoveUser} />
        ))}
      </div>
      <div>
        <Versus />
      </div>
      {/* Blue Team 영역 */}
      <div className="w-[100%] h-[100%] flex xs:gap-[10px] lg:gap-[15px] xl:gap-[25px] justify-center">
        {Array.from({ length: blueTeamCount }).map((_, idx) => (
          <BlueTeam key={idx} user={blueTeam[idx]} />
        ))}
      </div>
    </div>
  );
};

export default Team;
