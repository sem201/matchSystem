import express from 'express';
import { kakaoLogin, logout } from '../controllers/authController.js';

const router = express.Router();

// 카카오 로그인 처리
router.get('/user/kakao/login', kakaoLogin);

// 로그아웃
router.get('/logout', logout);

export default router;
