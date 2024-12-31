import none from "../../../assets/line_img/line-none.png";
import { useState, useEffect } from "react";
import LineModal from "./LineModal";
import { User } from "../../../commonTypes";

interface AddedUserInfoProps {
  user: User;
  selectedMode: string;
  onRemoveUser: (user: User) => void;
  handleAddUser: (user: User) => void;
}

const UserInfo: React.FC<AddedUserInfoProps> = ({
  user,
  selectedMode,
  onRemoveUser,
  handleAddUser,
}) => {
  const [isLine, setIsLine] = useState<boolean>(false);
  const [lineSrc, setLineSrc] = useState(user?.lineSrc || none); // user.lineSrc로 초기화

  useEffect(() => {
    if (user) {
      // user 정보가 업데이트되었을 때 lineSrc를 최신 상태로 반영
      setLineSrc(user.lineSrc || none);
    }
  }, [user]); // user가 변경될 때마다 lineSrc 업데이트

  const handleLineSelection = (newLine: string, newLineSrc: string) => {
    // setLine(newLine); // 선택된 라인 업데이트
    setLineSrc(newLineSrc); // 선택된 이미지 업데이트
  
    // 유저 정보 업데이트
    if (user) {
      const updatedUser = { ...user, position: newLine, lineSrc: newLineSrc }; // position과 lineSrc 동시 업데이트
      console.log("Updated User:", updatedUser);
      handleAddUser(updatedUser); // 부모로 업데이트된 user 전달
    }
  };

  return (
    <div className="flex flex-row items-center h-[55px] mx-2 my-1 gap-2 relative">
      {selectedMode == "BALANCE" && (
        <img
          src={lineSrc|| none}
          alt="line-info"
          className="w-[15px] h-[15px]"
          onClick={() => setIsLine(!isLine)}
        />
      )}
      <img
        src={user.MostChamp[0].champInfo.champ_img}
        alt="most-champ-info"
        className="w-[20px] h-[20px]"
      />
      <div className="flex flex-col">
        <div className="text-[10px] text-white">{user.tierScore.Rank}</div>
        <p className="max-w-[115px] min-w-[115px] text-[12px] text-ellipsis overflow-hidden text-white text-nowrap">
          {user.gameName} {user.tagLine}
        </p>
      </div>
      <p className="min-w-[66px] text-[13px] text-nowrap text-white">
        승률 {user.winRate}%
      </p>
      <button
        className="w-[10px] bg-inherit text-white"
        onClick={() => {
          onRemoveUser(user), setLineSrc(none);
        }}
      >
        X
      </button>
      {isLine && (
        <LineModal
          handleLineSelection={handleLineSelection}
          setIsLine={setIsLine}
          setLineSrc={setLineSrc}
        />
      )}
    </div>
  );
};

export default UserInfo;
