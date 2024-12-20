import React from "react";

interface ProfileProps {
  profileimg: string;
  gameName: string;
}

const ProfileHeader: React.FC<ProfileProps> = ({ profileimg, gameName}) => {
  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg font-blackHanSans ">
      <img
        src={profileimg}
        alt="Profile"
        className="w-40 h-40 rounded-full border-4 border-blue-500 transition-transform transform hover:scale-110"
      />
      <h1 className="text-2xl font-bold mt-4 opacity-0 animate-fadeIn animate-delay-500 font-blackHanSans overflow-hidden whitespace-nowrap">
        {gameName}
      </h1>
    </div>
  );
};

export default ProfileHeader;
