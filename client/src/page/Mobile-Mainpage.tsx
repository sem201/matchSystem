import UserContainer from "../components/Mobile/chooseUser/UserContainer";
import AddUserModal from "./mainPageModal/AddUserModal";
import SelectModeModal from "./mainPageModal/SelectModeModal";
import DraftModal from "../components/Mobile/chooseUser/DraftModal";
import HowToUseModal from "./mainPageModal/HowToUseModal";
import RedTeam from "../components/Mobile/Main/RedTeam";
import BlueTeam from "../components/Mobile/Main/BlueTeam";

import { User } from "../commonTypes";

interface Props {
  allUsers: User[];
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
  setHeaderText: React.Dispatch<React.SetStateAction<string>>;
  setRedTeam: React.Dispatch<React.SetStateAction<User[]>>;
  setBlueTeam: React.Dispatch<React.SetStateAction<User[]>>;
  setAddedUsers: React.Dispatch<React.SetStateAction<User[]>>;
  setIsUserAdded: React.Dispatch<React.SetStateAction<boolean>>;
  handleAddUser: (user: User) => void;
  handleRemoveUser: (user: User) => void;
  selectedMode: string;
  modalType: string;
  isDraftModalOpen: boolean;
  addedUsers: User[];
  redTeam: User[];
  blueTeam: User[];
}

const MobileMainpage = ({
  allUsers,
  setModalType,
  setIsDraftModalOpen,
  setSelectedMode,
  selectedMode,
  modalType,
  isDraftModalOpen,
  setHeaderText,
  redTeam,
  setRedTeam,
  blueTeam,
  setBlueTeam,
  addedUsers,
  handleAddUser,
  handleRemoveUser,
  setIsUserAdded,
}: Props) => {
  const openModal = (type: string) => {
    setModalType(type);
  };

  const closeModal = () => {
    setModalType("");
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

  return (
    <div className="flex flex-col items-center justify-start w-[100vw] overflow-y-scroll">
      <div className="font-blackHanSans flex flex-row items-center justify-center space-x-4 w-full mb-6 mt-5">
        <button
          className="w-[20vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("addUser")}
        >
          인원추가
        </button>
        <button
          className="w-[20vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("selectMode")}
        >
          {selectedMode || "모드선택"}
        </button>
        <button
          className="w-[20vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("howToUse")}
        >
          사용법
        </button>
      </div>
      <RedTeam teamMembers={redTeam} onRemoveUser={handleRemoveUser} />
      <BlueTeam teamMembers={blueTeam} onRemoveUser={handleRemoveUser} />

      <button
        className="font-blackHanSans w-[40vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
        onClick={handleTeamButtonClick}
      >
        팀짜기
      </button>
      {/* 최근 함께한 유저 목록 */}
      <UserContainer
        users={allUsers.filter(
          (user) => !addedUsers.some((u) => u.id === user.id)
        )}
        onAddUser={handleAddUser}
        setIsUserAdded={setIsUserAdded}
      />

      {/* 모달들 */}
      {modalType === "addUser" && (
        <AddUserModal
          isModalOpen={modalType !== null}
          closeModal={closeModal}
          setIsUserAdded={setIsUserAdded}
        />
      )}
      {modalType === "selectMode" && (
        <SelectModeModal
          closeModal={closeModal}
          selectedMode={selectedMode}
          setSelectedMode={setSelectedMode} // 선택된 모드 처리 함수 전달
          setIsDraftModalOpen={setIsDraftModalOpen} // DraftModal 상태 관리 함수 전달
          setHeaderText={setHeaderText}
        />
      )}
      {modalType === "howToUse" && (
        <HowToUseModal
          isModalOpen={modalType !== null}
          closeModal={closeModal}
        />
      )}
      {/* DraftModal 열기 */}
      {isDraftModalOpen && (
        <DraftModal
          closeModal={() => setIsDraftModalOpen(false)}
          teamMembers={addedUsers}
        />
      )}
    </div>
  );
};

export default MobileMainpage;
