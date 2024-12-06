import React from "react";

const Login = () => {
  return (
    <div className="w-[100vw] h-[100vh] bg-[url('./assets/c-o-runeterra-ixtal-06.jpg')] bg-cover bg-center">
      <div className="w-[30vw] h-[100vh] flex flex-col gap-[100px] justify-center bg-white px-[30px] py-[100px] text-center">
        <div className="text-black">리그오브레전드 이미지</div>
        <p className="md:text-[17px] lg:text-[23px] text-[#0F2041]">
          리그오브레전드
          <br />
          사용자설정게임
          <br />
          팀원자동매칭시스템
        </p>
        <button className="md:text-[10px] lg:text-[17px] bg-[#FEE500] hover:bg-white hover:text-[#FEE500] hover:border-[#FEE500]">
          카카오톡으로 로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
