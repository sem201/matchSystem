import React, { useState } from "react";

// ModalProps 수정
interface ModalProps {
  closeModal: () => void;
  isModalOpen: boolean; // isModalOpen 속성 추가
}

export default function HowToUseModal({ closeModal }: ModalProps) {
  const images = [
    "/src/assets/modeGif/modeselect.png", // 예시 이미지 경로
    "/src/assets/modeGif/sugar.jpg",
    "/src/assets/modeGif/tower.jpg",
    "/src/assets/modeGif/sunrise.jpg",
    "/src/assets/modeGif/rain.png",
  ];

  const descriptions = [
    "내전 인원 추가 버튼을 눌러 닉네임과 태그라인을 입력하고, 추가 버튼을 클릭하여 내전에 참여할 유저의 정보를 불러옵니다.",
    <div className="space-y-4">
      <p>
        <strong className="font-bold">RANDOM :</strong> 팀을 무작위로 섞습니다.
      </p>
      <p>
        <strong className="font-bold">DRAFT :</strong> 팀장 2명 선정 후, 라인별
        2명씩 보여주고 팀장이 팀원을 선택합니다.
      </p>
      <p>
        <strong className="font-bold">BALANCE :</strong> 알고리즘을 통해 팀 선정
      </p>
      <p>(요인: 티어, 주라인과 일치하는지, 원챔인지 등등...)</p>
    </div>,
    "총 10명의 인원을 추가해야 합니다. \n참가 유저의 주라인을 선택해야 하며, 탑/미드/정글/\n원딜/서폿 라인별로 각각 2명이 존재해야합니다.",
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
        <div className="text-[#0F2041] mb-4 text-sm whitespace-pre-wrap">
          {descriptions[currentIndex]}
        </div>

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
            <span>{`< ${currentIndex + 1} >`}</span>
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
            className="bg-white hover:bg-[#F5F5F5] p-1 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#000000"
            >
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
