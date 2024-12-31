import React from "react";
import apiCall from "../../Api/Api";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <>
    <h2 className="font-blackHanSans text-4xl text-white text-center xs:py-[50px] animate-bounce">
      {text}
    </h2>
      <button
        onClick={() => {
          try {
            apiCall(`${import.meta.env.VITE_BACK_API_URL}/logout`, "get", null);
            alert("로그아웃 되었습니다.");
            window.location.href = import.meta.env.VITE_HOME_URI;
          } catch (err) {
            console.log(err);
          }
        }}
        type="submit"
        className="fixed top-[2.5%] right-[2.5%] bg-transparent  rounded-lg text-white border border-solid border-[#C89B3C]"
      >
        로그아웃
      </button>
    </>
  );
};

export default Header;
