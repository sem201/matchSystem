import React, { useState } from "react";


// ModalProps 수정
interface ModalProps {
  closeModal: () => void;
  isModalOpen: boolean; // isModalOpen 속성 추가
}

export default function SelectModeModal({ closeModal }: ModalProps) {
  const [selectedMode, setSelectedMode] = useState("RANDOM"); // 기본값은 RANDOM
  const [isTransitioning, setIsTransitioning] = useState(false); // 애니메이션 상태

  // 모드 설명 객체
  const modeDescriptions: Record<string, string> = {
    RANDOM: "RANDOM 모드는 랜덤으로 팀을 구성합니다.",
    DRAFT: "DRAFT 모드는 플레이어가 번갈아 가며 팀을 선택합니다.",
    BALANCE: "BALANCE 모드는 밸런스를 맞춰 팀을 자동으로 구성합니다.",
  };

  // 모드 이미지 객체
  const modeImages: Record<string, string> = {
    RANDOM: "/src/assets/modeGif/random.gif",
    DRAFT: "/src/assets/modeGif/draft.gif",
    BALANCE: "/src/assets/modeGif/justice.gif",
  };

  // 모드 선택 핸들러
  const handleModeClick = (mode: string) => {
    if (mode !== selectedMode) {
      setIsTransitioning(true); // 애니메이션 시작
      setTimeout(() => {
        setSelectedMode(mode); // 모드 변경
        setIsTransitioning(false); // 애니메이션 종료
      }, 300); // 애니메이션 지속 시간과 동일하게 설정 (300ms)
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white border-[3px] border-[#C89B3C] p-8 rounded-lg w-[450px] shadow-lg relative overflow-hidden">
        {/* 상단 모드 선택 */}
        <div className="flex justify-center items-center space-x-4 mb-6">
          {["RANDOM", "DRAFT", "BALANCE"].map((mode) => (
            <button
              key={mode}
              onClick={() => handleModeClick(mode)}
              className={`px-4 py-2 font-bold text-lg border-[3px] border-[#C89B3C] transition-all duration-300 ${
                selectedMode === mode ? "text-[#0F2041]" : "text-gray-600"
              } focus:outline-none`}
              style={{
                cursor: "pointer",
                borderRadius: "8px",
              }}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* 이미지 컨테이너 */}
        <div
          className="relative h-[200px] mb-4 flex items-center justify-center  rounded-lg"
        >
          {/* 이미지 전환 애니메이션 */}
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

        {/* 설명 전환 애니메이션 */}
        <div
          className={`transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        >
          <p className="text-center text-sm font-bold text-gray-700">{modeDescriptions[selectedMode]}</p>
        </div>

        {/* 확인/취소 버튼 */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => {
              alert(`${selectedMode} 모드가 선택되었습니다.`);
              closeModal();
            }}
            className="px-6 py-2 border-[3px] border-[#C89B3C] text-[#0F2041] rounded-lg  transition-colors"
          >
            확인
          </button>
          <button
            onClick={closeModal}
            className="px-6 py-2 border-[3px] border-[#C89B3C] text-[#0F2041] rounded-lg  transition-colors"
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

