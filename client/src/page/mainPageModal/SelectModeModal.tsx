import React, { useState } from "react";
// import DraftModal from "../../components/Mobile/chooseUser/DraftModal";

interface ModalProps {
  closeModal: () => void;
  selectedMode: string;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>; // 부모로부터 받은 setSelectedMode
  setHeaderText: (text: string) => void;
}

export default function SelectModeModal({
  closeModal,
  setIsDraftModalOpen,
  setSelectedMode, // 부모로부터 받은 setSelectedMode
  selectedMode,
  setHeaderText,
}: ModalProps) {
  const [selectedModeState, setSelectedModeState] = useState(
    selectedMode === "모드선택" ? "RANDOM" : selectedMode
  ); // 로컬 상태로 초기 설정
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
    setIsTransitioning(true);
    setTimeout(() => {
      setSelectedModeState(mode); // 로컬 상태 업데이트
      setIsTransitioning(false);
    }, 300); // 애니메이션 시간
  };

  const handleConfirmClick = () => {
    alert(`${selectedModeState} 모드가 선택되었습니다.`);
    {
      setHeaderText &&
        setHeaderText(`${selectedModeState} 모드가 선택되었습니다.`);
    }
    setSelectedMode(selectedModeState);

    if (selectedModeState === "DRAFT") {
      setIsDraftModalOpen(true); // DRAFT 모드에서 DraftModal 열기
    }

    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center font-blackHanSans"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white border-[3px] border-[#C89B3C] p-8 rounded-lg w-full max-w-[450px] shadow-lg relative overflow-hidden">
        <div className="flex justify-center items-center space-x-4 mb-6">
          {["RANDOM", "DRAFT", "BALANCE"].map((mode) => (
            <button
              key={mode}
              onClick={() => handleModeClick(mode)} // 상태만 업데이트
              className={`px-2 py-2 w-[110px] text-lg font-bold border-[3px] border-[#C89B3C] transition-colors duration-300 rounded-lg ${
                selectedModeState === mode
                  ? "bg-[#C89B3C] text-[#ffffff]"
                  : "bg-[#ffffff] text-[#0F2041]"
              }`}
              style={{
                cursor: "pointer",
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* 이미지 전환 */}
        <div className="relative h-[300px] mb-4 flex items-center justify-center rounded-lg overflow-hidden">
          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}
          >
            <img
              src={modeImages[selectedModeState]}
              alt={`${selectedModeState} 모드 이미지`}
              className="max-h-full object-cover transition-opacity"
            />
          </div>
        </div>

        {/* 설명 텍스트 전환 */}
        <div
          className={`transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-center text-sm font-bold text-gray-700">
            {modeDescriptions[selectedModeState]}
          </p>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={handleConfirmClick} // 부모에 전달할 때 문자열을 직접 전달
            className="bg-[#F0E6D2] px-6 py-2 border-[3px] border-[#C89B3C] text-[#0F2041] rounded-lg transition-colors"
          >
            확인
          </button>
          <button
            onClick={closeModal}
            className="bg-[#F0E6D2] px-6 py-2 border-[3px] border-[#C89B3C] text-[#0F2041] rounded-lg transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}
