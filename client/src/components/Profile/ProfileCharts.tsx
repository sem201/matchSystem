import React from "react";
import champUrl from "../../assets/modeGif/Aatrox.png";

// 챔피언 정보 인터페이스
interface Champion {
  name: string;
  imageUrl: string; // 챔피언 이미지 URL
  gamesPlayed: number;
  rating: number;
}

const RecentHistory: React.FC = () => {
  // 예시 데이터 (실제 데이터는 API나 다른 방식으로 제공될 수 있음)
  const champions: Champion[] = [
    { name: "아트록스", imageUrl: champUrl, gamesPlayed: 5, rating: 2.75 },
    { name: "리신", imageUrl: champUrl, gamesPlayed: 5, rating: 3.2 },
    { name: "럭스", imageUrl: champUrl, gamesPlayed: 5, rating: 4.8 },
    { name: "이즈리얼", imageUrl: champUrl, gamesPlayed: 5, rating: 5.0 },
    { name: "카르마", imageUrl: champUrl, gamesPlayed: 5, rating: 3.9 },
    { name: "우르곳", imageUrl: champUrl, gamesPlayed: 5, rating: 4.9 },
    { name: "케이틀린", imageUrl: champUrl, gamesPlayed: 5, rating: 1.9 },
    { name: "아칼리", imageUrl: champUrl, gamesPlayed: 5, rating: 4.5 },
    { name: "자야", imageUrl: champUrl, gamesPlayed: 5, rating: 5.8 },
    { name: "코그모", imageUrl: champUrl, gamesPlayed: 5, rating: 7.2 },
  ];

  // 데이터를 두 번 반복해 무한 슬라이드 효과를 줍니다.
  const duplicatedChampions = [...champions, ...champions];

  return (
    <div className="recent-history bg-gray-800 text-white p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4 font-blackHanSans">모스트 TOP10</h2>

      {/* 슬라이드 컨테이너 */}
      <div className="slider-container overflow-hidden relative">
        <div
          className="slider flex"
          style={{
            animation: "slide 30s linear infinite", // 슬라이드 애니메이션
          }}
        >
          {duplicatedChampions.map((champion, index) => (
            <div
              key={index}
              className="champion-item w-48 h-64 flex-shrink-0 text-center mx-2 bg-gray-700 rounded-lg p-4"
            >
              <div className="champion-image rounded-full w-24 h-24 mx-auto mb-2 overflow-hidden">
                <img
                  src={champion.imageUrl}
                  alt={champion.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold mb-1 font-blackHanSans">
                {champion.name}
              </h3>
              <p className="text-sx text-white-400 mb-1 font-blackHanSans">
                5게임
              </p>
              <p
                className={`text-lg font-blackHanSans ${
                  champion.rating >= 5
                    ? "text-yellow-400"
                    : champion.rating >= 4
                    ? "text-blue-400"
                    : champion.rating >= 3
                    ? "text-green-400"
                    : "text-gray-400"
                }`}
              >
                평점: {champion.rating}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* 슬라이드 애니메이션 CSS */}
      <style>{`
        @keyframes slide {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default RecentHistory;
