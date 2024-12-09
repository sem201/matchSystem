import React from "react";
import UserContainer from "./UserContainer";
import Button from "./Button";

const Menu = () => {
  return (
    <div className="relative">
      <Button />
      <div className="lg:col-span-1 lg:row-span-3">
        <UserContainer />
      </div>
    </div>
  );
};

export default Menu;
