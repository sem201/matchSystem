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
  setAllUser: React.Dispatch<React.SetStateAction<User[]>>;
  setRedTeam: React.Dispatch<React.SetStateAction<User[]>>;
  setBlueTeam: React.Dispatch<React.SetStateAction<User[]>>;
}

const DesktopMainPage: React.FC<DesktopMainPageProps> = ({
  allUser,
  redTeam,
  blueTeam,
  onAddUserToTeam,
  setAllUser,
  setRedTeam,
  setBlueTeam,
}) => {
  const [headerText, setHeaderText] = useState<string>("모드를 선택해주세요");

  const handleRemoveUser = (userId: number) => {
    const selectedUser = redTeam.find((user) => user.id === userId);
    if (selectedUser) {
      // user를 allUser로 다시 추가
      setAllUser([...allUser, selectedUser]);

      // redTeam, blueTeam에서 해당 유저 제거
      setRedTeam(redTeam.filter((user) => user.id !== userId));
      setBlueTeam(blueTeam.filter((user) => user.id !== userId));
    }
  };
  return (
    <div className="w-[100vw] xs:h-[100%] lg:h-[100vh]">
      <Header text={headerText} />
      <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 gap-6 lg:w-[100%] lg:h-[70%] px-[50px]">
        <Team
          redTeam={redTeam}
          blueTeam={blueTeam}
          onRemoveUser={handleRemoveUser}
        />
        <Menu
          setHeaderText={setHeaderText}
          allUser={allUser}
          onAddUserToTeam={onAddUserToTeam}
          setAllUser={setAllUser}
          setRedTeam={setRedTeam}
          setBlueTeam={setBlueTeam}
        />
      </div>
    </div>
  );
};

export default DesktopMainPage;
