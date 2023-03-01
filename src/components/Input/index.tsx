import React, { forwardRef } from "react";
import type { ForwardRefRenderFunction } from "react";
import type { IconType } from "react-icons";
import type { FieldError } from "react-hook-form";
import { RiErrorWarningLine } from "react-icons/ri";
interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  leftAddormentIcon?: IconType;
  // variant?: "solid" | "ghost" | "destructive";
  isFullWidth?: boolean;
  error?: FieldError;
}

const ghostVariant =
  "py-2 px-4 text-gray-700 border-2 shadow-sm border-gray-300 hover:bg-gray-50 active:bg-gray-100 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-gray-200";

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
    default:
      return ghostVariant;
      break;
  }
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { leftAddormentIcon, isFullWidth, error, ...props },
  ref
) => {
  const Icon = leftAddormentIcon;

  return (
    <>
      <input
        ref={ref}
        type="text"
        className={`min-w-xs dark:border-gray-800 dark:bg-gray-900  ${
          isFullWidth ? "w-full" : "w-50"
        } h-11 rounded-lg border-2 px-4 py-4 font-normal shadow-sm placeholder:font-normal ${
          !!error
            ? "focus:border-red-400 focus:outline-none focus:ring focus:ring-red-300"
            : "focus:border-gray-400 focus:outline-none focus:ring focus:ring-gray-300"
        }`}
        {...props}
      />
      {error && (
        <div className="flex items-center gap-2 text-red-500 dark:text-red-400 text-sm">
          <RiErrorWarningLine />
          <p>{error.message}</p>
        </div>
      )}
    </>
  );
};

export const Input = forwardRef(InputBase);
