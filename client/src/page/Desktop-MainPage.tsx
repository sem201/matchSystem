import Team from "../components/Desktop/Team";
import Header from "../components/Desktop/Header";
import Menu from "../components/Desktop/Menu";
import { useState } from "react";

const DesktopMainPage = () => {
  const [headerText, setHeaderText] = useState<string>("모드를 선택해주세요");
  return (
    <div className="lg:w-[100vw] lg:h-[100vh]">
      <Header text={headerText} />
      <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 gap-6 lg:w-[100%] lg:h-[70%] px-[50px]">
        <Team />
        <Menu setHeaderText={setHeaderText} />
      </div>
    </div>
  );
};

export default DesktopMainPage;
