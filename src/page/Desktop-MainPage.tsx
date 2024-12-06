import React from "react";
import Team from "../components/Desktop/Team";
import Header from "../components/Desktop/Header";

const DesktopMainPage = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <div className="px-[50px]">
        <Header />
        <Team />
      </div>
    </div>
  );
};

export default DesktopMainPage;
