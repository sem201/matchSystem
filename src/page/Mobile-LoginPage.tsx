import Account from "../components/Mobile/Login/Account";

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh]">
      <p className="text-[#FFFFFF] stroke-[#C8AA6E] ">
        리그 오브 레전드
        <br />
        사용자 설정 게임
        <br />
        팀원 자동 매칭 시스템
      </p>
      <Account />
    </div>
  );
};

export default LoginPage;
