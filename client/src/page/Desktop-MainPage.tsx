import Team from "../components/Desktop/Team";
import Header from "../components/Desktop/Header";
import Menu from "../components/Desktop/Menu";

const DesktopMainPage = () => {
  return (
    <div className="w-[100vw] h-[100vh]">
      <Header />
      <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 gap-6 lg:w-[100%] lg:h-[70%] px-[50px]">
        <Team />
        <Menu />
      </div>
    </div>
  );
};

export default DesktopMainPage;
