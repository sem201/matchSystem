import { Props } from "../../../commonTypes";

const Container = ({ children }: Props) => {
  return (
    <div className="w-[100px] bg-white border-2 border-[#C8AA6E] rounded-[15px] bg-opacity-30">
      {children}
    </div>
  );
};

export default Container;
