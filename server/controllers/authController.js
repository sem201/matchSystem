const axios = require("axios");
const User = require("../models/User");

const kakaoLogin = async (req, res) => {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send("인증 코드가 필요합니다");
  }

  try {
    // 카카오 API에 액세스 토큰 요청
    const tokenResponse = await axios.post(
      "https://kauth.kakao.com/oauth/token",
      null,
      {
        params: {
          grant_type: "authorization_code",
          client_id: process.env.CLIENT_ID,
          redirect_uri: process.env.REDIRECT_URI,
          code,
        },
      }
    );

    const access_token = tokenResponse.data.access_token;

    // 액세스 토큰을 사용하여 사용자 정보 요청
    const userResponse = await axios.get("https://kapi.kakao.com/v2/user/me", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const kakaoUser = userResponse.data;

    // 사용자 정보 DB에 저장 (혹은 업데이트)
    const user = await User.findOrCreate({
      where: { kakaoId: kakaoUser.id },
      defaults: {
        kakaoId: kakaoUser.id,
        email: kakaoUser.kakao_account.email,
        nickname: kakaoUser.properties.nickname,
        profileImage: kakaoUser.properties.profile_image,
      },
    });

    // 세션에 사용자 정보 저장
    req.session.user = {
      kakaoId: user.kakaoId,
      email: user.email,
      nickname: user.nickname,
      profileImage: user.profileImage,
    };

    // 로그인 후, 세션을 저장하고 리다이렉트
    res.json(user); // 사용자 정보를 리턴하거나, 다른 페이지로 리다이렉트
  } catch (error) {
    console.error(error);
    res.status(500).send("카카오 로그인 실패");
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send('로그아웃 처리 중 오류가 발생했습니다.');
    }
    res.clearCookie('connect.sid'); // 세션 쿠키도 지우기
    res.redirect('/'); // 로그아웃 후 리다이렉트
  });
};

module.exports = {
  kakaoLogin,logout
};
