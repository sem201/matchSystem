import axios from "axios";

// 테스트 데이터 생성 함수 (예시)
const getTestData = async () => {
  return new Promise((resolve) => {
    const players = [
      { id: 1, gameName: "test1", RankScore: 10, position: "탑" },
      { id: 2, gameName: "test2", RankScore: 15, position: "탑" },
      { id: 3, gameName: "test3", RankScore: 20, position: "정글" },
      { id: 4, gameName: "test4", RankScore: 18, position: "정글" },
      { id: 5, gameName: "test5", RankScore: 12, position: "미드" },
      { id: 6, gameName: "test6", RankScore: 22, position: "미드" },
      { id: 7, gameName: "test7", RankScore: 14, position: "원딜" },
      { id: 8, gameName: "test8", RankScore: 17, position: "원딜" },
      { id: 9, gameName: "test9", RankScore: 13, position: "서폿" },
      { id: 10, gameName: "test10", RankScore: 19, position: "서폿" }
    ];

    setTimeout(() => resolve(players), 1000);  // 1초 후 데이터를 반환
  });
};

// 랜덤 팀 분배

const generateRandTeam = (players) => {
  // 포지션별 그룹화
  const positions = {
    탑 : [],
    정글 : [],
    미드 : [],
    원딜 : [],
    서폿 : []
  };

  // 플레이어 포지션 분류
  players.forEach(player => {
    positions[player.position].push(player);
  });

  // 두팀으로 분류
  const readTeam = [];
  const blueTeam = [];

  // 각 포지션별 무작위로 팀배정
  Object.keys(positions).forEach(position => {
    const playerinPosition = positions[position];

    // 랜덤하게 2명씩 뽑아서 팀배정
    while (playerinPosition.length) {
      const randomPlayer1 = playerinPosition.splice(Math.floor(Math.random() * playerinPosition.length), 1)[0];
      const randomPlayer2 = playerinPosition.splice(Math.floor(Math.random() * playerinPosition.length), 1)[0];

      readTeam.push(randomPlayer1);
      blueTeam.push(randomPlayer2);
    }
  });
  return { readTeam,blueTeam };
};

const randTeam = async (req, res) => {
  const { mode } = req.body;  // mode 값 가져오기
  console.log("Received mode:", mode);

  try {
    // mode가 'rand'일 경우, 랜덤 팀을 생성하는 로직 실행
    if (mode === "rand") {
      // 비동기적으로 테스트 데이터를 가져오는 함수 호출
      const players = await getTestData();
      console.log("Generated players:", players);

      const { readTeam, blueTeam } = generateRandTeam(players);

      // 응답으로 생성된 플레이어 목록 반환
      return res.status(200).json({ message: "랜덤 팀 생성 완료", readTeam, blueTeam });
    } else {
      return res.status(400).json({ message: "유효하지 않은 모드" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

export { randTeam };
