import Team from "../components/Desktop/Team";
import Header from "../components/Desktop/Header";
import Menu from "../components/Desktop/Menu";
import { useState } from "react";

import { User } from "../commonTypes";
import ComposeButton from "../components/Desktop/ComposeButton";

interface DesktopMainPageProps {
  allUsers: User[];
  redTeam: User[];
  blueTeam: User[];
  handleAddUser: (user: User) => void;
  handleRemoveUser: (user: User) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
  setHeaderText: React.Dispatch<React.SetStateAction<string>>;
  addedUsers: User[];
  setAddedUser: React.Dispatch<React.SetStateAction<User[]>>;
  selectedMode: string;
  modalType: string;
  isDraftModalOpen: boolean;
  headerText: string;
}

const DesktopMainPage: React.FC<DesktopMainPageProps> = ({
  allUsers,
  redTeam,
  blueTeam,
  handleAddUser,
  handleRemoveUser,
  setModalType,
  setIsDraftModalOpen,
  setSelectedMode,
  selectedMode,
  modalType,
  isDraftModalOpen,
  headerText,
  setHeaderText,
  addedUsers,
  setAddedUsers,
}) => {
  return (
    <div className="w-[100vw] xs:h-[100%] lg:h-[100vh]">
      <Header text={headerText} />
      <div className="lg:grid lg:grid-rows-3 lg:grid-cols-3 gap-6 lg:w-[100%] lg:h-[70%] px-[50px]">
        <Team
          redTeam={redTeam}
          blueTeam={blueTeam}
          handleRemoveUser={handleRemoveUser}
          handleAddUser={handleAddUser}
        />
        <Menu
          modalType={modalType}
          selectedMode={selectedMode}
          setModalType={setModalType}
          setIsDraftModalOpen={setIsDraftModalOpen}
          setSelectedMode={setSelectedMode}
          isDraftModalOpen={isDraftModalOpen}
          setHeaderText={setHeaderText}
          allUsers={allUsers}
          handleAddUser={handleAddUser}
          addedUsers={addedUsers}
          setAddedUsers={setAddedUsers}
        />
      </div>
      <ComposeButton />
    </div>
  );
};

export default DesktopMainPage;
