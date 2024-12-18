import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import logoImg from "../../assets/modeGif/Noobs.png";

const Navbar: React.FC = () => {
  const [logoutTime, setLogoutTime] = useState(10 * 6); // 10분을 초로 설정
  const [isMenuOpen, setIsMenuOpen] = useState(false); // 메뉴 열림 상태 관리
  const timerRef = useRef<NodeJS.Timeout | null>(null); // Timer reference

  // 타이머 감소
  useEffect(() => {
    // 타이머 실행
    const startTimer = () => {
      timerRef.current = setInterval(() => {
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
    };

    startTimer(); // 타이머 시작

    // 활동을 감지하여 타이머 초기화
    const resetTimer = () => {
      setLogoutTime(10 * 6); // 타이머 리셋
      if (timerRef.current) {
        clearInterval(timerRef.current); // 기존 타이머 정리
      }
      startTimer(); // 새 타이머 시작
    };

    // 활동 이벤트 리스너 (마우스 이동, 키보드 입력)
    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keydown", resetTimer);

    // 컴포넌트가 unmount될 때 이벤트 리스너와 타이머 정리
    return () => {
      clearInterval(timerRef.current!);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keydown", resetTimer);
    };
  }, []);

  // 로그아웃 요청 함수
  const logout = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/logout", { withCredentials: true });
      alert("로그아웃 되었습니다.");
      window.location.href = "/";
    } catch (error) {
      console.error("로그아웃 오류:", error);
      alert("로그아웃 요청에 오류가 발생했습니다.");
    }
  };

  // 시간 포맷팅 함수 (초를 MM:SS 형식으로 변환)
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };


  return (
    <nav className="bg-gray-800 bg-opacity-80 w-full py-5 fixed top-0 left-0 z-50 font-blackHanSans">
      <div className="container mx-auto flex items-center justify-between space-x-8">
        {/* 로고와 메뉴 */}
        <div className="flex items-center space-x-8">
          <a href="/main">
            <img
              src={logoImg}
              alt="Logo"
              className="w-16 h-16 cursor-pointer"
            />
          </a>
          {/* 메뉴 */}
          <div className="hidden md:flex space-x-6">
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
        </div>

        {/* PC 버전에서 환영합니다 */}
        <div className="hidden md:flex items-center space-x-4 ml-auto">
        <button
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
            className="text-yellow-700 text-lg font-semibold hover:text-red-400 transition duration-300"
          >
            로그아웃
          </button>
          <span className="text-white">{`성은총님 환영합니다`}</span>
          <span className="text-yellow-500">{`자동 로그아웃: ${formatTime(logoutTime)}`}</span>
        </div>

        {/* 모바일에서 보이는 햄버거 메뉴 */}
        <div className="md:hidden flex items-center space-x-4 ml-auto z-50">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black text-3xl" // 검은색 햄버거 버튼
          >
            ☰
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 슬라이드 */}
      <div
        className={`fixed top-0   right-0 w-64 h-full bg-gray-800 bg-opacity-90 transition-transform duration-300 transform ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } z-40`}
      >
        <div className="flex flex-col items-center justify-start space-y-9 pt-25 ">
          <span className="text-white text-lg font-semibold">환영합니다</span>
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
          {/* 모바일 메뉴에서 로그아웃 버튼 */}
          <button
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
            className="text-yellow-700 text-lg font-semibold hover:text-red-400 transition duration-300 mt-8"
          >
            로그아웃
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
