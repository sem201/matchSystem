import React from "react";
import UserContainer from "./UserContainer";
import ModalButton from "./ModalButton";

import { User } from "../../commonTypes";

interface MenuProps {
  setHeaderText: (text: string) => void;
  allUser: User[];
  onAddUserToTeam: (userId: number) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
  selectedMode: string;
  modalType: string;
  isDraftModalOpen: boolean;
}

const Menu: React.FC<MenuProps> = ({
  setHeaderText,
  allUser,
  onAddUserToTeam,
  setModalType,
  setIsDraftModalOpen,
  setSelectedMode,
  selectedMode,
  modalType,
  isDraftModalOpen,
}) => {
  return (
    <div className="relative">
      <ModalButton
        setHeaderText={setHeaderText}
        modalType={modalType}
        selectedMode={selectedMode}
        setModalType={setModalType}
        setIsDraftModalOpen={setIsDraftModalOpen}
        setSelectedMode={setSelectedMode}
        isDraftModalOpen={isDraftModalOpen}
      />
      <div className="lg:col-span-1 lg:row-span-3">
        <UserContainer allUser={allUser} onAddUser={onAddUserToTeam} />
      </div>
    </div>
  );
};

export default Menu;
