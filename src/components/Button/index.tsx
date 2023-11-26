import React from "react";
import type { IconType } from "react-icons";
import { Spinner } from "../Spinner";
import { type VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: "w-fit flex items-center justify-center",
  slots: {
    iconContainer: "mr-10 stroke-gray-100",
    iconColor: "stroke-gray-700",
  },
  variants: {
    variant: {
      ghost:
        "py-2 px-4 text-gray-700 border-[1px] shadow-sm border-gray-300 hover:bg-gray-50 active:bg-gray-100 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-gray-200",
      solid: {
        base: "rounded-lg bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring focus:ring-gray-300 active:bg-gray-600",
        iconColor: "stroke-gray-600",
      },
      destructive:
        "py-2 px-4 text-white bg-red-600 shadow-sm hover:bg-red-700 active:bg-red-700 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-red-200",
      tertiary:
        "py-2 px-4 text-gray-400 border-gray-300 hover:bg-gray-200 hover:text-gray-700 transition active:bg-gray-100 rounded-lg font-semibold focus:outline-none focus:ring focus:ring-gray-200",
    },
    isFullWidth: {
      true: "w-full",
    },
  },
  defaultVariants: {
    variant: "ghost",
  },
});

type ButtonVariants = VariantProps<typeof button> & {
  icon?: IconType;
  isLoading?: boolean;
};
type ButtonPrimitiveProps = React.ComponentPropsWithoutRef<"button">;

type ButtonProps = ButtonPrimitiveProps & ButtonVariants;

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
  const { iconContainer, base, iconColor } = button();
  return (
    <button type={type} className={base({ variant, isFullWidth })} {...props}>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {!!Icon && (
            <Icon
              size={30}
              className={iconContainer({ variant, isFullWidth })}
              stroke={iconColor({ variant, isFullWidth })}
            />
          )}
          {children}
        </>
      )}
    </button>
  );
};

export default Button;
