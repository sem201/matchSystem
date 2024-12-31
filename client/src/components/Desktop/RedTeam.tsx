import { useState, useEffect  } from "react";
import LineModal from "../Mobile/chooseUser/LineModal";
import { User } from "../../commonTypes";
import none from "./../../assets/line_img/line-none.png";
import PlusIcon from "../../assets/svg/add.svg";
import close from "../../assets/svg/close.svg";

interface RedTeamProps {
  user?: User;
  selectedMode: string;
  handleRemoveUser: (user: User) => void;
  handleAddUser: (user: User) => void;
}

const RedTeam: React.FC<RedTeamProps> = ({
  user,
  selectedMode,
  handleRemoveUser,
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

  // 유저가 없을 경우 배경을 다르게 설정
  const backgroundClass = user ? "bg-[#ffdfdf]" : "bg-[#f0d090] bg-opacity-15";

  // 숫자를 1,000과 같은 형식으로 변환
  const formatNumberWithCommas = (number: number): string => {
    return number.toLocaleString();
  };

  const handleLineSelection = (newLine: string, newLineSrc: string) => {
    // setLine(newLine); // 선택된 라인 업데이트
    setLineSrc(newLineSrc); // 선택된 이미지 업데이트
  
    // 유저 정보 업데이트
    if (user) {
      const updatedUser = { ...user, position: newLine, lineSrc: newLineSrc }; // position과 lineSrc 동시 업데이트
      handleAddUser(updatedUser); // 부모로 업데이트된 user 전달
    }
  };
  
  return (
    <div
      className={`w-[18%] max-h-[100%] border-2 border-solid border-[#fd3f31] rounded-2xl flex flex-col items-center p-2 ${backgroundClass}`}
    >
      <div className="flex flex-col items-center justify-center h-full">
        {/* 유저 정보가 있을 경우 */} 
        {user ? (
          <div
            key={user.id}
            className="flex flex-col items-center justify-between h-full"
          >
            <img
              src={lineSrc|| none}
              alt="라인 이미지"
              className={`w-8 h-8 rounded-lg border-black shadow-xl bg-white shadow-red-500  ${
                selectedMode === "RANDOM" ||
                selectedMode === "모드선택" ||
                selectedMode === "DRAFT"
                  ? "hidden"
                  : ""
              }`}
              onClick={() => setIsLine(!isLine)}
            />
            <div className="w-[100%]">
              {user.MostChamp.map((champ, index) => (
                <div
                  key={index}
                  className="flex w-[100%] change:justify-around xl:justify-between"
                >
                  <div className="change:w-6 xl:w-8 flex-shrink-0 overflow-hidden max-w-[50px]">
                    <img
                      src={champ.champInfo.champ_img}
                      className="w-full h-full object-cover"
                      alt={champ.champInfo.name}
                    />
                  </div>
                  <p className="text-xs font-bold self-center font-blackHanSans change:hidden xl:block">
                    {champ.champInfo.name}
                  </p>
                  <p className="text-xs font-bold self-center font-blackHanSans">
                    {formatNumberWithCommas(champ.championPoints)}
                  </p>
                </div>
              ))}
            </div>
            <p className="text-md text-red-500 font-bold font-blackHanSans break-all text-center change:text-[1rem] xl:text-sm overflow-hidden text-ellipsis">
              {user.gameName}
            </p>
            <img src={user.tierImg.rankImg} alt="tier" className="w-[35%]" />
            {isLine && (
                <LineModal
                handleLineSelection={handleLineSelection} // 라인 선택 시 호출되는 함수 전달
                setIsLine={setIsLine}
                setLineSrc={setLineSrc}
              />
            )}
            <img
              src={close}
              alt="close"
              className="w-8 h-8 rounded-full border-black shadow-xl bg-black shadow-red-500 cursor-pointer"
              onClick={() => {
                handleRemoveUser(user);
                setLineSrc(none);
                handleAddUser(user);
              }}
            />
          </div>
        ) : (
          // 유저 정보가 없을 경우
          <li className="flex flex-col items-center justify-center text-gray-500 xs:h-[20vh] lg:h-full">
            <img src={PlusIcon} alt="Add" className="" />
          </li>
        )}
      </div>
    </div>
  );
};

export default RedTeam;
