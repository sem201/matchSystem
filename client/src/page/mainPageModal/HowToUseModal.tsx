import React, { useState } from "react";

// ModalProps 수정
interface ModalProps {
  closeModal: () => void;
  isModalOpen: boolean; // isModalOpen 속성 추가
}

export default function HowToUseModal({ closeModal }: ModalProps) {
  const images = [
    "/src/assets/modeGif/salt.jpg", // 예시 이미지 경로
    "/src/assets/modeGif/sugar.jpg",
    "/src/assets/modeGif/tower.jpg",
    "/src/assets/modeGif/sunrise.jpg",
    "/src/assets/modeGif/rain.png",
  ];

  const descriptions = [
    "이 이미지는 첫 번째 사용법을 설명합니다. 이 이미지는 첫 번째 사용법을 설명합니다. 이 이미지는 첫 번째 사용법을 설명합니다.",
    "이 이미지는 두 번째 사용법을 설명합니다.",
    "이 이미지는 세 번째 사용법을 설명합니다.",
    "이 이미지는 네 번째 사용법을 설명합니다.",
    "이 이미지는 다섯 번째 사용법을 설명합니다.",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white p-8 rounded-lg w-[450px] shadow-lg relative border-[3px] border-[#C89B3C]">
        <h2 className="text-lg font-bold mb-4">사용법</h2>

        {/* 이미지 슬라이더 */}
        <div className="relative mb-6">
          <img
            src={images[currentIndex]}
            alt={`사용법 이미지 ${currentIndex + 1}`}
            className="w-full h-auto rounded-lg"
          />
        </div>

        {/* 설명 텍스트 */}
        <p className="text-[#0F2041] mb-4 text-sm">{descriptions[currentIndex]}</p>

        {/* 이미지 이동 버튼과 페이지 번호 위치 조정 */}
        <div className="flex justify-between items-center mb-4">
          <button
            onClick={handlePrev}
            className="bg-black text-white rounded-full p-2"
          >
            &#8592;
          </button>

          {/* 페이지 번호 */}
          <div className="text-lg text-[#0F2041]">
            <span>{`<${currentIndex + 1}>`}</span>
          </div>

          <button
            onClick={handleNext}
            className="bg-black text-white rounded-full p-2"
          >
            &#8594;
          </button>
        </div>

        {/* 닫기 버튼을 오른쪽 끝에 배치 */}
        <div className="absolute top-4 right-4">
          <button
            onClick={closeModal}
            className="px-4 py-2 border-[3px] border-[#C89B3C] text-[#0F2041] rounded-lg hover:bg-[#F5F5F5]"
          >
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}