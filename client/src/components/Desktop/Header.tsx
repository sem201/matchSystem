import React from "react";

interface HeaderProps {
  text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
  return (
    <h2 className="text-4xl text-white text-center md:py-[50px]">{text}</h2>
  );
};

export default Header;
