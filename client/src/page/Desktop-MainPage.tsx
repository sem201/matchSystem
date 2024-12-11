import Team from "../components/Desktop/Team";
import Header from "../components/Desktop/Header";
import Menu from "../components/Desktop/Menu";
import { useState } from "react";

import { User } from "../commonTypes";

interface DesktopMainPageProps {
  allUser: User[];
  redTeam: User[];
  blueTeam: User[];
  onAddUserToTeam: (userId: number) => void;
}

const DesktopMainPage: React.FC<DesktopMainPageProps> = ({
  allUser,
  redTeam,
  blueTeam,
  onAddUserToTeam,
}) => {
  const [headerText, setHeaderText] = useState<string>("모드를 선택해주세요");
  return (
    <div className="w-[100vw] xs:h-[100%] lg:h-[100vh]">
      <Header text={headerText} />
      <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 gap-6 lg:w-[100%] lg:h-[70%] px-[50px]">
        <Team redTeam={redTeam} blueTeam={blueTeam} />
        <Menu
          setHeaderText={setHeaderText}
          allUser={allUser}
          onAddUserToTeam={onAddUserToTeam}
        />
      </div>
    </div>
  );
};

export default DesktopMainPage;
