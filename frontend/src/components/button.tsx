import React from "react";

interface btnProps {
  type: "submit" | "button" | "reset";
  title: string;
  loading?: boolean;
}

const Btn: React.FC<btnProps> = ({ type, title }) => {
  return (
    <button
      type={type}
      className="transtion-all duration-[0.3s] w-auto 
        bg-gradient-to-r from-indigo-400 to-cyan-400  text-white font-bold 
         rounded h-15 hover:shadow-lg hover:shadow-indigo-400/70 cursor-pointer"
    >
      {title}
    </button>
  );
};

export default Btn;
