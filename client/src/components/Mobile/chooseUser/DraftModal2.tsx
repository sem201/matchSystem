import React, { useState, useEffect } from "react";

interface DraftModal2Props {
  closeModal: () => void;
}

const DraftModal2 = ({ closeModal }: DraftModal2Props) => {
  const [teamMembers, setTeamMembers] = useState<string[]>([
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
  ]);
  const [draftedMembers, setDraftedMembers] = useState<string[]>([]); // 이미 선택된 멤버
  const [currentTeamMember, setCurrentTeamMember] = useState<string | null>(
    null
  ); // 현재 보여줄 팀원
  const [nextTeamLeader, setNextTeamLeader] = useState<string | null>(null); // 다음 팀장

  const redTeamLeader = "홍길동"; // 예시, 실제로는 부모 컴포넌트에서 전달받을 수 있음
  const blueTeamLeader = "김철수"; // 예시

  // 현재 선택된 팀장
  const [currentLeader, setCurrentLeader] = useState<string>(redTeamLeader);

  const getRandomPair = () => {
    // 남은 팀원 중에서 두 명 랜덤으로 선택
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

    // 팀장이 바뀌도록 설정 (홍길동 -> 김철수 -> 홍길동 순으로)
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

  useEffect(() => {
    // 모든 팀원이 선택되었으면 모달을 자동으로 닫음
    if (draftedMembers.length >= 10) {
      setTimeout(() => {
        closeModal();
      }, 1000); // 1초 후 모달 닫기
    }
  }, [draftedMembers, closeModal]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center flex-col"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <h1 className="text-center text-xl mb-4">
        {currentLeader ? `${currentLeader}님 선택` : `${blueTeamLeader}님 선택`}
      </h1>

      {/* 팀원 두 명을 랜덤으로 보여주고, 선택하는 버튼 */}
      {currentTeamMember && nextTeamLeader && draftedMembers.length < 10 && (
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

      {/* 선택 후 다음 팀장에게 넘어가기 */}
      <div className="text-center my-4">
        {draftedMembers.length >= 10 ? (
          <p>모든 팀원이 선택되었습니다!</p>
        ) : (
          <p>
            {draftedMembers.length}명 선택됨, 남은 팀원:{" "}
            {teamMembers.length - draftedMembers.length}
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
