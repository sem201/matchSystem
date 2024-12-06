import React, { useState } from "react";
import AddUserModal from "../page/mainPageModal/AddUserModal";
import SelectModeModal from "../page/mainPageModal/SelectModeModal";
import HowToUseModal from "../page/mainPageModal/HowToUseModal";

export default function MainPage() {
  const [modalType, setModalType] = useState<string | null>(null); // 현재 열리는 모달 타입

  // 모달 열기
  const openModal = (type: string) => {
    setModalType(type);
  };

  // 모달 닫기
  const closeModal = () => {
    setModalType(null);
  };

  return (
    <div className="relative min-h-screen">
      {/* 테스트용 버튼 3개 */}
      <div className="flex flex-col items-center space-y-4 mt-8">
        <button
          onClick={() => openModal("addUser")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          인원추가
        </button>
        <button
          onClick={() => openModal("selectMode")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          모드선택
        </button>
        <button
          onClick={() => openModal("howToUse")}
          className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          사용법
        </button>
      </div>

      {/* 모달들 */}
      {modalType === "addUser" && (
        <AddUserModal isModalOpen={modalType !== null} closeModal={closeModal} />
      )}
      {modalType === "selectMode" && (
        <SelectModeModal isModalOpen={modalType !== null} closeModal={closeModal} />
      )}
      {modalType === "howToUse" && (
        <HowToUseModal isModalOpen={modalType !== null} closeModal={closeModal} />
      )}
    </div>
  );
}
