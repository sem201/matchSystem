import React, { useState } from "react";
import AddUserModal from "../../page/mainPageModal/AddUserModal";

const Button = () => {
  // Modal 상태 관리
  const [isOpenModal, setIsOpenModal] = useState(false);

  // Modal 열기 함수
  const openModal = () => {
    setIsOpenModal(true);
  };

  // Modal 닫기 함수
  const closeModal = () => {
    setIsOpenModal(false);
  };

  return (
    <div className="lg:absolute lg:top-[-65px] lg:right-[0px] flex flex-col items-center justify-start md:mt-7 md:mb-7 lg:mt-3 lg:mb-3 lg:left-[50%] lg:translate-x-[-50%]">
      <div className="font-blackHanSans flex flex-row items-center justify-center space-x-4 w-full">
        <button
          className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={openModal}
        >
          인원추가
        </button>
        <AddUserModal isModalOpen={isOpenModal} closeModal={closeModal} />
        <button className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap">
          모드선택
        </button>
        <button className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap">
          사용법
        </button>
      </div>
    </div>
  );
};

export default Button;
