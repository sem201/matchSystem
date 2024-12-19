import React from "react";
import axios from "axios";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <>
      <h2 className="font-blackHanSans text-4xl text-white text-center xs:py-[50px]">
        {text}
      </h2>
      <button
        onClick={() => {
          axios
            .get("http://127.0.0.1:8000/logout", {}, { withCredentials: true })
            .then((response) => {
              alert("로그아웃 되었습니다.");
              window.location.href = "/";
            })
            .catch((error) => {
              console.error("로그아웃 요청 중 오류 발생:", error);
              alert("로그아웃 요청에 오류가 발생했습니다.");
            });
        }}
        type="submit"
        className="fixed top-[2.5%] right-[2.5%] bg-transparent text-white border border-solid border-[#C89B3C]"
      >
        로그아웃
      </button>
    </>
  );
};

export default Header;
