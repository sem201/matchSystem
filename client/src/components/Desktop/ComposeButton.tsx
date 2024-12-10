import React from "react";

const ComposeButton = () => {
  return (
    <div className="font-blackHanSans flex flex-row items-center justify-center space-x-4 w-full my-[20px]">
      <button className="lg:w-[6vw] h-[4.5vh] bg-[#F0E6D2] rounded-full border-2 border-[#C8AA6E] text-[15px] text-[#0F2041] flex items-center justify-center font-black whitespace-nowrap">
        팀 구성
      </button>
    </div>
  );
};

export default ComposeButton;
