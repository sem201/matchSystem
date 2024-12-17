// components/Navbar.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import logoImg from "../../assets/modeGif/Noobs.png";

const Navbar: React.FC = () => {
  const [logoutTime, setLogoutTime] = useState(10 * 60); // 10분을 초로 설정

  // 타이머 감소
  useEffect(() => {
    const timer = setInterval(() => {
      setLogoutTime((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          // 타이머가 0에 도달하면 로그아웃 처리
          logout();
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer); // 컴포넌트가 unmount될 때 타이머 정리
  }, []);

    // 로그아웃 요청 함수
    const logout = async () => {
      try {
        // 로그아웃 API 요청
        const response = await axios.get("http://127.0.0.1:8000/logout");
      } catch (error) {
        console.error("로그아웃 오류:", error);
      }
    };

  // 남은 시간 계산 (분:초)
  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return (
    <nav className="bg-gray-800 bg-opacity-80 w-full py-5 fixed top-0 left-0 z-50 font-blackHanSans">
      <div className="container mx-auto flex items-center justify-center space-x-20">
        {" "}
        {/* 전체 가운데 정렬 */}
        {/* 메뉴 항목 + 로고 */}
        <div className="flex items-center space-x-12">
          {" "}
          {/* 간격을 넓힘 */}
          <a href="/main">
            <img
              src={logoImg}
              alt="Logo"
              className="w-16 h-16 cursor-pointer"
            />
          </a>
          <a
            href="#"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
          >
            메뉴 1
          </a>
          <a
            href="#"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
          >
            메뉴 2
          </a>
          <a
            href="#"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
          >
            메뉴 3
          </a>
          <a
            href="#"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
          >
            메뉴 4
          </a>
          <a
            href="#"
            className="text-white text-lg font-semibold hover:text-yellow-400 transition duration-300"
          >
            메뉴 5
          </a>
        </div>
        {/* 사용자 정보 및 로그아웃 */}
        <div className="flex items-center space-x-6">
          <span className="text-white text-lg font-semibold">
            성은총님 환영합니다
          </span>
          <button
            className="text-black text-lg font-semibold hover:text-red-400 transition duration-300"
            onClick={() => {
              axios
                .get(
                  "http://127.0.0.1:8000/logout",
                  {},
                  { withCredentials: true }
                )
                .then((response) => {
                  alert("로그아웃 되었습니다.");
                  window.location.href = "/";
                })
                .catch((error) => {
                  console.error("로그아웃 요청 중 오류 발생:", error);
                  alert("로그아웃 요청에 오류가 발생했습니다.");
                });
            }}
          >
            로그아웃
          </button>

          <button className="text-black text-lg font-semibold hover:text-red-400 transition duration-300">
            전적갱신
          </button>
          <span className="text-yellow-400 text-lg font-semibold">
            자동 로그아웃: {formatTime(logoutTime)}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
