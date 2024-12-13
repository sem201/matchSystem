import React, { useState, useEffect } from "react";

interface DraftModal2Props {
  closeModal: () => void;
  teamMembers: string[];
  redTeamLeader: string; // 부모 컴포넌트에서 받은 redTeamLeader
  blueTeamLeader: string; // 부모 컴포넌트에서 받은 blueTeamLeader
}

const DraftModal2 = ({
  closeModal,
  teamMembers,
  redTeamLeader,
  blueTeamLeader,
}: DraftModal2Props) => {
  const [draftedMembers, setDraftedMembers] = useState<string[]>([]); // 이미 선택된 멤버
  const [currentTeamMember, setCurrentTeamMember] = useState<string | null>(
    null
  ); // 현재 보여줄 팀원
  const [nextTeamLeader, setNextTeamLeader] = useState<string | null>(null); // 다음 팀장

  const [currentLeader, setCurrentLeader] = useState<string>(redTeamLeader);

  // 팀장 제외한 실제 선택해야 할 팀원 수 계산
  const availableMembersCount = teamMembers.filter(
    (member) => member !== redTeamLeader && member !== blueTeamLeader
  ).length;

  const getRandomPair = () => {
    // 남은 팀원 중에서 두 명 랜덤으로 선택 (팀장 제외)
    const remainingMembers = teamMembers.filter(
      (member) =>
        !draftedMembers.includes(member) &&
        member !== redTeamLeader &&
        member !== blueTeamLeader
    );
    const randomPair = [];

    for (let i = 0; i < 2; i++) {
      const randomIndex = Math.floor(Math.random() * remainingMembers.length);
      randomPair.push(remainingMembers[randomIndex]);
      remainingMembers.splice(randomIndex, 1);
    }

    return randomPair;
  };

  const handleSelectMember = (member: string) => {
    setDraftedMembers([...draftedMembers, member]);

    // 팀에 추가된 멤버를 제거하고, 그 후 두 명을 다시 랜덤으로 선택
    const pair = getRandomPair();
    setCurrentTeamMember(pair[0]); // 첫 번째 팀원
    setNextTeamLeader(pair[1]); // 두 번째 팀원

    // 팀장이 바뀌도록 설정 (현재 팀장이 바뀌도록)
    setCurrentLeader((prevLeader) =>
      prevLeader === redTeamLeader ? blueTeamLeader : redTeamLeader
    );
  };

  useEffect(() => {
    // 처음 랜덤 두 명을 선택
    const initialPair = getRandomPair();
    setCurrentTeamMember(initialPair[0]);
    setNextTeamLeader(initialPair[1]);
  }, [teamMembers, draftedMembers]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-90 flex justify-center items-center flex-col"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      {/* "ooo님 선택" 부분 */}
      {draftedMembers.length < availableMembersCount &&
        draftedMembers.length < 7 && (
          <h1 className="text-center text-xl mb-4">
            {currentLeader
              ? `${currentLeader}님 선택`
              : `${blueTeamLeader}님 선택`}
          </h1>
        )}

      {/* 팀원 두 명을 랜덤으로 보여주고, 선택하는 버튼 */}
      {currentTeamMember &&
        nextTeamLeader &&
        draftedMembers.length < availableMembersCount && (
          <div className="flex flex-col gap-4">
            {/* 세로로 버튼을 배치 */}
            <button
              onClick={() => handleSelectMember(currentTeamMember)}
              className="py-2 px-4 bg-[#F0E6D2] text-[#0F2041] hover:bg-[#C89B3C] hover:text-white rounded-lg"
            >
              {currentTeamMember}
            </button>
            <button
              onClick={() => handleSelectMember(nextTeamLeader)}
              className="py-2 px-4 bg-[#F0E6D2] text-[#0F2041] hover:bg-[#C89B3C] hover:text-white rounded-lg"
            >
              {nextTeamLeader}
            </button>
          </div>
        )}

      {/* 선택 후 메시지 */}
      <div className="text-center my-4">
        {draftedMembers.length >= 7 ? (
          <p className="text-2xl font-bold">팀원이 모두 선택되었습니다!</p> // 팀장이 제외된 후 멤버들이 모두 선택된 상태
        ) : (
          <p>
            {draftedMembers.length}명 선택됨, 남은 팀원:{" "}
            {availableMembersCount - draftedMembers.length}
          </p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-10">
        <button
          onClick={closeModal}
          className="px-7 py-2 bg-[#F0E6D2] text-[#0F2041] font-bold border-2 border-[#C89B3C] rounded-full hover:bg-[#e8d9c3]"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

export default DraftModal2;
