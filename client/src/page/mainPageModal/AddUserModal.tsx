import React, { useState } from "react";

// ModalProps 수정
interface ModalProps {
  closeModal: () => void;
  isModalOpen: boolean; // isModalOpen 속성 추가
}



export default function AddUserModal({ isModalOpen, closeModal }: ModalProps) {
  const [nicknameTag, setNicknameTag] = useState<string>(""); // 입력값
  const [userAdded, setUserAdded] = useState<boolean | null>(null); // 검색 결과

  // 추가 버튼 활성화 상태
  const isAddEnabled = userAdded === true;

  const handleAddUser = () => {
    const trimmedInput = nicknameTag.trim(); // 공백 제거
    const nicknameTagRegex = /^[^\s#]+#[A-Za-z0-9]+$/; // 정규식: 닉네임#태그 형태
    if (!nicknameTagRegex.test(trimmedInput)) {
      setUserAdded(false); // 유효성 실패
      return;
    }
  
    // 입력값 분리
    const [nickname, tag] = trimmedInput.split("#");
  
    // 태그를 대문자로 변환
    const normalizedTag = tag.toUpperCase();
  
    // 유저 추가 로직 (닉네임은 그대로, 태그는 대문자로 비교)
    if (nickname === "example" && normalizedTag === "KR1234") {
      setUserAdded(true); // 유저 검색 성공
    } else {
      setUserAdded(false); // 검색 실패
    }
  };

  return (
    isModalOpen && (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
        onClick={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      >
        <div
          className="bg-white p-8 rounded-lg w-[450px] shadow-lg border-4"
          style={{ borderColor: "#C89B3C" }}
        >
          <p
            className="text-center mb-4 font-bold text-lg"
            style={{ fontFamily: "Arial, sans-serif", color: "#0F2041", }}
            
          >
            추가할 유저의 닉네임과 태그를 입력하세요.
          </p>

          {/* Input + 검색 버튼 */}
          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              value={nicknameTag}
              onChange={(e) => setNicknameTag(e.target.value)}
              placeholder="예: 닉네임#KR1234"
              className="flex-1 px-4 py-2 border border-[#C89B3C] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C89B3C]"
            />
            <button
              onClick={handleAddUser}
              className="px-4 py-2 bg-[#C89B3C] text-white rounded-lg hover:bg-[#A87F2D]"
            >
              검색
            </button>
          </div>

          {/* 추가 완료/실패 문구 */}
          {userAdded === true && (
            <span className="block text-green-500 text-sm mb-4 text-center">
              유저 검색 완료
            </span>
          )}
          {userAdded === false && (
            <span className="block text-red-500 text-sm mb-4 text-center">
              닉네임과 태그를 확인해주세요!
            </span>
          )}

          {/* 닫기 + 추가 버튼 */}
          <div className="flex justify-center gap-4 mt-10">
            <button
              disabled={!isAddEnabled} // 검색 성공 시 활성화
              className={`px-7 py-2 ${
                isAddEnabled
                  ? "bg-[#F0E6D2] text-[#0F2041] font-bold hover:bg-[#A87F2D]"
                  : "bg-gray-300 text-gray-500  font-bold cursor-not-allowed"
              } border-2 border-[#C89B3C] rounded-full`}
            >
              추가
            </button>
            <button
              onClick={closeModal}
              className="px-7 py-2 bg-[#F0E6D2] text-[#0F2041] font-bold border-2 border-[#C89B3C] rounded-full hover:bg-[#e8d9c3]"
            >
              닫기
            </button>
          </div>
        </div>
      </div>
    )
  );
}
