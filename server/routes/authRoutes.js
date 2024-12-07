const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 카카오 로그인 처리
router.get('/user/kakao/login', authController.kakaoLogin);

// 로그아웃
router.get('/logout', authController.logout);


module.exports = router;
