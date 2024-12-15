import axios from "axios";

//테스트 데이터 생성 함수 (예시)
//테스트용
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

const balanceTeams = (players) => {
  // 포지션별 점수 -> 정글-미드-원딜-탑-서폿
  const positionPoints = { "정글": 5, "미드": 4, "원딜": 3, "탑": 2, "서폿": 1 };

  // 포지션별 그룹화
  const positionPlayers = {
    "정글": [],
    "미드": [],
    "원딜": [],
    "탑": [],
    "서폿": [],
  };

  // 선수 데이터 새로 복사하고 랜덤 섞기
  const shuffledPlayers = [...players]; // 원본을 변경하지 않기 위해 복사
  shufflePlayers(shuffledPlayers);

  // 복사된 선수들을 포지션별로 분류
  shuffledPlayers.forEach(player => {
    positionPlayers[player.position].push(player);
  });

  // 각 포지션별로 점수 추가
  for (const position of Object.keys(positionPoints)) {
    const playersInPosition = positionPlayers[position];

    // rankScore가 20 이상인 선수만 점수 추가
    playersInPosition.forEach(player => {
      if (player.RankScore >= 20) {
        player.RankScore += positionPoints[position];
      }
    });
  }

  // 점수 기준으로 내림차순 정렬
  shuffledPlayers.sort((a, b) => b.RankScore - a.RankScore);

  // 두 팀으로 균등 분배 (각 팀에 5명씩)
  const teams = [{ players: [], totalRankScore: 0 }, { players: [], totalRankScore: 0 }];
  
  // 포지션 순서대로 팀에 분배
  const positionOrder = ["탑", "정글", "미드", "원딜", "서폿"];
  
  // 각 포지션에서 한 명씩 배정
  positionOrder.forEach(position => {
    const team1Player = positionPlayers[position].shift();
    const team2Player = positionPlayers[position].shift();

    // 점수가 적은 팀에 배정
    if (team1Player) {
      teams[0].players.push(team1Player);
      teams[0].totalRankScore += team1Player.RankScore;
    }
    if (team2Player) {
      teams[1].players.push(team2Player);
      teams[1].totalRankScore += team2Player.RankScore;
    }
  });

  // 나머지 선수들 균등 배정
  let remainingPlayers = [].concat(...Object.values(positionPlayers));
  remainingPlayers = shufflePlayers(remainingPlayers);

  // 남은 선수들을 순차적으로 팀에 추가
  remainingPlayers.forEach(player => {
    if (teams[0].players.length < 5) {
      teams[0].players.push(player);
      teams[0].totalRankScore += player.RankScore;
    } else if (teams[1].players.length < 5) {
      teams[1].players.push(player);
      teams[1].totalRankScore += player.RankScore;
    }
  });

  // 클라이언트로 전달할 때 탑 -> 정글 -> 미드 -> 원딜 -> 서폿 순으로 정렬
  const sortPositionClient = (team) => {
    const positionOrder = ["탑", "정글", "미드", "원딜", "서폿"];
    return positionOrder.map(position => {
      return team.players.filter(player => player.position === position);
    }).flat();
  };

  // 각 팀의 포지션 순서대로 정렬 후 전달
  const blueTeam = sortPositionClient(teams[0]);
  const redTeam = sortPositionClient(teams[1]);

  return {
    blueTeam: {
      players: blueTeam,
      totalRankScore: teams[0].totalRankScore
    },
    redTeam: {
      players: redTeam,
      totalRankScore: teams[1].totalRankScore
    },
  };
};

// 선수 랜덤 섞기
const shufflePlayers = (arr) => {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // 요소를 교환
  }
  return arr;
};


const randTeam = async (req, res) => {
  const { mode, players } = req.body;  
  console.log("Received mode:", mode);

  try {
    if (mode === "rand") {
      // 비동기적으로 테스트 데이터를 가져오는 함수 호출
      //const players = await getTestData(); // 테스트용 데이터
      console.log("Generated players:", players);

      const { readTeam, blueTeam } = generateRandTeam(players);

      // 응답으로 생성된 플레이어 목록 반환
      return res.status(200).json({ message: "랜덤 팀 생성 완료", readTeam, blueTeam });
    } else if (mode == 'balance') {

      // 샘플 테스트용 데이터 입니다. 
      // const players = await getTestData(); 
      const { redTeam, blueTeam } = balanceTeams(players); 
      return res.status(200).json({ message: "밸런스 팀 생성 완료", redTeam, blueTeam });
    } 
    
    else {
      return res.status(400).json({ message: "유효하지 않은 모드" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "서버 오류", error: error.message });
  }
};

export { randTeam };
