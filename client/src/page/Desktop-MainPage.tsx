import Team from "../components/Desktop/Team";
import Header from "../components/Desktop/Header";
import Menu from "../components/Desktop/Menu";
import { useState } from "react";

import { User } from "../commonTypes";
import ComposeButton from "../components/Desktop/ComposeButton";

interface DesktopMainPageProps {
  allUser: User[];
  redTeam: User[];
  blueTeam: User[];
  onAddUserToTeam: (userId: number) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
  setHeaderText: React.Dispatch<React.SetStateAction<string>>;
  selectedMode: string;
  modalType: string;
  isDraftModalOpen: boolean;
  headerText: string;
}

const DesktopMainPage: React.FC<DesktopMainPageProps> = ({
  allUser,
  redTeam,
  blueTeam,
  onAddUserToTeam,
  setModalType,
  setIsDraftModalOpen,
  setSelectedMode,
  selectedMode,
  modalType,
  isDraftModalOpen,
  headerText,
  setHeaderText,
}) => {
  return (
    <div className="w-[100vw] xs:h-[100%] lg:h-[100vh]">
      <Header text={headerText} />
      <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 gap-6 lg:w-[100%] lg:h-[70%] px-[50px]">
        <Team redTeam={redTeam} blueTeam={blueTeam} />
        <Menu
          modalType={modalType}
          selectedMode={selectedMode}
          setModalType={setModalType}
          setIsDraftModalOpen={setIsDraftModalOpen}
          setSelectedMode={setSelectedMode}
          isDraftModalOpen={isDraftModalOpen}
          setHeaderText={setHeaderText}
          allUser={allUser}
          onAddUserToTeam={onAddUserToTeam}
        />
      </div>
      <ComposeButton />
    </div>
  );
};

export default DesktopMainPage;
