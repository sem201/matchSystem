import React from "react";
import ProfileImg from "../../assets/modeGif/24.png";

const ProfileHeader: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-gray-800 text-white p-6 rounded-lg font-blackHanSans ">
      <img
        src={ProfileImg}
        alt="Profile"
        className="w-24 h-24 rounded-full border-4 border-blue-500 transition-transform transform hover:scale-110"
      />
      <h1 className="text-2xl font-bold mt-4 opacity-0 animate-fadeIn animate-delay-500">
        Hide on bush#kr1
      </h1>
    </div>
  );
};

export default ProfileHeader;
