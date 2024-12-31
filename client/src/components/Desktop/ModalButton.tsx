import React from "react";
import AddUserModal from "../../page/mainPageModal/AddUserModal";
import HowToUseModal from "../../page/mainPageModal/HowToUseModal";
import SelectModeModal from "../../page/mainPageModal/SelectModeModal";
import Notice from "../../page/mainPageModal/Notice";
import Swal from "sweetalert2";
import axios from 'axios';
import apiCall from "../../Api/Api";

interface ButtonProps {
  setHeaderText: (text: string) => void;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
  selectedMode: string;
  modalType: string;
  isDraftModalOpen: boolean;
  setIsUserAdded: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: (type: string) => void;
  closeModal: () => void;
}

const handleUserDelete = async () => {
  Swal.fire({
    title: "정말 회원탈퇴를 하시겠습니까?",
    text: "탈퇴 시 모든 데이터가 삭제됩니다.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "확인",
    cancelButtonText: "취소",
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        // Assuming the API URL is correctly set in the environment variables
        const response = await apiCall(`${import.meta.env.VITE_BACK_API_URL}/noobs/userDel`, "post", {});
        console.log(response.data);
        Swal.fire({
          title: '회원탈퇴',
          text: response.data.data,  // 응답받은 'data' 필드 내용 출력
          icon: 'success'
        });
        if (response.data.redirectUrl) {
          window.location.href = response.data.redirectUrl;  
        }
      } catch (error: unknown) {
        // 'error'가 AxiosError 타입일 경우
        if (axios.isAxiosError(error)) {
          console.error("회원탈퇴 실패:", error.response?.data);
          Swal.fire({
            title: '회원탈퇴 실패',
            text: error.response ? error.response.data : error.message,
            icon: 'error'
          });
        } else {
          console.error("알 수 없는 에러 발생:", error);
          Swal.fire({
            title: '알 수 없는 에러 발생',
            text: error instanceof Error ? error.message : '알 수 없는 에러',
            icon: 'error'
          });
        }
      }
    }
  });
};


const Button: React.FC<ButtonProps> = ({
  setHeaderText,
  setIsDraftModalOpen,
  setSelectedMode,
  selectedMode,
  modalType,
  setIsUserAdded,
  openModal,
  closeModal,
}) => {
  return (
    <div className="lg:absolute lg:bottom-[140px] lg:right-[0px] flex flex-col items-center justify-start xs:mt-7 xs:mb-7 lg:mt-3 lg:mb-3 lg:mx-auto lg:left-0 lg:right-0 h-full min-h-[50px]">
      <div className="font-blackHanSans mb-2 flex flex-row items-center justify-center space-x-4 w-full">

        <button
          className="lg:w-[8vw] h-[6vh] bg-[#F0E6D2] rounded-lg border-2 border-[#C8AA6E] text-[22px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("notic")}
        >
          공지사항
        </button>
        <button
              className="lg:w-[8vw] h-[6vh] bg-[#F0E6D2] rounded-lg border-2 border-[#C8AA6E] text-[22px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
              onClick={() => window.open("https://open.kakao.com/o/s05RZU7g", "_blank")}
            >
              문의요청
        </button>
        <button
          className="lg:w-[8vw] h-[6vh] bg-[#F0E6D2] rounded-lg border-2 border-[#C8AA6E] text-[22px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={handleUserDelete}
        >
          회원탈퇴
        </button>

      
      </div>

      <div className="font-blackHanSans flex flex-row items-center justify-center space-x-4 w-full">

        <button
          className="lg:w-[8vw] h-[6vh] bg-[#F0E6D2] rounded-lg border-2 border-[#C8AA6E] text-[22px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("addUser")}
        >
          인원추가
        </button>
        <button
          className="lg:w-[8vw] h-[6vh] bg-[#F0E6D2] rounded-lg border-2 border-[#C8AA6E] text-[22px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("selectMode")}
        >
          모드선택
        </button>
        <button
          className="lg:w-[8vw] h-[6vh] bg-[#F0E6D2] rounded-lg border-2 border-[#C8AA6E] text-[22px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap"
          onClick={() => openModal("howToUse")}
        >
          사용법
        </button>

        {/* 모달들 */}
        {modalType === "notic" && (
          <Notice
            isOpen={modalType === "notic"} // 모달 열림 여부
            closeModal={closeModal} // 모달 닫기 함수
          />
        )}
        {modalType === "addUser" && (
          <AddUserModal
            isModalOpen={modalType !== null}
            closeModal={closeModal}
            setIsUserAdded={setIsUserAdded}
          />
        )}
        {modalType === "selectMode" && (
          <SelectModeModal
            closeModal={closeModal}
            selectedMode={selectedMode}
            setSelectedMode={setSelectedMode} // 선택된 모드 처리 함수 전달
            setIsDraftModalOpen={setIsDraftModalOpen} // DraftModal 상태 관리 함수 전달
            setHeaderText={setHeaderText}
          />
        )}
        {modalType === "howToUse" && (
          <HowToUseModal
            isModalOpen={modalType !== null}
            closeModal={closeModal}
          />
        )}
      </div>

      
    </div>
  );
};

export default Button;
