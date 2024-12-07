import React from "react";
interface Props {
  color: string;
}
const TeamContainer: React.FC<Props> = ({ color }) => {
  const textColor = color === "RED" ? "#8A2922" : "#004A82";
  return (
    <>
      <p className="text-[30px]" style={{ color: textColor }}>
        {color} TEAM
      </p>
      <div className="bg-[#F0E6D2] border-2 border-[#C8AA6E] rounded-[15px] bg-opacity-15 w-[300px] min-h-[250px]"></div>
    </>
  );
};

export default TeamContainer;
