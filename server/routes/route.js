import express from 'express';
import { ChampionUpdate, profileUpdate } from  '../controllers/updateController.js'; // 확장자 .js 추가

const router = express.Router();

// 챔피언 업데이트
router.post('/noobs/championUpadate', ChampionUpdate);
// 사용자 프로필 정보 업데이트
router.post('/noobs/profileUpadate', profileUpdate);



export default router; // ESM 방식으로 export
