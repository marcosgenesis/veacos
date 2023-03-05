import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";

import { Spinner } from "../Spinner";

const button = cva(
  "p-2 rounded-lg focus:outline-none focus:ring flex items-center justify-center shadow-sm",
  {
    variants: {
      variant: {
        primary: [
          "bg-gray-900",
          "text-white",
          "hover:bg-gray-800",
          "focus:ring-gray-200",
        ],
        "secundary-gray": [
          "bg-transparent",
          "text-gray-700",
          "border-[1px]",
          "border-gray-300",
          "hover:text-gray-800",
          "hover:bg-gray-50",
          "focus:ring-gray-100",
        ],
        "tertiary-gray": [
          "text-gray-500",
          "shadow-none",
          "hover:bg-gray-50",
          "focus:ring-0",
        ],
      },
      destructive: {
        true: [
          "bg-red-600",
          "text-white",
          "hover:bg-red-700",
          "focus:ring-red-200",
        ],
      },
      size: {
        sm: ["w-9", "h-9"],
        md: ["w-10", "h-10"],
        lg: ["w-11", "h-11"],
        xl: ["w-12", "h-12"],
        "2xl": ["w-14", "h-14"],
      },
    },
    compoundVariants: [
      {
        destructive: true,
        variant: "primary",
        class: "bg-red-600 hover:bg-red-700 ",
      },
      {
        destructive: true,
        variant: "secundary-gray",
        class:
          "bg-transparent text-red-700 border-red-300 hover:bg-red-100 hover:text-red-600 focus:ring-red-100 ",
      },
    ],
    defaultVariants: {
      variant: "tertiary-gray",
      size: "sm",
      destructive: false,
    },
  }
);

interface IconButtonProps
  extends React.ComponentPropsWithoutRef<"button">,
    VariantProps<typeof button> {
  isLoading?: boolean;
}

export const IconButton = ({
  children,
  isLoading = false,
  variant,
  size,
  destructive,
  ...props
}: IconButtonProps) => {
  return (
    <button
      className={twMerge(button({ variant, size, destructive }))}
      {...props}
    >
      {isLoading ? <Spinner /> : children}
    </button>
  );
};
