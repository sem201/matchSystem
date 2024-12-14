import axios from "axios";
import dotenv from 'dotenv';
import NoobsUserInfo from "../models/Noobs_user_info.js";
import NoobsMasterChamp from "../models/Noobs_master_champ.js";
import NoobsRecentFriend from "../models/Noobs_Recent_Friend.js";

dotenv.config(); // .env 파일 로드

const userSearch = async (req, res) => {
    const { userid, tagLine } = req.query;

    console.log(userid);
    console.log(tagLine);

    if (!userid || !tagLine) {
        return res.status(400).json({ message: '소환사 명을 입력하세요' });
    }

    if (!process.env.RIOT_API_KEY) {
        return res.status(500).json({ message: 'API KEY 를 확인하세요' });
    }

    const headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
        'Accept-Charset': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Origin': 'https://developer.riotgames.com',
        'X-Riot-Token': process.env.RIOT_API_KEY, // env에서 API 키 가져오기
    };

    try {
        // DB에서 사용자 검색
        const userSearchData = await NoobsUserInfo.findOne({
            where: {
                gameName: userid,
                tagLine: tagLine,
            }
        });

        if (userSearchData) {
            console.log('사용자 데이터가 db에 존재합니다. db에서 데이터를 요청합니다.');
            return res.status(200).json({ message: '사용자 db 요청 완료', data: userSearchData });
        }
        // 1차 API 요청: 계정 정보 가져오기
        const url = `https://asia.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(userid)}/${encodeURIComponent(tagLine)}`;
        const response = await axios.get(url, { headers });
        console.log(response);
        const { puuid, gameName, tagLine: retrievedTagLine } = response.data;

        // 2차 API 요청: 소환사 정보 가져오기
        const userInfo_url = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${puuid}`;
        const userInfo_response = await axios.get(userInfo_url, { headers });
        const { id: secretId, profileIconId, summonerLevel } = userInfo_response.data;

        // 3차 API 요청: 솔로랭크 데이터 가져오기
        const userLeagueInfo_URL = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${secretId}`;
        const userLeague_Response = await axios.get(userLeagueInfo_URL, { headers });
        const rankedSoloData = userLeague_Response.data.find(
            (entry) => entry.queueType === 'RANKED_SOLO_5x5'
        );

        let latedQueueType = null;
        let tier = null;
        let rank = null;
        let wins = null;
        let losses = null;
        let winRate = null;

        if (rankedSoloData) {
            ({ queueType: latedQueueType, tier, rank, wins, losses } = rankedSoloData);
            winRate = ((wins / (wins + losses)) * 100).toFixed(1);
            latedQueueType = latedQueueType === "RANKED_SOLO_5x5" ? "개인/2인 랭크 게임" : latedQueueType;
        } else {
            console.log('솔로랭크 전적이 없습니다.');
        }

        // 4차 API 요청: 모스트 챔피언 데이터 가져오기
        const userMaster_Champ_URL = `https://kr.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top?count=5`;
        const userMaster_Response = await axios.get(userMaster_Champ_URL, { headers });
        const masterData = userMaster_Response.data;

        // DB 저장: 사용자 정보
        const user = await NoobsUserInfo.create({
            puuid,
            gameName,
            tagLine: retrievedTagLine,
            secretId,
            profileIconId,
            summonerLevel,
            latedQueueType,
            tier,
            rank,
            wins,
            losses,
            winRate,
        });

        const userId = user.id;

        if (userId) {
            // DB 저장: 모스트 챔피언 데이터
            for (const { championId, championLevel, championPoints } of masterData) {
                await NoobsMasterChamp.create({
                    user_id: userId,
                    championId,
                    championLevel,
                    championPoints,
                });
            }
        }

        res.status(200).json({
           message: '사용자 데이터 등록 완료',
           data : user,
        });

    } catch (error) {
        console.error('API 요청 또는 DB 처리 중 에러 발생:', error);

        if (error.response) {
            return res.status(error.response.status || 500).json({
                message: `API 요청 실패: ${error.response.data?.message || 'Unknown error'}`,
            });
        }

        res.status(500).json({ message: '서버 내부 오류가 발생했습니다.' });
    }
};

// 같이 한 사용자 추가 로직
const userAdd = async (req,res) => {
    const { userid, tagLine } = req.query;  
   

    console.log('세션 : ' , req.session);

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
            user_id: user_id,  // 세션에서 가져온 user_id 값
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


export { userSearch, userAdd };
