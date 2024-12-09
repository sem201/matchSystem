import axios from "axios";
import dotenv from 'dotenv';

dotenv.config(); // .env 파일을 로드

const userSerach = async (req, res) => {
    const { userid, tagLine } = req.query;

    console.log(userid);
    const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(userid)}/${encodeURIComponent(tagLine)}`;
    console.log(url);  
    if(!userid) {
        return res.status(400).json({ message : 'userid is required '});
    }

    try {
        // api 요청
        // encodeURIComponent 사용자가 공백이나 특수문자 입력하면 그에 맞는 인코딩


     const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://developer.riotgames.com',
        'X-Riot-Token': process.env.RIOT_API_KEY, // env에서 API 키 가져오기
      };

      const response = await axios.get(url, { headers });

      const { puuid, gameName, tagLine } = response.data;

      // 2차 API 요청
      const userInfo_url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`
      console.log(userInfo_url);

      const userInfo_response = await axios.get(userInfo_url, { headers });

      const { id, profileIconId, summonerLevel } = userInfo_response.data;
      
      res.json({
        puuid,
        gameName,
        tagLine,
        summonerInfo : {
            id,
            profileIconId,
            summonerLevel,
        },
      });

    } catch ( error ) {
        console.error('riot api error' , error);
        res.status(500).json({ message : 'faild to data', error : error.message });
    }

}


export { userSerach };