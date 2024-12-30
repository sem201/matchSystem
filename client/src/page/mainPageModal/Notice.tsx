import React from "react";

interface ModalProps {
  isOpen: boolean; // 모달의 열림 상태를 결정
  closeModal: () => void; // 모달을 닫는 함수
}

const Notice: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  if (!isOpen) return null; // 모달이 닫혀 있으면 아무것도 렌더링하지 않음

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={closeModal} // 모달 바깥쪽 클릭 시 닫힘
    >
      <div
        className="bg-white border-2 border-[#C8AA6E] rounded-lg p-6 w-[90%] max-w-[900px] h-[80vh]  relative"
        onClick={(e) => e.stopPropagation()} // 내부 클릭 시 닫히지 않도록 방지
      >
        {/* 닫기 버튼 */}
        <button
          className="absolute top-2 right-2 text-[#C8AA6E] font-bold"
          onClick={closeModal}
        >
          X
        </button>
        {/* 모달 제목 및 내용 */}
        <h2 className="text-[#C8AA6E] text-5xl font-extrabold mb-6">
          공지사항
        </h2>
        <p className="text-[#0F2041] text-xl font-roboto font-extrabold" >
          웹페이지 운영 기간 : 2025/01 ~ 2025/12
        </p>
        <br></br>
        <p className="text-[#0F2041] text-2xl font-roboto font-extrabold">
          최신 업데이트 내용 및 버그 수정 사항을 확인하세요.
        </p>{" "}
        <br></br>
        <hr />
        <p className="text-[#0F2041] text-xl font-roboto font-extrabold">
          안녕하세요 저는 이 프로그램의 개발자입니다. 본 서비스는 약 1년간 운영될
          예정입니다. 유지하는 비용(도메인,서버) 1인으로 관리하는 개인 프로젝트인
          만큼 이 기간 동안 계속 업데이트하고 유지 관리하겠습니다. 1년 후에는
          피드백을 바탕으로 서비스를 개선하고 더욱 탄탄한 솔루션을 제공할
          계획입니다.
        </p>
        <br></br>
        <p className="text-[#0F2041] text-xl font-roboto font-extrabold">
          본 프로그램은 사용자 편의성을 염두에 두고 설계되었으나 일부 ​​제한
          사항이 있을 수 있음을 인정합니다. 이해와 양해를 부탁드립니다. 문제가
          발생하거나 새로운 기능에 대한 제안이 있거나 버그나 오류를 발견 또는
          피드백 주시면 감사하겠습니다.
        </p>
        <br></br>

      </div>
    </div>
  );
};

export default Notice;
