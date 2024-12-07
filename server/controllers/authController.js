const axios = require("axios");
const User = require("../models/User");
const qs = require('qs');
require("dotenv").config();

const kakaoLogin = async (req, res) => {
  const { code } = req.query;

  console.log("code : " , code);

  if (!code) {
    return res.status(400).send("인증 코드가 필요합니다");
  }

  try {
    // 카카오 API에 액세스 토큰 요청
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      qs.stringify({
        grant_type: "authorization_code",
        client_id: process.env.CLIENT_ID,
        redirect_uri: process.env.REDIRECT_URI,
        code: code, // 인증 코드
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

  
    const access_token = tokenResponse.data.access_token;

    console.log("token", tokenResponse);
    console.log("access_token", access_token);

    console.log(`Authorization header: Bearer ${access_token}`);
    // 액세스 토큰을 사용하여 사용자 정보 요청
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const kakaoUser = userResponse.data;
   
    // 사용자 정보 DB에 저장 (혹은 업데이트)
    const user = await User.findOrCreate({
      where: { nickname: kakaoUser.properties.nickname }, 
      defaults: {
        profileImage: kakaoUser.properties.profile_image,  
      },
    });

    // 세션에 사용자 정보 저장
    req.session.user = {
      nickname: user.nickname,
      profileImage: user.profileImage,
    };

    // 로그인 후, 세션을 저장하고 리다이렉트
    res.redirect('http://localhost:5173/main');
  } catch (error) {
    console.error(error);
    res.status(500).send("카카오 로그인 실패");
    console.error('Error response:', error.response?.data || error.message);
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('로그아웃 처리 중 오류가 발생했습니다.');
    }
    res.clearCookie('connect.sid'); // 세션 쿠키도 지우기
    res.redirect('http://localhost:5173');
  });
};

module.exports = {
  kakaoLogin,logout
};
