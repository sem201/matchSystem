import React from "react";
import UserContainer from "./UserContainer";
import ModalButton from "./ModalButton";
import ComposeButton from "./ComposeButton";

import { User } from "../../commonTypes";

interface MenuProps {
  setHeaderText: (text: string) => void;
  allUser: User[];
  onAddUserToTeam: (userId: number) => void;
  setAllUser: React.Dispatch<React.SetStateAction<User[]>>;
  setRedTeam: React.Dispatch<React.SetStateAction<User[]>>;
  setBlueTeam: React.Dispatch<React.SetStateAction<User[]>>;
}

const Menu: React.FC<MenuProps> = ({
  setHeaderText,
  allUser,
  onAddUserToTeam,
  setAllUser,
  setRedTeam,
  setBlueTeam,
}) => {
  return (
    <div className="relative">
      <ModalButton setHeaderText={setHeaderText} />
      <div className="lg:col-span-1 lg:row-span-3">
        <UserContainer
          allUser={allUser}
          onAddUser={onAddUserToTeam}
          setAllUser={setAllUser}
          setRedTeam={setRedTeam}
          setBlueTeam={setBlueTeam}
        />
      </div>
      <ComposeButton />
    </div>
  );
};

export default Menu;
