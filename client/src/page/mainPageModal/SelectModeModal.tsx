import React, { useState } from "react";
import DraftModal from "../../components/Mobile/chooseUser/DraftModal";

interface ModalProps {
  closeModal: () => void;

  isModalOpen: boolean;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>; // setIsDraftModalOpen 추가
  setHeaderText: (text: string) => void;
}

export default function SelectModeModal({
  closeModal,
  setIsDraftModalOpen, // prop으로 받기
  setHeaderText,
}: ModalProps) {
  const [selectedMode, setSelectedMode] = useState("RANDOM"); // 기본값은 RANDOM
  const [isTransitioning, setIsTransitioning] = useState(false); // 애니메이션 상태

  const modeDescriptions: Record<string, string> = {
    RANDOM: "RANDOM 모드는 랜덤으로 팀을 구성합니다.",
    DRAFT: "DRAFT 모드는 플레이어가 번갈아 가며 팀을 선택합니다.",
    BALANCE: "BALANCE 모드는 밸런스를 맞춰 팀을 자동으로 구성합니다.",
  };

  const modeImages: Record<string, string> = {
    RANDOM: "/src/assets/modeGif/random.gif",
    DRAFT: "/src/assets/modeGif/draft.gif",
    BALANCE: "/src/assets/modeGif/justice.gif",
  };

  const handleModeClick = (mode: string) => {
    if (mode !== selectedMode) {
      setIsTransitioning(true);
      setTimeout(() => {
        setSelectedMode(mode);
        setIsTransitioning(false);
      }, 300);
    }
  };

  // 확인 클릭시 헤더 택스트
  const handleConfirm = () => {
    alert(`${selectedMode} 모드가 선택되었습니다.`);

    if (selectedMode === "DRAFT") {
      // DRAFT 모드가 선택되면 DraftModal을 열기
      setIsDraftModalOpen(true); // 여기서 상태를 true로 설정
      setHeaderText(`${selectedMode} 모드`);
      closeModal();
    }

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center font-blackHanSans"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div className="bg-white border-[3px] border-[#C89B3C] p-8 rounded-lg w-[450px] shadow-lg relative overflow-hidden">
          <div className="flex justify-center items-center space-x-4 mb-6">
            {["RANDOM", "DRAFT", "BALANCE"].map((mode) => (
              <button
                key={mode}
                onClick={() => handleModeClick(mode)}
                className={`px-3 py-2 font-bold text-lg border-[3px] border-[#C89B3C] transition-all duration-300 ${
                  selectedMode === mode ? "text-[#0F2041]" : "text-gray-600"
                } focus:outline-none`}
                style={{
                  cursor: "pointer",
                  borderRadius: "8px",
                  backgroundColor: "#F0E6D2",
                }}
              >
                {mode}
              </button>
            ))}
          </div>

          <div className="relative h-[200px] mb-4 flex items-center justify-center  rounded-lg">
            <div
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
                isTransitioning ? "opacity-0" : "opacity-100"
              }`}
            >
              <img
                src={modeImages[selectedMode]}
                alt={`${selectedMode} 모드 이미지`}
                className="max-h-full"
              />
            </div>
          </div>

          <div
            className={`transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <p className="text-center text-sm font-bold text-gray-700">
              {modeDescriptions[selectedMode]}
            </p>
          </div>

          <div className="flex justify-center space-x-4 mt-6">
            <button
              onClick={() => {
                handleConfirm();
              }}
              className="bg-[#F0E6D2] px-6 py-2 border-[3px] border-[#C89B3C] text-[#0F2041] rounded-lg  transition-colors"
            >
              확인
            </button>
            <button
              onClick={closeModal}
              className="bg-[#F0E6D2] px-6 py-2 border-[3px] border-[#C89B3C] text-[#0F2041] rounded-lg  transition-colors"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    );
  };
}
