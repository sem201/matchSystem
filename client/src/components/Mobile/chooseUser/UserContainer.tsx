import { Props } from "../../../commonTypes";
import UserInfo from "./UserInfo";

const UserContainer = ({ children }: Props) => {
  return (
    <>
      <div className="w-[300px] bg-[#F0E6D2] border-2 border-[#C8AA6E] rounded-[40px] bg-opacity-15 mt-7 mb-7 p-4">
        <div className="ml-3 mb-5 mt-3">최근에 같이한 친구</div>
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        <UserInfo />
        {children}
      </div>
    </>
  );
};

export default UserContainer;
