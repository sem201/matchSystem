const MobileLoginPage = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URI;
  };
  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh]">
      <p className="text-[#FFFFFF] stroke-[#C8AA6E] ">
        리그 오브 레전드
        <br />
        사용자 설정 게임
        <br />
        팀원 자동 매칭 시스템
      </p>
      <div className="border-2 w-[100px] h-[200px] bg-white border-[#C8AA6E] rounded-[15px] bg-opacity-30">
        <div className="flex flex-col justify-center items-center">
          <div>Login</div>
          <button
            onClick={loginHandler}
            className=" bg-[url(./assets/kakao_login_small.png)] bg-no-repeat bg-full"
          ></button>
        </div>
      </div>
    </div>
  );
};

export default MobileLoginPage;
