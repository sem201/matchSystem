import { useEffect, useState } from "react";
import MobileMainpage from "./Mobile-Mainpage";
import DesktopMainPage from "./Desktop-MainPage";

import { User } from "../commonTypes";
import apiCall from "../Api/Api";

const MainPage = () => {
  const [isUserAdded, setIsUserAdded] = useState<boolean>(false);
  // 유저 데이터 저장
  const [allUsers, setAllUsers] = useState<User[]>([]);
  // 최근 함께한 유저 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiCall("/noobs/friendUserBr", "get", null);
        setAllUsers(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [isUserAdded]);
  const [modalType, setModalType] = useState<string>(""); // 현재 열리는 모달 타입
  const [isDraftModalOpen, setIsDraftModalOpen] = useState(false); // DraftModal 상태 관리
  const [selectedMode, setSelectedMode] = useState<string>("모드선택"); // 선택된 모드 상태
  const [headerText, setHeaderText] = useState<string>("모드를 선택해주세요");

  // 추가 된 유저
  const [addedUsers, setAddedUsers] = useState<User[]>([]);

  // 레드팀, 블루팀 데이터
  const [redTeam, setRedTeam] = useState<User[]>([]);
  const [blueTeam, setBlueTeam] = useState<User[]>([]);

  // 사용자 추가 핸들러
  const handleAddUser = (user: User) => {
    const selectedUser = allUsers.find((u) => u.id === user.id);
    if (!selectedUser) return;

    // Redteam -> BlueTeam 순서로 추가
    if (redTeam.length <= blueTeam.length) {
      setRedTeam([...redTeam, selectedUser]);
    } else {
      setBlueTeam([...blueTeam, selectedUser]);
    }

    // allUsers에서 제거
    setAllUsers((prev) => prev.filter((u) => u.id !== user.id));

    // addedUsers에 추가
    setAddedUsers((prev) => [...prev, user]);
  };

  // 팀에서 사용자 제거 로직
  const handleRemoveUser = (user: User) => {
    // RedTeam에서 유저
    if (redTeam.some((u) => u.id === user.id)) {
      setRedTeam((prev) => prev.filter((u) => u.id !== user.id));
    } else if (blueTeam.some((u) => u.id === user.id)) {
      setBlueTeam((prev) => prev.filter((u) => u.id !== user.id));
    }

    // addedUser에서 제거
    setAddedUsers((prev) => prev.filter((u) => u.id !== user.id));

    // allUser에서 생성
    setAllUsers((prev) => [...prev, user]);
  };

  const handleTeamButtonClick = () => {
    if (redTeam.length < 5 || blueTeam.length < 5) {
      alert("각 팀에 5명이 모두 배치되어야 팀을 짤 수 있습니다.");
      return;
    }

    const shuffleTeams = (red: User[], blue: User[]): User[] => {
      const allUsers = [...red, ...blue]; // 레드팀과 블루팀의 유저들을 합침
      for (let i = allUsers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1)); // 랜덤 인덱스
        [allUsers[i], allUsers[j]] = [allUsers[j], allUsers[i]]; // 두 유저를 교환
      }
      return allUsers;
    };

    if (selectedMode === "모드선택") {
      alert("Mode를 선택해 주세요");
    }

    if (selectedMode === "RANDOM") {
      // 랜덤모드일때 팀을 섞어 새로운 팀으로 설정
      const shuffledUsers = shuffleTeams(redTeam, blueTeam);
      const newRedTeam = shuffledUsers.slice(0, 5);
      const newBlueTeam = shuffledUsers.slice(5);

      setRedTeam(newRedTeam);
      setBlueTeam(newBlueTeam);
    }
    if (selectedMode === "DRAFT") {
      setIsDraftModalOpen(true);
    }
  };
  // 모달 열기
  const openModal = (type: string) => {
    setModalType(type);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalType("");
  };

  // 모바일 / 데스크탑 크기 구분
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  // 화면 크기 변화에 따른 상태 업데이트
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 700);

    // 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => window.removeEventListener("resize", handleResize);
  });

  const sharedProps = {
    allUsers,
    addedUsers,
    setAddedUsers,
    redTeam,
    setRedTeam,
    blueTeam,
    setBlueTeam,
    handleAddUser: handleAddUser,
    handleRemoveUser: handleRemoveUser,
    modalType,
    setModalType,
    isDraftModalOpen,
    setIsDraftModalOpen,
    selectedMode,
    setSelectedMode,
    headerText,
    setHeaderText,
    handleTeamButtonClick,
    openModal,
    closeModal,
    setIsUserAdded,
  };

  return (
    <div>
      {isMobile ? (
        <MobileMainpage {...sharedProps} />
      ) : (
        <DesktopMainPage {...sharedProps} />
      )}
    </div>
  );
};

export default MainPage;
