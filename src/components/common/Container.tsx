import { Props } from "../../commonTypes";

const Container = ({ children }: Props) => {
  return (
    <div className="border-2 lg:w-[600px] md:w-[500px] sm:w-96 h-100 bg-white">
      {children}
    </div>
  );
};

export default Container;
