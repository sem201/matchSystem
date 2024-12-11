import React, { useState } from "react";

interface DraftModalProps {
  closeModal: () => void;
}

const DraftModal = ({ closeModal }: DraftModalProps) => {
  const [selectedTeam, setSelectedTeam] = useState<string | null>(null); // 선택된 팀
  const [redTeamLeader, setRedTeamLeader] = useState<string | null>(null); // 레드팀 팀장
  const [blueTeamLeader, setBlueTeamLeader] = useState<string | null>(null); // 블루팀 팀장
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // 드롭다운 상태

  // 임시 팀원 데이터
  const teamMembers = [
    "홍길동",
    "김철수",
    "이영희",
    "박민수",
    "최지현",
    "정은지",
    "한동훈",
    "강호동",
    "유재석",
    "신동엽",
  ];

  const handleTeamSelect = (team: string) => {
    setSelectedTeam(team);
    setIsDropdownOpen(true); // 드롭다운 열기
  };

  const handleLeaderSelect = (leader: string) => {
    if (selectedTeam === "RED TEAM") {
      setRedTeamLeader(leader); // 레드팀 팀장 설정
    } else if (selectedTeam === "BLUE TEAM") {
      setBlueTeamLeader(leader); // 블루팀 팀장 설정
    }
    setIsDropdownOpen(false); // 드롭다운 닫기
  };

  const handleConfirm = () => {
    console.log(`RED TEAM 팀장: ${redTeamLeader || "미정"}`);
    console.log(`BLUE TEAM 팀장: ${blueTeamLeader || "미정"}`);
    closeModal(); // 확인 버튼 클릭 시 모달 닫기
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div
        className="bg-white p-8 rounded-lg w-[100%] max-w-[400px] shadow-lg border-4"
        style={{ borderColor: "#C89B3C" }}
      >
        <p
          className="text-center mb-7 font-bold text-lg whitespace-nowrap font-blackHanSans"
          style={{ fontFamily: "Arial, sans-serif", color: "#0F2041" }}
        >
          팀장을 뽑아주세요.
        </p>
        {/* 팀 선택 버튼 */}
        <div className="flex justify-between gap-4 mb-4 font-blackHanSans">
          <button
            onClick={() => handleTeamSelect("RED TEAM")}
            className={`w-[200px] py-2 rounded-lg ${
              selectedTeam === "RED TEAM"
                ? "bg-[#8A2922] text-white"
                : "bg-[#F0E6D2] text-[#0F2041]"
            } border-[#C89B3C] border-2`}
          >
            RED TEAM
          </button>
          <button
            onClick={() => handleTeamSelect("BLUE TEAM")}
            className={`w-[200px] py-2 rounded-lg ${
              selectedTeam === "BLUE TEAM"
                ? "bg-[#004a82] text-white"
                : "bg-[#F0E6D2] text-[#0F2041]"
            } border-[#C89B3C] border-2`}
          >
            BLUE TEAM
          </button>
        </div>

        {/* 드롭다운 리스트 */}
        {isDropdownOpen && (
          <div className="mt-4 border-2 border-[#C89B3C] rounded-lg p-4 bg-[#F9F5EB]">
            <div className="grid grid-cols-2 gap-4">
              {teamMembers.map((member) => {
                // 스타일 설정
                const isRedLeader = redTeamLeader === member;
                const isBlueLeader = blueTeamLeader === member;

                return (
                  <button
                    key={member}
                    onClick={() => handleLeaderSelect(member)}
                    className={`py-2 px-4 rounded-lg border-[#C89B3C] border-2 ${
                      isRedLeader
                        ? "bg-[#8A2922] text-white cursor-not-allowed"
                        : isBlueLeader
                        ? "bg-[#004a82] text-white cursor-not-allowed"
                        : "bg-[#F0E6D2] text-[#0F2041] hover:bg-[#C89B3C] hover:text-white"
                    }`}
                    disabled={isRedLeader || isBlueLeader}
                  >
                    {member}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 선택된 팀장 표시 */}
        <div className="text-center text-lg my-4">
          {redTeamLeader && (
            <p className="font-bold text-[#8A2922]">
              {redTeamLeader}님이 RED TEAM 팀장입니다.
            </p>
          )}
          {blueTeamLeader && (
            <p className="font-bold text-[#004a82]">
              {blueTeamLeader}님이 BLUE TEAM 팀장입니다.
            </p>
          )}
        </div>

        {/* 확인 및 닫기 버튼 */}
        <div className="flex justify-center gap-4 mt-10 font-blackHanSans">
          <button
            onClick={handleConfirm}
            className={`px-7 py-2 ${
              redTeamLeader && blueTeamLeader
                ? "bg-[#F0E6D2] text-[#0F2041] font-bold hover:bg-[#A87F2D]"
                : "bg-[#C89B3C] text-white font-bold cursor-not-allowed"
            } border-2 border-[#C89B3C] rounded-full`}
            disabled={!redTeamLeader || !blueTeamLeader}
          >
            확인
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
  );
};

export default DraftModal;
