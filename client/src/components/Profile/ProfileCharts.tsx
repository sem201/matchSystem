// components/RecentHistory.tsx
import React from "react";
import champUrl from '../../assets/modeGif/Aatrox.png';
// 챔피언 정보 인터페이스
interface Champion {
  name: string;
  imageUrl: string;  // 챔피언 이미지 URL
  gamesPlayed: number;
  rating: number;
}

const RecentHistory: React.FC = () => {
  // 예시 데이터 (실제 데이터는 API나 다른 방식으로 제공될 수 있음)
  const champions: Champion[] = [
    { name: "아트록스", imageUrl: champUrl, gamesPlayed: 5, rating: 3.75 },
    { name: "리신", imageUrl: champUrl, gamesPlayed: 5, rating: 4.2 },
    { name: "럭스", imageUrl: champUrl, gamesPlayed: 5, rating: 3.8 },
    { name: "이즈리얼", imageUrl: champUrl, gamesPlayed: 5, rating: 4.0 },
    { name: "아리", imageUrl: champUrl, gamesPlayed: 5, rating: 3.9 },
  ];

  return (
    <div className="recent-history bg-gray-800 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">모스트 TOP5</h2>
      
      {/* 챔피언 목록 */}
      <div className="champion-list grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {champions.map((champion, index) => (
          <div key={index} className="champion-item text-center">
            <div className="champion-image rounded-full w-24 h-24 mx-auto mb-2 overflow-hidden">
              <img src={champion.imageUrl} alt={champion.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-lg font-semibold mb-1">{champion.name}</h3>
            <p className="text-sm text-gray-400 mb-1">5게임</p>
            <p className="text-sm text-yellow-400">평점: {champion.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentHistory;
