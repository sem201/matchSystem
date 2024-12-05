const Account = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const REDIRECT_URI = "http://localhost:5173/kakao/login";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URI;
  };
  return (
    <div className="border-2 w-[100px] h-[200px] bg-white border-[#C8AA6E] rounded-[15px] bg-opacity-30">
      <div className="flex flex-col justify-center items-center">
        <div>Login</div>
        <button
          onClick={loginHandler}
          className=" bg-[url(./assets/kakao_login_small.png)] bg-no-repeat bg-full"
        ></button>
      </div>
    </div>
  );
};

export default Account;
