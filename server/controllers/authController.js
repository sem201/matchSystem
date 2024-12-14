import axios from 'axios';
import User from '../models/User.js';
import qs from 'qs';
import dotenv from 'dotenv'
import NoobsRecentFriend from "../models/Noobs_Recent_Friend.js";
import NoobsUserInfo from "../models/Noobs_user_info.js";

dotenv.config();

const kakaoLogin = async (req, res) => {
  const { code } = req.query;

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
          "Content-Type": "application/x-www-form-urlencoded",
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
    const [user, created] = await User.findOrCreate({
      where: { nickname: kakaoUser.properties.nickname },
      defaults: {
        profileImage: kakaoUser.properties.profile_image,
      },
    });

    
    // 세션에 사용자 정보 저장
    req.session.user = {
      id: user.id,
      nickname: user.nickname,
      profileImage: user.profileImage,
    };

    console.log("세션 저장:", req.session.user);

    // 로그인 후, 세션을 저장하고 리다이렉트
    res.redirect("http://127.0.0.1:5173/main");
  } catch (error) {
    console.error(error);
    res.status(500).send("카카오 로그인 실패");
    console.error("Error response:", error.response?.data || error.message);
  }
};

const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).send("로그아웃 처리 중 오류가 발생했습니다.");
    }
    res.clearCookie("connect.sid"); // 세션 쿠키도 지우기
    res.redirect("http://127.0.0.1:5173");
  });
};

// 같이 한 사용자 추가 로직
const userAdd = async (req,res) => {
  
  console.log(req.body);
  console.log(req.session);
  const { userid, tagLine } = req.body;  
  
  const user_id = req.session;

  if (!userid || !tagLine) {
      return res.status(400).json({ message: '소환사 명을 입력하세요' });
  }

  // 해당 사용자 db에서 검색
  try {
      // DB에서 사용자 검색
      const userSearchData = await NoobsUserInfo.findOne({
          where: {
              gameName: userid,
              tagLine: tagLine,
          }
      });

      if (!userSearchData) {
          res.status(404).json( { message : '해당 사용자를 찾을 수 없습니다. '});
      } else {

      // DB 저장: 사용자 정보
      const user = await NoobsRecentFriend.create({
          user_id: req.session.userid,  // 세션에서 가져온 user_id 값
          gameName: userSearchData.gameName,
          tagLine: userSearchData.tagLine,
          profileIconId: userSearchData.profileIconId,
          tier: userSearchData.tier,
          rank: userSearchData.rank,
          wins: userSearchData.wins,
          losses: userSearchData.losses,
          winRate: userSearchData.winRate,
      });
          return res.status(200).json({ userSearchData });
      }

  } catch (error) {
      console.error('DB 처리 중 에러 발생:', error);
      return res.status(500).json({ message: '서버 오류' });
  }
  
};




export { kakaoLogin, logout, userAdd };
