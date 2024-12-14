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
  blueTeam,
  addedUsers,
  setRedTeam,
  setBlueTeam,
  setAddedUsers,
}: Props) => {
  // const [addedUsers, setAddedUsers] = useState<User[]>([]);
  // const [redTeam, setRedTeam] = useState<User[]>([]); // RedTeam 유저 목록
  // const [blueTeam, setBlueTeam] = useState<User[]>([]); // BlueTeam 유저 목록
  // const [modalType, setModalType] = useState<string | null>(null); // 현재 열리는 모달 타입
  // const [isDraftModalOpen, setIsDraftModalOpen] = useState(false); // DraftModal 상태 관리
  // const [selectedMode, setSelectedMode] = useState<string>("RANDOM"); // 선택된 모드 상태

  const addUser = (user: User) => {
    if (redTeam.length < 5) {
      setRedTeam((prev) => [...prev, user]);
    } else if (blueTeam.length < 5) {
      setBlueTeam((prev) => [...prev, user]);
    } else {
      alert("모든 팀이 이미 꽉 찼습니다!");
    }
    setAddedUsers((prev) => [...prev, user]);
  };

  const removeUser = (user: User) => {
    if (redTeam.some((u) => u.id === user.id)) {
      setRedTeam((prev) => prev.filter((u) => u.id !== user.id));
    } else if (blueTeam.some((u) => u.id === user.id)) {
      setBlueTeam((prev) => prev.filter((u) => u.id !== user.id));
    }
    setAddedUsers((prev) => prev.filter((u) => u.id !== user.id));
  };

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
      <RedTeam teamMembers={redTeam} onRemoveUser={removeUser} />
      <BlueTeam teamMembers={blueTeam} onRemoveUser={removeUser} />

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
        onAddUser={addUser}
      />

      {/* 모달들 */}
      {modalType === "addUser" && (
        <AddUserModal
          isModalOpen={modalType !== null}
          closeModal={closeModal}
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
          teamMembers={allUsers}
        />
      )}
    </div>
  );
};

export default MobileMainpage;
