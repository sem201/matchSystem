import React from "react";
import { User } from "../../commonTypes";
import LatestUserInfo from "./LatestUserInfo";

interface UserContainerProps {
  allUsers: User[];
  handleAddUser: (user: User) => void;
  setAddedUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const UserContainer: React.FC<UserContainerProps> = ({
  allUsers,
  handleAddUser,
}) => {
  return (
    <div>
      <div className="w-[100%] h-[70vh] overflow-auto border border-solid border-[#C89B3C] rounded-2xl bg-[#F0E6D2] bg-opacity-15 p-4">
        <div className="font-blackHanSans text-center mb-5 mt-3 text-white">
          최근에 같이한 친구
        </div>
        <div>
          {allUsers.map((user) => (
            <LatestUserInfo
              key={user.id}
              user={user}
              onAddUser={handleAddUser}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserContainer;
