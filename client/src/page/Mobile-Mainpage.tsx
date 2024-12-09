import { useState } from "react";
import UserContainer from "../components/Mobile/chooseUser/UserContainer";
import AddUserModal from "./mainPageModal/AddUserModal";
import SelectModeModal from "./mainPageModal/SelectModeModal";
import HowToUseModal from "./mainPageModal/HowToUseModal";
import RedTeam from "../components/Mobile/Main/RedTeam";
import BlueTeam from "../components/Mobile/Main/BlueTeam";

import { User } from "../commonTypes";

const MobileMainpage = () => {
  const [modalType, setModalType] = useState<string | null>(null); // 현재 열리는 모달 타입
  const [redTeam, setRedTeam] = useState<User[]>([]); // RedTeam 유저 목록
  const [blueTeam, setBlueTeam] = useState<User[]>([]); // BlueTeam 유저 목록

  const addUser = (user: User) => {
    if (redTeam.length < 5) {
      setRedTeam((prev) => [...prev, user]);
    } else if (blueTeam.length < 5) {
      setBlueTeam((prev) => [...prev, user]);
    } else {
      alert("모든 팀이 이미 꽉 찼습니다!");
    }
  };

  const removeUser = (user: User) => {
    setRedTeam((prev) => prev.filter((member) => member.id !== user.id));
    setBlueTeam((prev) => prev.filter((member) => member.id !== user.id));
  };

  // 모달 열기
  const openModal = (type: string) => {
    setModalType(type);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalType(null);
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
          모드선택
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

      <button className="font-blackHanSans w-[40vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap">
        팀짜기
      </button>
      {/* 모달들 */}
      {modalType === "addUser" && (
        <AddUserModal
          isModalOpen={modalType !== null}
          closeModal={closeModal}
          // addUser={addUser}
        />
      )}
      {modalType === "selectMode" && (
        <SelectModeModal
          isModalOpen={modalType !== null}
          closeModal={closeModal}
        />
      )}
      {modalType === "howToUse" && (
        <HowToUseModal
          isModalOpen={modalType !== null}
          closeModal={closeModal}
        />
      )}
      <UserContainer onAddUser={addUser} />
    </div>
  );
};

export default MobileMainpage;
