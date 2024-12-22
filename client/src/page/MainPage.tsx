import { useEffect, useState } from "react";
import MobileMainpage from "./Mobile-Mainpage";
import DesktopMainPage from "./Desktop-MainPage";
import { AxiosError } from "axios";
import { User } from "../commonTypes";
import apiCall from "../Api/Api";
import Swal from "sweetalert2";

const MainPage = () => {
  const [isUserAdded, setIsUserAdded] = useState<boolean>(false);
  // 유저 데이터 저장
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [NoobsUser, setNoobsUser] = useState<User[]>([]);
  // 최근 함께한 유저 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [response, NoobResponse] = await Promise.all([
          apiCall("/noobs/friendUserBr", "get", null),
          apiCall("/noobs/nobsinfo", "get", null),
        ]);
        setAllUsers(response.data.data);
        setNoobsUser(NoobResponse.data);
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
        Swal.fire({
          icon: "warning", // 경고 느낌의 아이콘
          title: "인원 초과 ⚠️",
          text: "함께한 친구 목록이 가득 찼습니다!",
          confirmButtonText: "확인",
          background: "#fff",
          color: "#000",
        });
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
  const updateTeams = (addUsers: User[], response: any) => {
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
    const newBlueTeam = sortTeam(addUsers, blueTeamIds);

    return { newRedTeam, newBlueTeam };
  };
  const handleTeamButtonClick = async () => {
    if (redTeam.length < 5 || blueTeam.length < 5) {
      Swal.fire({
        icon: "info", // 'info'는 안내 아이콘
        title: "팀 나누기 불가 😢",
        text: "각 팀별로 5명씩 등록되어야 합니다.",
        background: "#fff",
        color: "#000", // 좀 더 부드러운 색상
        showConfirmButton: true, // 확인 버튼 표시
      });
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
          position: user.position,
        })),
        mode: "balance",
      };

      try {
        const response = await apiCall("noobs/TeamMach", "post", data);
        const { newRedTeam, newBlueTeam } = updateTeams(
          addedUsers,
          response.data
        );

        setRedTeam(newRedTeam);
        setBlueTeam(newBlueTeam);
      } catch (error: unknown) {
        if (error instanceof AxiosError) {
          const missingPlayers = error.response?.data.missingPlayers;

          if (missingPlayers && Array.isArray(missingPlayers)) {
            // missingPlayers 배열에서 gameName 값만 추출하여 콘솔에 출력
            const gameNames = missingPlayers.map((player) => player.gameName);
            const gameNamesString = gameNames.join(", "); // 배열을 쉼표로 구분된 문자열로 변환
            Swal.fire({
              icon: "error",
              title: "포지션 미선택 소환사",
              text: gameNamesString,
              background: "#fff",
              color: "#f44336",
              showConfirmButton: true,
            });
          } else {
            console.log("missingPlayers가 올바른 배열이 아닙니다.");
          }
        } else {
          console.log("알 수 없는 오류 발생");
        }
      }
    } else if (selectedMode === "RANDOM") {
      // 랜덤모드일때 팀을 섞어 새로운 팀으로 설정
      const shuffledUsers = shuffleTeams(redTeam, blueTeam);
      const newRedTeam = shuffledUsers.slice(0, 5);
      const newBlueTeam = shuffledUsers.slice(5);

      setRedTeam(newRedTeam);
      setBlueTeam(newBlueTeam);
    } else if (selectedMode === "DRAFT") {
      const data = {
        players: [
          { id: 1, gameName: "test1", RankScore: 10, leader: true },
          { id: 2, gameName: "test2", RankScore: 15, leader: true },
          { id: 3, gameName: "test3", RankScore: 20 },
          { id: 4, gameName: "test4", RankScore: 18 },
          { id: 5, gameName: "test5", RankScore: 12 },
          { id: 6, gameName: "test6", RankScore: 22 },
          { id: 7, gameName: "test7", RankScore: 14 },
          { id: 8, gameName: "test8", RankScore: 17 },
          { id: 9, gameName: "test9", RankScore: 13 },
          { id: 10, gameName: "test10", RankScore: 19 },
        ],
        mode: "draft",
      };

      const response = await apiCall("/noobs/TeamMach", "post", data);
    } else {
      Swal.fire({
        icon: "info",
        title: "모드 선택 안내",
        text: "랜덤/드래프트/밸런스 중 한개를 선택하세요!",
        background: "#fff",
        color: "#000",
        showConfirmButton: true,
      });
    }
  };
  // 사용자 삭제 로직
  const handleDeleteUser = (userId: number) => {
    const updatedUsers = allUsers.filter((user) => user.id !== userId);
    setAllUsers(updatedUsers);
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
    NoobsUser,
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
    handleDeleteUser,
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
