import React from "react";
import { User } from "../../commonTypes";
import PlusIcon from "../../assets/svg/add.svg";

interface UserContainerProps {
  allUsers: User[];
  handleAddUser: (userId: number) => void;
}

const UserContainer: React.FC<UserContainerProps> = ({
  allUsers,
  handleAddUser,
}) => {
  return (
    <div>
      <div className="w-[100%] h-[70vh] overflow-auto bg-[#F0E6D2] border border-solid border-[#C89B3C] rounded-2xl bg-[#F0E6D2] bg-opacity-15 p-4">
        <div className="text-center mb-5 mt-3 text-white">
          최근에 같이한 친구
        </div>
        <ul>
          {allUsers.map((user) => (
            <li key={user.id} className="mb-2">
              <div className="flex gap-[5px] justify-center">
                <span className="font-bold text-white">{user.nickname}</span>
                <span className="text-white">{user.winRate}%</span>
                <img
                  src={PlusIcon}
                  alt="Add"
                  className="cursor-pointer w-6 h-6"
                  onClick={() => handleAddUser(user.id)}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserContainer;
