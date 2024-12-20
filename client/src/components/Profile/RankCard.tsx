import React from "react";

interface RankCardProps {
  title: string;
  rank: string;
  score: string;
  imgSrc: string;
}

const RankCard: React.FC<{
  left: RankCardProps;
  right: RankCardProps;
}> = ({ left, right }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg grid grid-cols-2 gap-2 min-h-64 border-4 border-[rgb(200, 155, 60)] bg-[rgb(28, 28, 28)]">
      {/* 타이틀 */}
      <div className="col-span-2 text-center text-xl font-bold mb-2 text-white font-blackHanSans">
        소환사 랭크 정보
      </div>

      {/* 왼쪽 영역 (개인랭) */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={left.imgSrc}
          alt="Rank Icon"
          className="w-50 h-50 max-w-50 max-h-50 mb-2 transition-transform transform hover:scale-105 hover:shadow-lg"
        />
        <div
          className={`text-center text-lx font-blackHanSans ${
            left.rank === "Unranked" ? "text-gray-500" : "text-white-500"
          }`}
        >
          {left.rank} {left.score}
        </div>
        <div className="text-center text-lg font-semibold text-white font-blackHanSans">
          {left.title}
        </div>
      </div>

      {/* 오른쪽 영역 (자유랭) */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={right.imgSrc}
          alt="Rank Icon"
          className="w-50 h-50 max-w-50 max-h-50 mb-2 transition-transform transform hover:scale-105 hover:shadow-lg"
        />
        <div className="text-center text-lx text-white-500 font-blackHanSans">
          {right.rank} {right.score}
        </div>
        <div className="text-center text-lg font-semibold text-white font-blackHanSans">
          {right.title}
        </div>
      </div>
    </div>
  );
};

export default RankCard;
