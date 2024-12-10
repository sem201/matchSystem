import React from "react";
import UserContainer from "./UserContainer";
import Button from "./Button";

interface MenuProps {
  setHeaderText: (text: string) => void;
}

const Menu: React.FC<MenuProps> = ({ setHeaderText }) => {
  return (
    <div className="relative">
      <Button setHeaderText={setHeaderText} />
      <div className="lg:col-span-1 lg:row-span-3">
        <UserContainer />
      </div>
    </div>
  );
};

export default Menu;
