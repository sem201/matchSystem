import express from "express";
import {
  ChampionUpdate,
  profileUpdate,
} from "../controllers/updateController.js"; // 확장자 .js 추가
import {
  userSearch,
  userAdd,
  friendUserBr,
  friendUserBrUpdate,
  friendUserBrDel,
  UserDetilsInfo,
  nobsinfo
} from "../controllers/userInfoController.js";
import { TeamMach, sampleData } from "../controllers/modeTeamController.js";
import rateLimit from "express-rate-limit";
import { kakaoLogin, logout, passlogin,userDel } from '../controllers/authController.js';



const router = express.Router();

// 카카오 로그인 처리
router.get('/user/kakao/login', kakaoLogin);

// 로그아웃
router.get('/logout', logout);
// 샘플계정 
router.get('/passlogin', passlogin);

// Noobs 사용자
router.get('/noobs/nobsinfo', nobsinfo);

// 챔피언 업데이트
router.post("/noobs/championUpadate", ChampionUpdate);
// 사용자 프로필 정보 업데이트
router.post("/noobs/profileUpadate", profileUpdate);

// 유저 검색
router.get("/noobs/lolUser", userSearch);

// 유저추가 [ 최근에 같이한 플레이어 ]
router.post("/noobs/lolUserAdd", userAdd);

// 추가한 유저들 가져오기
router.get("/noobs/friendUserBr", friendUserBr);

// 모드별 팀섞기
router.post("/noobs/TeamMach", TeamMach);

// 사용자 정보 업데이트
router.post("/noobs/friendUserBrUpdate", friendUserBrUpdate);

// 유저 삭제 [ 초근에 같이한 플에이어 ]
router.post("/noobs/friendUserBrDel", friendUserBrDel);

// 유저 포로필정보 요청
router.post("/noobs/UserDetilsInfo", UserDetilsInfo);


router.delete("/noobs/userDel", userDel);

router.get("/sampleData", sampleData);



export default router; // ESM 방식으로 export
