import React from "react";
import type { IconType } from "react-icons";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  icon: IconType;
}

const Button = ({ children, icon, ...props }: ButtonProps) => {
  const solidVariant =
    "py-2 px-4 text-gray-700 border-2 shadow-sm border-gray-300 hover:bg-gray-50 active:bg-gray-100 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-gray-200";

  const Icon = icon;

  return (
    <button
      className={`flex w-full items-center justify-center gap-2 ${solidVariant}`}
      {...props}
    >
      {icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;
