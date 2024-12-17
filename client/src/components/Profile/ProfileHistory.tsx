// components/RecentHistory.tsx
import React from "react";
import champUrl from '../../assets/modeGif/Aatrox.png';

const RecentHistory: React.FC = () => {
  // 모스트 챔피언 데이터 (예시)
  const champions = [
    {
      name: "아트록스",
      points: 1500,
      level: 7,
      rank: "S+",
      imageUrl: champUrl, // 챔피언 이미지 URL
      recentImages: [
        champUrl, 
        champUrl, 
        champUrl
      ],
    },
    {
      name: "아리",
      points: 1400,
      level: 6,
      rank: "S+",
      imageUrl: champUrl,
      recentImages: [
        champUrl, 
        champUrl, 
        champUrl
      ],
    },
    {
      name: "야스오",
      points: 1200,
      level: 8,
      rank: "S+",
      imageUrl: champUrl,
      recentImages: [
        champUrl, 
        champUrl, 
        champUrl
      ],
    },
    {
      name: "리신",
      points: 1100,
      level: 9,
      rank: "S+",
      imageUrl: champUrl,
      recentImages: [
        champUrl, 
        champUrl, 
        champUrl
      ],
    },
    {
      name: "제드",
      points: 1000,
      level: 5,
      rank: "Gold",
      imageUrl: champUrl,
      recentImages: [
        champUrl, 
        champUrl, 
        champUrl
      ],
    }
  ];

  return (
    <div className="recent-history p-6 bg-gray-800 text-white rounded-lg">
      <h2 className="text-2xl font-bold mb-6">숙련도 TOP5</h2>

      {/* 챔피언 정보 5개를 flex로 배치, 모바일에서는 1줄로 보여지도록 설정 */}
      <div className="champions-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {champions.map((champion, index) => (
          <div key={index} className="champion-card p-4 bg-gray-700 rounded-lg">
            {/* 챔피언 사진 원형으로 */}
            <div className="champion-image mb-4 w-24 h-24 rounded-full overflow-hidden mx-auto">
              <img src={champion.imageUrl} alt={champion.name} className="w-full h-full object-cover" />
            </div>

            {/* 챔피언 이름, 포인트, 레벨, 등급 */}
            <div className="champion-info text-center">
              <h3 className="text-lg font-bold">{champion.name}</h3>
              <p className="text-sm">점수 : {champion.points}</p>
              <p className="text-sm">레벨 : {champion.level}</p>
              <p className="text-sm">랭크 : {champion.rank}</p>
            </div>

            {/* 최근 이미지 3개 */}
            <div className="recent-images mt-4 gap-2 flex justify-between">
              {champion.recentImages.slice(0, 3).map((image, index) => (
                <div key={index} className="recent-image w-12 h-12 overflow-hidden rounded-lg">
                  <img src={image} alt={`Recent ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentHistory;
