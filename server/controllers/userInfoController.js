import axios from "axios";
import dotenv from "dotenv";
import NoobsUserInfo from "../models/Noobs_user_info.js";
import NoobsMasterChamp from "../models/Noobs_master_champ.js";
import NoobsRecentFriend from "../models/Noobs_Recent_Friend.js";
import Champion from "../models/Champion.js";
import Profile from "../models/Profile.js";
import RankInfo from "../models/RankInfo.js";
import TierScore from "../models/TierScore.js";
import GameRank from "../models/Game_Ranking.js";
import moment from "moment-timezone";

// 'Asia/Seoul' 시간대로 현재 시간을 가져옴
const seoulTime = moment().tz("Asia/Seoul").format("YYYY-MM-DD HH:mm:ss");

dotenv.config(); // .env 파일 로드

const userSearch = async (req, res) => {
  let { userid, tagLine } = req.query;

  // 앞 뒤 공백제거
  userid = userid.trim();
  tagLine = tagLine.trim();

  // 필수 값 검증
  if (!userid || !tagLine) {
    return res.status(400).json({ message: "소환사 명을 입력하세요" });
  }

  // API 키 확인
  if (!process.env.RIOT_API_KEY) {
    return res.status(500).json({ message: "API KEY 를 확인하세요" });
  }

  const headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept-Language": "ko-KR",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": process.env.RIOT_API_KEY,
  };

  try {
    // 1. DB에서 사용자 검색
    const user = await NoobsUserInfo.findOne({
      where: { gameName: userid, tagLine },
    });

    if (user) {
      console.log("사용자 데이터가 DB에 존재합니다.");
      return res.status(200).json({ message: "사용자 db 요청 완료" });
    }

    // 2. 사용자 정보 API 요청
    const accountUrl = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(
      userid
    )}/${encodeURIComponent(tagLine)}`;
    const accountResponse = await axios.get(accountUrl, { headers });
    const { puuid, gameName, tagLine: retrievedTagLine } = accountResponse.data;

    // 3. 소환사 정보 API 요청
    const summonerUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
    const summonerResponse = await axios.get(summonerUrl, { headers });
    const {
      id: secretId,
      profileIconId,
      summonerLevel,
    } = summonerResponse.data;

    // 4. 랭크 정보 API 요청
    const leagueUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${secretId}`;
    const leagueResponse = await axios.get(leagueUrl, { headers });
    console.log(leagueResponse.data);

    const rankedSoloData =
      leagueResponse.data.find(
        (entry) => entry.queueType === "RANKED_SOLO_5x5"
      ) || {};

    const {
      queueType: latedQueueType = "개인/2인 랭크 게임",
      tier = "Unranked",
      rank = "Unranked",
      wins = "nodata",
      losses = "nodata",
    } = rankedSoloData;
    const winRate =
      wins !== "nodata"
        ? ((wins / (wins + losses)) * 100).toFixed(1)
        : "nodata";

    // 5. 모스트 챔피언 데이터 API 요청
    const masteryUrl = `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=5`;
    const masteryResponse = await axios.get(masteryUrl, { headers });
    const masterData = masteryResponse.data;

    // 6. DB에 사용자 데이터 저장
    const newUser = await NoobsUserInfo.create({
      puuid,
      gameName,
      tagLine: retrievedTagLine,
      secretId,
      profileIconId,
      summonerLevel,
      latedQueueType,
      tier,
      rank,
      wins,
      losses,
      winRate,
    });

    // gameRank에 랭킹정보 저장하기
    // NoobsuserInfo -> id 값 -> gameId에 저장
    const leagueData = leagueResponse.data.map((item) => {
      const queueTypeT =
        item.queueType === "RANKED_FLEX_SR"
          ? "자유랭"
          : item.queueType === "RANKED_SOLO_5x5"
          ? "개인/2인랭"
          : "Unranked";
      const tier = item.tier || "Unranked";
      const rank = item.rank || "Unranked";

      const leaguePoints = item.leaguePoints || 0;
      const wins = item.wins || 0;
      const losses = item.losses || 0;

      return {
        queueTypeT,
        tier,
        rank,
        summonerId: item.summonerId,
        leaguePoints,
        wins,
        losses,
      };
    });

    const gameRankData = leagueData.map((item) => ({
      game_id: newUser.id,
      queueType: item.queueTypeT,
      tier: item.tier,
      rank: item.rank,
      LP: item.leaguePoints,
      wins: item.wins,
      losses: item.losses,
      winRate:
        item.wins && item.losses
          ? (item.wins / (item.wins + item.losses)) * 100
          : 0, // winRate 계산
      createdAt: new Date(),
      updatedAt: new Date(),
    }));

    await GameRank.bulkCreate(gameRankData);

    // 7. DB에 모스트 챔피언 데이터 저장
    const mostChampExists = await NoobsMasterChamp.findOne({
      where: { user_id: newUser.id },
    });

    if (!mostChampExists) {
      for (const { championId, championLevel, championPoints } of masterData) {
        await NoobsMasterChamp.create({
          user_id: newUser.id,
          gameName: gameName,
          championId,
          championLevel,
          championPoints,
        });
      }
    }

    return res.status(200).json({ message: "사용자 데이터 등록 완료" });
  } catch (error) {
    console.error("API 요청 또는 DB 처리 중 에러 발생:", error);
    const status = error.response?.status || 500;

    const errorMessages = {
      404: "등록되지 않은 소환사 입니다.",
      403: "API 키 만료.",
      500: "서버 내부 오류가 발생했습니다.",
    };

    return res
      .status(status)
      .json({ message: errorMessages[status] || "알 수 없는 오류" });
  }
};

// 사용자 정보 갱신
const friendUserBrUpdate = async (req, res) => {
  const { user_id } = req.body;

  const headers = {
    "User-Agent": "Mozilla/5.0",
    "Accept-Language": "ko-KR",
    "Accept-Charset": "application/x-www-form-urlencoded; charset=UTF-8",
    Origin: "https://developer.riotgames.com",
    "X-Riot-Token": process.env.RIOT_API_KEY,
  };

  try {
    const userInfo = await NoobsUserInfo.findOne({
      where: {
        id: user_id,
      },
    });

    if (!userInfo) {
      return res.status(404).json({ message: "사용자가 존재하지 않습니다." });
    }

    const userPuuid = userInfo.puuid;

    // 게임이름/태그이름
    const accountUrl = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-puuid/${userPuuid}`;
    const accountResponse = await axios.get(accountUrl, { headers });
    const { gameName, tagLine } = accountResponse.data;

    // 소환사 정보
    const summonerUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${userPuuid}`;
    const summonerResponse = await axios.get(summonerUrl, { headers });
    const {
      id: secretId,
      profileIconId,
      summonerLevel,
    } = summonerResponse.data;

    // 소환사 랭크 정보
    const leagueUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${secretId}`;
    const leagueResponse = await axios.get(leagueUrl, { headers });
    const rankedSoloData =
      leagueResponse.data.find(
        (entry) => entry.queueType === "RANKED_SOLO_5x5"
      ) || {};

    const {
      tier = "Unranked",
      rank = "Unranked",
      wins = "nodata",
      losses = "nodata",
    } = rankedSoloData;
    const winRate =
      wins !== "nodata"
        ? ((wins / (wins + losses)) * 100).toFixed(1)
        : "nodata";

    const leagueData = leagueResponse.data.map((item) => {
      // queueType에 따라 랭크 종류 수정
      const queueType =
        item.queueType === "RANKED_FLEX_SR"
          ? "자유랭"
          : item.queueType === "RANKED_SOLO_5x5"
          ? "개인/2인랭"
          : "기타";

      // tier와 rank가 없으면 Unranked로 처리
      const tier = item.tier || "Unranked";
      const rank = item.rank || "Unranked";

      // leaguePoints, wins, losses 값이 없다면 0으로 초기화
      const leaguePoints = item.leaguePoints || 0;
      const wins = item.wins || 0;
      const losses = item.losses || 0;

      return {
        queueType,
        tier,
        rank,
        summonerId: item.summonerId,
        leaguePoints,
        wins,
        losses,
        winRate: wins && losses ? (wins / (wins + losses)) * 100 : 0, // winRate 계산
      };
    });

    // 모스트 챔피언 데이터
    const masteryUrl = `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${userPuuid}/top?count=5`;
    const masteryResponse = await axios.get(masteryUrl, { headers });
    const masterData = masteryResponse.data;

    // 랭크정보 업데이트
    for (const rankData of leagueData) {
      const existingData = await GameRank.findOne({
        where: {
          game_id: user_id,
          queueType: rankData.queueType,
        },
      });

      // 기존 데이터 존재하면 업데이트
      if (existingData) {
        await existingData.update({
          tier: rankData.tier,
          rank: rankData.rank,
          LP: rankData.leaguePoints,
          wins: rankData.wins,
          losses: rankData.losses,
          winRate: rankData.winRate,
          updatedAt: new Date(),
        })
      } else {
        // 없으면 새로 추가
        await GameRank.create({
          game_id : user_id,
          queueType : rankData.queueType,
          tier : rankData.tier,
          rank : rankData.rank,
          LP : rankData.leaguePoints,
          wins : rankData.wins,
          losses : rankData.losses,
          winRate : rankData.winRate,
          createdAt : new Date(),
          updatedAt : new Date(),
        })
      }
    }

    // 사용자 정보 업데이트
    const resultUpdateUser = await NoobsUserInfo.update(
      {
        gameName,
        tagLine,
        secretId,
        profileIconId,
        summonerLevel,
        tier,
        rank,
        wins,
        winRate,
        updatedAt: seoulTime,
      },
      { where: { id: user_id } }
    );

    console.log(resultUpdateUser);

    // 같이한 사용자 테이블 업데이트
    await NoobsRecentFriend.update(
    {
      gameName,
      tagLine,
      profileIconId,
      tier,
      rank,
      wins,
      losses,
      winRate,
      updatedAt : new Date(),
    },
    {
      where : {
        puuid : userPuuid,
      }
    }
  )

    if (resultUpdateUser[0] === 0) {
      return res.status(400).json({ message: "업데이트 실패" });
    }

    // 모스트 챔피언 업데이트
    const updatePromises = masterData.map(
      ({ championId, championLevel, championPoints }) => {
        return NoobsMasterChamp.update(
          {
            championLevel,
            championPoints,
            updatedAt: new Date(),
          },
          {
            where: {
              user_id: user_id,
              championId,
            },
          }
        );
      }
    );

    await Promise.all(updatePromises);

    return res.status(200).json({ message: "소환사 업데이트 완료" });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
  }
};

// 같이 한 사용자 추가 로직
const userAdd = async (req, res) => {
  const { userid, tagLine } = req.body;
  const FRIEND_MAX = 15; // 값 수정해서 최대 추가 유저 조정가능

  if (!userid || !tagLine) {
    return res.status(400).json({ message: "소환사 명을 입력하세요" });
  }
  // 사용자 추가 제한 걸기
  try {
    const userFriendCount = await NoobsRecentFriend.count({
      where: {
        user_id: req.session.user.id,
      },
    });

    if (userFriendCount >= FRIEND_MAX) {
      return res.status(400).json({ message: "더이상 추가 할 수 없습니다." });
    }

    // 해당 사용자 db에서 검색
    // DB에서 사용자 검색
    const userSearchData = await NoobsUserInfo.findOne({
      where: {
        gameName: userid,
        tagLine: tagLine,
      },
    });

    console.log(userSearchData);

    if (!userSearchData) {
      res.status(404).json({ message: "해당 사용자를 찾을 수 없습니다. " });
    } else {
      // 추가되어있는 유저인지 확인
      // DB에서 사용자 검색
      const userFriendData = await NoobsRecentFriend.findOne({
        where: {
          user_id: req.session.user.id,
          gameName: userid,
          tagLine: tagLine,
        },
      });

      if (!userFriendData) {
        // DB 저장: 사용자 정보
        const user = await NoobsRecentFriend.create({
          user_id: req.session.user.id, // 세션에서 가져온 user_id 값
          puuid : userSearchData.puuid,
          gameName: userSearchData.gameName,
          tagLine: userSearchData.tagLine,
          profileIconId: userSearchData.profileIconId,
          tier: userSearchData.tier,
          rank: userSearchData.rank,
          wins: userSearchData.wins,
          losses: userSearchData.losses,
          winRate: userSearchData.winRate,
        });
        return res.status(200).json({ message: "사용자 추가 완료!" });
      } else {
        return res.status(400).json({ message: "이미 추가된 유저입니다. " });
      }
    }
  } catch (error) {
    console.error("DB 처리 중 에러 발생:", error);
    return res.status(500).json({ message: "서버 오류" });
  }
};

// 같이한 사용자 불러오기
const friendUserBr = async (req, res) => {
  console.log("서버쪽입니다.", req.session);
  console.log("서버쪽입니다.", req.session.id);

  try {
    // 사용자 목록 조회
    const friendUser = await NoobsRecentFriend.findAll({
      where: {
        user_id: req.session.user.id,
      },
    });

    // 친구가 없을 경우
    if (!friendUser || friendUser.length === 0) {
      return res
        .status(404)
        .json({ message: "같이한 사용자 목록이 없습니다." });
    }

    // 각 친구에 대해 추가 정보 조회
    for (const friend of friendUser) {
      // 챔피언 데이터 조회
      const champData = await NoobsMasterChamp.findAll({
        where: {
          gameName: friend.gameName,
        },
        limit: 3, // 최대 3개의 챔피언 데이터만 가져옴
      });

      // 소환사 업데이트용 id 가져오기
      const updateUser = await NoobsUserInfo.findOne({
        where: {
          gameName: friend.gameName,
        },
      });

      const updateId = updateUser.dataValues.id;

      // 소환사 프로필 정보 조회
      const profileData = await Profile.findOne({
        where: {
          Profile_key: friend.profileIconId,
        },
      });

      // 소환사 티어이미지 조회
      const userRankImg = await RankInfo.findOne({
        where: {
          rank: friend.tier,
        },
      });

      // 티어별 점수 조회
      const userRankScore = await TierScore.findOne({
        where: {
          rank: friend.tier,
          tier: friend.rank,
        },
      });

      // 포지션 빈값 추가
      const userPosition = "";

      friend.dataValues.position = userPosition;
      friend.dataValues.updateId = updateId;
      friend.dataValues.tierImg = userRankImg;
      friend.dataValues.tierScore = userRankScore;
      friend.dataValues.profileInfo = profileData;
      friend.dataValues.MostChamp = champData;
      // 친구 객체에 추가된 데이터 삽입

      if (champData.length > 0) {
        for (let i = 0; i < friend.dataValues.MostChamp.length; i++) {
          const champ = friend.dataValues.MostChamp[i];
          // 가장 많이 사용한 챔피언 데이터 조회
          const champDataMost = await Champion.findOne({
            where: {
              champKey: champ.dataValues.championId,
            },
          });
          champ.dataValues.champInfo = champDataMost;
        }
      }
    }

    // 최종 JSON 응답 보내기
    return res.status(200).json({
      message: "data success",
      data: friendUser, // 친구 데이터
    });
  } catch (error) {
    console.error("API 요청 또는 DB 처리 중 에러 발생:", error);
    return res.status(500).json({
      message: "서버 내부 오류가 발생했습니다.",
    });
  }
};

// 같이한 사용자 삭제하기
const friendUserBrDel = async (req, res) => {
  const { user_id } = req.body;
  console.log(user_id);

  try {
    const delUser = await NoobsRecentFriend.destroy({
      where: {
        user_id: req.session.user.id,
        id: user_id,
      },
    });

    console.log(delUser);

    if (delUser == 0) {
      return res.status(404).json({ message: "사용자가 존재하지 않습니다." });
    } else {
      return res.status(200).json({ message: "삭제 완료" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "서버 내부 오류가 발생했습니다." });
  }
};

export {
  userSearch,
  userAdd,
  friendUserBr,
  friendUserBrUpdate,
  friendUserBrDel,
};
