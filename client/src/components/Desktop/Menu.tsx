import React from "react";
import UserContainer from "./UserContainer";
import ModalButton from "./ModalButton";

import { User } from "../../commonTypes";

interface MenuProps {
  setHeaderText: (text: string) => void;
  allUser: User[];
  onAddUserToTeam: (userId: number) => void;
}

const Menu: React.FC<MenuProps> = ({
  setHeaderText,
  allUser,
  onAddUserToTeam,
}) => {
  return (
    <div className="relative">
      <ModalButton setHeaderText={setHeaderText} />
      <div className="lg:col-span-1 lg:row-span-3">
        <UserContainer allUser={allUser} onAddUser={onAddUserToTeam} />
      </div>
    </div>
  );
};

export default Menu;
