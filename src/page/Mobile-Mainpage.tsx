import TeamContainer from "../components/Mobile/Main/TeamContainer";

const MobileMainpage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-[100vw] h-[100vh]">
      <TeamContainer color="RED" />
      <TeamContainer color="BLUE" />
    </div>
  );
};

export default MobileMainpage;
