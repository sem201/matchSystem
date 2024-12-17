// components/Navbar.tsx
import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 bg-opacity-80 w-full py-4 fixed top-0 left-0 z-50">
      <div className="container mx-auto flex items-center justify-center space-x-6">
        {/* 로고 이미지 */}
        <img src="https://example.com/logo.png" alt="Logo" className="w-10 h-10" />
        
        {/* 홈 버튼 */}
        <a href="#" className="text-white font-semibold hover:text-yellow-400 transition duration-300">
          홈
        </a>
        
        {/* 메뉴 항목들 */}
        <div className="flex space-x-6">
          <a href="#" className="text-white font-semibold hover:text-yellow-400 transition duration-300">
            메뉴 1
          </a>
          <a href="#" className="text-white font-semibold hover:text-yellow-400 transition duration-300">
            메뉴 2
          </a>
          <a href="#" className="text-white font-semibold hover:text-yellow-400 transition duration-300">
            메뉴 3
          </a>
          <a href="#" className="text-white font-semibold hover:text-yellow-400 transition duration-300">
            메뉴 4
          </a>
          <a href="#" className="text-white font-semibold hover:text-yellow-400 transition duration-300">
            메뉴 5
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
