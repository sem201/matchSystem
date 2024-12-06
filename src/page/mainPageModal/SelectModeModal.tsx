import React from "react";

// ModalProps 수정
interface ModalProps {
  closeModal: () => void;
  isModalOpen: boolean; // isModalOpen 속성 추가
}



export default function SelectModeModal({ closeModal }: ModalProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white p-8 rounded-lg w-[450px] shadow-lg">
        <h2 className="text-lg font-bold mb-4">모드 선택</h2>
        <p>여기에 모드 선택 관련 UI와 로직을 추가하세요.</p>
        <button
          onClick={closeModal}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          닫기
        </button>
      </div>
    </div>
  );
}
