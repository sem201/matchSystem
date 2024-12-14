import React from "react";
import AddUserModal from "../../page/mainPageModal/AddUserModal";
import HowToUseModal from "../../page/mainPageModal/HowToUseModal";
import SelectModeModal from "../../page/mainPageModal/SelectModeModal";
import DraftModal from "../Mobile/chooseUser/DraftModal";

interface ButtonProps {
  setHeaderText: (text: string) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
  selectedMode: string;
  modalType: string;
  isDraftModalOpen: boolean;
}

const Button: React.FC<ButtonProps> = ({
  setHeaderText,
  setModalType,
  setIsDraftModalOpen,
  setSelectedMode,
  selectedMode,
  modalType,
  isDraftModalOpen,
}) => {
  // 모달 열기
  const openModal = (type: string) => {
    setModalType(type);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalType("");
  };

  return (
    <div className="lg:absolute lg:top-[-65px] lg:right-[0px] flex flex-col items-center justify-start xs:mt-7 xs:mb-7 lg:mt-3 lg:mb-3 lg:mx-auto lg:left-0 lg:right-0">
      <div className="font-blackHanSans flex flex-row items-center justify-center space-x-4 w-full">
        <button
          className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("addUser")}
        >
          인원추가
        </button>
        <button
          className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("selectMode")}
        >
          모드선택
        </button>
        <button
          className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("howToUse")}
        >
          사용법
        </button>

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
          <DraftModal closeModal={() => setIsDraftModalOpen(false)} />
        )}
      </div>
    </div>
  );
};

export default Button;
