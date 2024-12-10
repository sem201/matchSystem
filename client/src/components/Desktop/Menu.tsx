import React from "react";
import UserContainer from "./UserContainer";
import ModalButton from "./ModalButton";
import ComposeButton from "./ComposeButton";

interface MenuProps {
  setHeaderText: (text: string) => void;
}

const Menu: React.FC<MenuProps> = ({ setHeaderText }) => {
  return (
    <div className="relative">
      <ModalButton setHeaderText={setHeaderText} />
      <div className="lg:col-span-1 lg:row-span-3">
        <UserContainer />
      </div>
      <ComposeButton />
    </div>
  );
};

export default Menu;
