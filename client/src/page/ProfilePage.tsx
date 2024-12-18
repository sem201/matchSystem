// ProfilePage.tsx
import React from "react";
import { useLocation } from "react-router-dom";
import Menu from "../components/Profile/menu";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileCharts from "../components/Profile/ProfileCharts";
import ProfileHistory from "../components/Profile/ProfileHistory";
import RankCard from "../components/Profile/RankCard"; // RankCard 컴포넌트 가져오기
import Position from "../components/Profile/Position";
import BackImg from "../assets/bg_img.jpg";
import tierImgD from "../assets/modeGif/Rank=Diamond.png";
import tierImgG from "../assets/modeGif/Rank=Grandmaster.png";

const ProfilePage: React.FC = () => {
  const location = useLocation();
  const user_id = location.state.user_id;
  console.log(user_id);
  return (
    <div
      className="bg-cover bg-center text-white min-h-screen p-6 flex justify-center"
      style={{ backgroundImage: `url(${BackImg})` }}
    >
      <div className="w-full max-w-6xl relative">
        {/* 메뉴 영역 */}
        <div className="fixed top-0 left-0 w-full bg-gray-800 bg-opacity-90 z-50 py-4">
          <Menu />
        </div>

        {/* 헤더 영역 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-24">
          {/* 왼쪽 카드 */}
          <RankCard
            left={{
              title: "개인랭",
              rank: "DIAMOND VI",
              imgSrc: tierImgD,
            }}
            right={{
              title: "자유랭",
              rank: "GRANDMASTER I",
              imgSrc: tierImgG,
            }}
          />

          {/* 중앙 영역 */}
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between border-4 border-[rgb(200, 155, 60)]">
            <div className="text-center text-2xl font-bold w-full font-blackHanSans">
              소환사 정보
            </div>
            <ProfileHeader />
          </div>

          {/* 오른쪽 영역 */}
          <Position title="소환사의 선호 포지션" data={[10, 5, 4, 2, 1]} />
        </div>

        {/* 중간 영역 */}
        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          {/* 왼쪽 카드 */}
          <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between sm:w-1/3 border-4 border-[rgb(200, 155, 60)]">
            <ProfileStats />
          </div>

          {/* 오른쪽 카드들 위아래로 */}
          <div className="flex flex-col sm:w-2/3 gap-4">
            <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between min-h-[300px] border-4 border-[rgb(200, 155, 60)]">
              <ProfileCharts />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg flex flex-col justify-between min-h[300px] border-4 border-[rgb(200, 155, 60)]">
              <ProfileHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
