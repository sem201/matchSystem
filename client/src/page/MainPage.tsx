import { useEffect, useState } from "react";
import MobileMainpage from "./Mobile-Mainpage";
import DesktopMainPage from "./Desktop-MainPage";

import { User } from "../commonTypes";

const MainPage = () => {
  // 유저 데이터 저장
  const [allUser, setAllUser] = useState<User[]>([
    { id: 1, nickname: "User1", winRate: 50.4 },
    { id: 2, nickname: "User2", winRate: 52.1 },
    { id: 3, nickname: "User3", winRate: 49.5 },
    { id: 4, nickname: "User4", winRate: 48.9 },
    { id: 5, nickname: "User5", winRate: 53.3 },
    { id: 6, nickname: "User6", winRate: 51.2 },
    { id: 7, nickname: "User7", winRate: 47.8 },
    { id: 8, nickname: "User8", winRate: 50.0 },
    { id: 9, nickname: "User9", winRate: 49.1 },
    { id: 10, nickname: "User10", winRate: 52.7 },
  ]);

  // 추가된 유저 데이터

  // 레드팀, 블루팀 데이터
  const [redTeam, setRedTeam] = useState<User[]>([]);
  const [blueTeam, setBlueTeam] = useState<User[]>([]);

  // 사용자 추가 핸들러
  const handleAddUserToTeam = (userId: number) => {
    const selectedUser = allUser.find((user) => user.id === userId);
    if (!selectedUser) return;

    // Redteam -> BlueTeam 순서로 추가
    if (redTeam.length <= blueTeam.length) {
      setRedTeam([...redTeam, selectedUser]);
    } else {
      setBlueTeam([...blueTeam, selectedUser]);
    }

    // allUser에서 제거
    setAllUser(allUser.filter((user) => user.id !== userId));
  };

  // 팀에서 사용자 제거 로직

  // 모바일 / 데스크탑 크기 구분
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  // 화면 크기 변화에 따른 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 700);
    };

    // 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <div>
      {isMobile ? (
        <MobileMainpage />
      ) : (
        <DesktopMainPage
          allUser={allUser}
          redTeam={redTeam}
          blueTeam={blueTeam}
          onAddUserToTeam={handleAddUserToTeam}
        />
      )}
    </div>
  );
};

export default MainPage;
