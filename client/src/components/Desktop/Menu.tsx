import React from "react";
import UserContainer from "./UserContainer";
import ModalButton from "./ModalButton";

import { User } from "../../commonTypes";

interface MenuProps {
  setHeaderText: (text: string) => void;
  allUsers: User[];
  handleAddUser: (user: User) => void;
  setModalType: React.Dispatch<React.SetStateAction<string>>;
  setIsDraftModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedMode: React.Dispatch<React.SetStateAction<string>>;
  selectedMode: string;
  modalType: string;
  isDraftModalOpen: boolean;
  addedUsers: User[];
  setAddedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const Menu: React.FC<MenuProps> = ({
  setHeaderText,
  allUsers,
  handleAddUser,
  setModalType,
  setIsDraftModalOpen,
  setSelectedMode,
  selectedMode,
  modalType,
  isDraftModalOpen,
  addedUsers,
  setAddedUsers,
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
        <UserContainer
          allUsers={allUsers.filter(
            (user) => !addedUsers.some((u) => u.id === user.id)
          )}
          handleAddUser={handleAddUser}
          setAddedUsers={setAddedUsers}
        />
      </div>
    </div>
  );
};

export default Menu;
