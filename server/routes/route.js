import express from 'express';
import { ChampionUpdate, profileUpdate } from  '../controllers/updateController.js'; // 확장자 .js 추가
import { userSerach } from '../controllers/userInfoController.js'

const router = express.Router();

// 챔피언 업데이트
router.post('/noobs/championUpadate', ChampionUpdate);
// 사용자 프로필 정보 업데이트
router.post('/noobs/profileUpadate', profileUpdate);

// 유저 검색 
router.get('/noobs/lolUser', userSerach);


export default router; // ESM 방식으로 export
