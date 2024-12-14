import express from 'express';
import { ChampionUpdate, profileUpdate } from  '../controllers/updateController.js'; // 확장자 .js 추가
import { userSearch } from '../controllers/userInfoController.js'

const router = express.Router();

// 챔피언 업데이트
router.post('/noobs/championUpadate', ChampionUpdate);
// 사용자 프로필 정보 업데이트
router.post('/noobs/profileUpadate', profileUpdate);

// 유저 검색 
router.get('/noobs/lolUser', userSearch);

// 유저추가 [ 최근에 같이한 플레이어 ]
// router.post('/noobs/lolUserAdd', userAdd);

export default router; // ESM 방식으로 export
