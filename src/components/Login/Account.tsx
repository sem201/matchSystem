import Container from "../common/Container";

const Account = () => {
  const REST_API_KEY = import.meta.env.VITE_KAKAO_API_KEY;
  const REDIRECT_URI = "http://localhost:5173/kakao/login";
  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const loginHandler = () => {
    window.location.href = KAKAO_AUTH_URI;
  };
  return (
    <Container>
      <button onClick={loginHandler} className="bg-amber-800 py-2">
        로그인
      </button>
    </Container>
  );
};

export default Account;
