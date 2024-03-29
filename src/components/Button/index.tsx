import React from "react";
import type { IconType } from "react-icons";
import { Spinner } from "../Spinner";
interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  icon?: IconType;
  isLoading?: boolean;
  variant?: "solid" | "ghost" | "destructive" | "tertiary";
  isFullWidth?: boolean;
}

const ghostVariant =
  "py-2 px-4 text-gray-700 border-2 shadow-sm border-gray-300 hover:bg-gray-50 active:bg-gray-100 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-gray-200";

const tertiary =
  "py-2 px-4 text-gray-400 border-gray-300 hover:bg-gray-200 hover:text-gray-700 transition active:bg-gray-100 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-gray-200";

const destructiveVariant =
  "py-2 px-4 text-white bg-red-600 shadow-sm hover:bg-red-700 active:bg-red-700 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-red-200";

const solidVariant =
  "rounded-lg bg-black px-4 py-2 font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-800";

function getVariant(variant: string) {
  switch (variant) {
    case "ghost":
      return ghostVariant;
      break;
    case "solid":
      return solidVariant;
      break;
    case "destructive":
      return destructiveVariant;
      break;
    case "tertiary":
      return tertiary;
      break;
    default:
      return ghostVariant;
      break;
  }
}

const Button = ({
  children,
  icon,
  isLoading = false,
  variant = "ghost",
  isFullWidth = false,
  type,
  ...props
}: ButtonProps) => {
  const Icon = icon;

  return (
    <button
      type={type}
      className={`flex h-11 ${
        isFullWidth ? "w-full" : "w-fit"
      } items-center justify-center gap-2 ${getVariant(variant)} ${
        variant === "solid"
          ? "dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
          : ""
      }`}
      {...props}
    >
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {!!Icon && <Icon size={20} />}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
