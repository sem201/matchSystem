import React from "react";
import { Props } from "../../commonTypes";

const UserContainer = ({ children }: Props) => {
  return (
    <div>
      <div className="w-[100%] h-[70vh] overflow-auto bg-[#F0E6D2] border-2 border-[#C8AA6E] rounded-[20px] bg-[#F0E6D2] bg-opacity-30 p-4">
        <div className="ml-3 mb-5 mt-3">최근에 같이한 친구</div>

        {children}
      </div>
    </div>
  );
};

export default UserContainer;
