import { useEffect, useState } from "react";
import MobileMainpage from "./Mobile-Mainpage";
import DesktopMainPage from "./Desktop-MainPage";

import { User } from "../commonTypes";

export default function MainPage() {
  const [allUser, setAllUser] = useState<User[]>([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 700);

  const [modalType, setModalType] = useState<string | null>(null); // 현재 열리는 모달 타입

  // 화면 크기 변화에 따른 상태 업데이트
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 700);
    };

    // 이벤트 리스너 추가
    window.addEventListener("resize", handleResize);

    // 컴포넌트가 언마운트 될 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return <div>{isMobile ? <MobileMainpage /> : <DesktopMainPage />}</div>;
}
