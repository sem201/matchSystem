import express from 'express';
import { ChampionUpdate, profileUpdate } from  '../controllers/updateController.js'; // 확장자 .js 추가
import { userSearch, userAdd, friendUserBr  } from '../controllers/userInfoController.js';
import { randTeam  } from '../controllers/modeTeamController.js';

const router = express.Router();

// 챔피언 업데이트
router.post('/noobs/championUpadate', ChampionUpdate);
// 사용자 프로필 정보 업데이트
router.post('/noobs/profileUpadate', profileUpdate);

// 유저 검색 
router.get('/noobs/lolUser', userSearch);

// 유저추가 [ 최근에 같이한 플레이어 ]
router.post('/noobs/lolUserAdd', userAdd);

// 추가한 유저들 가져오기
router.get('/noobs/friendUserBr', friendUserBr);

// 랜덤 팀섞기
router.post('/noobs/randTeam' , randTeam);

export default router; // ESM 방식으로 export
