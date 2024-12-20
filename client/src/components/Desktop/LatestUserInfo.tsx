import { User } from "../../commonTypes";
import { useEffect, useRef, useState } from "react";
import UserModal from "../Mobile/userModal/UserModal";
import none from "../../assets/none_profile.jpg";
interface LatestUserInfoProps {
  user: User;
  onAddUser: (user: User) => void;
  setIsUserAdded: React.Dispatch<React.SetStateAction<boolean>>;
  handleDeleteUser: (userId: number) => void;
}
const LatestUserInfo: React.FC<LatestUserInfoProps> = ({
  user,
  onAddUser,
  setIsUserAdded,
  handleDeleteUser,
}) => {
  const [userModal, setUserModal] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setUserModal(false); // 모달 닫기
      }
    };

    if (userModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [userModal]);
  return (
    <div
      className="font-blackHanSans flex flex-row items-center h-[55px] w-[100%] mx-2 my-1 relative justify-around"
      onClick={() => {
        setUserModal(true);
      }}
    >
      <img
        src={`${user.profileInfo?.Profile_img || none}`}
        alt="most-champ-info"
        className="w-[30px] h-[30px]"
      />
      <div className="flex flex-col">
        <div className="text-sm text-white">
          {user.tierScore.Rank}
          {user.tierScore.tier}
        </div>
        <p className="max-w-[150px] min-w-[115px] text-lg text-ellipsis overflow-hidden text-white text-nowrap">
          {user.gameName} {user.tagLine}
        </p>
      </div>
      <p className="min-w-[66px] text-base text-nowrap text-white">
        승률 {user.winRate}%
      </p>
      <button
        onClick={(e) => {
          onAddUser(user);
          e.stopPropagation();
        }}
        className="w-[10px] bg-inherit text-white"
      >
        +
      </button>
      {userModal && (
        <div ref={modalRef} className="absolute top-0 left-0 z-10">
          <UserModal
            user={user}
            setUserModal={setUserModal}
            setIsUserAdded={setIsUserAdded}
            handleDeleteUser={handleDeleteUser}
          />
        </div>
      )}
    </div>
  );
};

export default LatestUserInfo;
