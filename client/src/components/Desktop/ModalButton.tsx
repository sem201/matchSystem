import React, { useState } from "react";
import AddUserModal from "../../page/mainPageModal/AddUserModal";
import HowToUseModal from "../../page/mainPageModal/HowToUseModal";
import SelectModeModal from "../../page/mainPageModal/SelectModeModal";

interface ButtonProps {
  setHeaderText: (text: string) => void;
}

const Button: React.FC<ButtonProps> = ({ setHeaderText }) => {
  // Modal 상태 관리
  const [isAddUserModal, setIsAddUserModal] = useState(false);
  const [isHowToUseModal, setIsHowToUseModal] = useState(false);
  const [isSelectModeModal, setIsSelectModeModal] = useState(false);

  // Modal 열기 함수
  const openAddUserModal = () => {
    setIsAddUserModal(true);
  };

  const openHowToUseModal = () => {
    setIsHowToUseModal(true);
  };

  const openSelectModeModal = () => {
    setIsSelectModeModal(true);
  };

  // Modal 닫기 함수
  const closeAddUserModal = () => {
    setIsAddUserModal(false);
  };

  const closeHowToUseModal = () => {
    setIsHowToUseModal(false);
  };

  const closeSelectModeModal = () => {
    setIsSelectModeModal(false);
  };

  return (
    <div className="lg:absolute lg:top-[-65px] lg:right-[0px] flex flex-col items-center justify-start xs:mt-7 xs:mb-7 lg:mt-3 lg:mb-3 lg:mx-auto lg:left-0 lg:right-0">
      <div className="font-blackHanSans flex flex-row items-center justify-center space-x-4 w-full">
        <button
          className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={openAddUserModal}
        >
          인원추가
        </button>
        <AddUserModal
          isModalOpen={isAddUserModal}
          closeModal={closeAddUserModal}
        />
        <button
          className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={openSelectModeModal}
        >
          모드선택
        </button>

        {/* SelectModeModal 렌더링 */}
        {isSelectModeModal && (
          <SelectModeModal
            isModalOpen={isSelectModeModal}
            closeModal={closeSelectModeModal}
            setHeaderText={setHeaderText} // 상태 전달
          />
        )}
        <button
          className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={openHowToUseModal}
        >
          사용법
        </button>

        {/* HowToUseModal 렌더링 */}

        {isHowToUseModal && (
          <HowToUseModal
            isModalOpen={isHowToUseModal}
            closeModal={closeHowToUseModal}
          />
        )}
      </div>
    </div>
  );
};

export default Button;
