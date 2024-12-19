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
    if (addedUsers.some((u) => u.id === user.id)) {
      setAddedUsers((prev) => prev.map((u) => (u.id === user.id ? user : u)));
    } else {
      if (addedUsers.length > 9) {
        alert("사용자는 10명 이상 추가할 수 없습니다!");
        return;
      }
      // Redteam -> BlueTeam 순서로 추가
      if (redTeam.length <= blueTeam.length) {
        setRedTeam([...redTeam, user]);
      } else {
        setBlueTeam([...blueTeam, user]);
      }
      // addedUsers에 추가
      setAddedUsers((prev) => [...prev, user]);
    }
    // allUsers에서 제거
    setAllUsers((prev) => {
      // 중복 방지: 이미 allUsers에 존재하는지 확인
      const exists = prev.some((u) => u.id === user.id);
      if (!exists) {
        return [...prev, { ...user }]; // 새로운 객체를 추가
      }
      return prev; // 이미 존재하면 그대로 반환
    });
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
    setAllUsers((prev) => {
      if (prev.some((u) => u.id === user.id)) {
        return prev; // 중복 방지
      }
      return [...prev, user];
    });
  };

  // 응답을 기반으로 팀 재배열
  const updateTeams = (
    addUsers: User[],
    redTeam: User[],
    blueTeam: User[],
    response: any
  ) => {
    const redTeamIds = response.redTeam.players.map((player: any) => player.id);
    const blueTeamIds = response.blueTeam.players.map(
      (player: any) => player.id
    );

    const sortTeam = (team: User[], sorterIds: number[]) => {
      return sorterIds
        .map((id) => team.find((user) => user.id === id))
        .filter(Boolean) as User[];
    };
    const newRedTeam = sortTeam(addUsers, redTeamIds);
    console.log(newRedTeam);
    const newBlueTeam = sortTeam(addUsers, blueTeamIds);

    return { newRedTeam, newBlueTeam };
  };
  useEffect(() => {
    console.log("redTeam 업데이트됨:", redTeam);
    console.log("blueTeam 업데이트됨:", blueTeam);
  }, [redTeam]);
  const handleTeamButtonClick = async () => {
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

    if (selectedMode === "BALANCE") {
      const data = {
        players: addedUsers.map((user) => ({
          id: user.id,
          gameName: user.gameName,
          RankScore: user.tierScore.RankScore,
          position: user.Position,
        })),
        mode: "balance",
      };
      console.log("데이터 타입: ", typeof data.players);
      try {
        const response = await apiCall("noobs/TeamMach", "post", data);
        console.log(response.data);
        const { newRedTeam, newBlueTeam } = updateTeams(
          addedUsers,
          redTeam,
          blueTeam,
          response.data
        );

        setRedTeam(newRedTeam);
        setBlueTeam(newBlueTeam);
      } catch (err) {
        console.log(err);
      }
    } else if (selectedMode === "RANDOM") {
      // 랜덤모드일때 팀을 섞어 새로운 팀으로 설정
      const shuffledUsers = shuffleTeams(redTeam, blueTeam);
      const newRedTeam = shuffledUsers.slice(0, 5);
      const newBlueTeam = shuffledUsers.slice(5);

      setRedTeam(newRedTeam);
      setBlueTeam(newBlueTeam);
    } else if (selectedMode === "DRAFT") {
      setIsDraftModalOpen(true);
    } else {
      alert("Mode를 선택해 주세요요");
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

  const [sessionValid, setSessionValid] = useState<boolean | null>(null);

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
