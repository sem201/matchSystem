import TeamContainer from "../components/Mobile/Main/TeamContainer";
import UserInfo from "../components/Mobile/chooseUser/UserInfo";
import Container from "../components/Mobile/common/Container";

const MobileMainpage = () => {
  return (
    <div className="flex flex-col items-center justify-start w-[100vw] max-h-[100vh] overflow-y-scroll">
      <TeamContainer color="RED" />
      <TeamContainer color="BLUE" />

      <Container>
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
      </Container>
    </div>
  );
};

export default MobileMainpage;
