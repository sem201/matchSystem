import express from 'express';
import { kakaoLogin, logout,userAdd } from '../controllers/authController.js';


const router = express.Router();

// 카카오 로그인 처리
router.get('/user/kakao/login', kakaoLogin);

// 로그아웃
router.get('/logout', logout);

// 유저추가 [ 최근에 같이한 플레이어 ]
router.post('/noobs/lolUserAdd', userAdd);

export default router;
