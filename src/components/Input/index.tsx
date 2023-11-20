import React, { forwardRef } from "react";
import type { ForwardRefRenderFunction } from "react";
import type { IconType } from "react-icons";
import type { FieldError } from "react-hook-form";
import { RiErrorWarningLine } from "react-icons/ri";
import { type VariantProps, tv } from "tailwind-variants";
interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  leftAdornment?: IconType;
  isFullWidth?: boolean;
  error?: FieldError;
  title: string;
  helperText?: string;
}

const inputStyle = tv({
  base: "flex items-center gap-2 rounded-md border-[1px] border-gray-300 py-1 px-2 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring focus:ring-gray-200 active:bg-gray-100",
  variants: {
    isFullWidth: {
      true: "w-full",
    },
    size: {
      lg: "px-4 py-2",
      md: "px-3 py-2",
      sm: "px-2 py-1",
    },
  },
  defaultVariants: {
    variant: "solid",
    isFullWidth: true,
    size: "md",
  },
});

const titleStyle = tv({
  base: "text-gray-700 font-medium",
  variants: {
    size: {
      lg: "text-md",
      md: "text-sm",
      sm: "text-xs",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const helperTextStyle = tv({
  base: "text-gray-500",
  variants: {
    size: {
      lg: "text-sm",
      md: "text-sm",
      sm: "text-xs",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

type SheetContentVariants = VariantProps<typeof inputStyle> &
  VariantProps<typeof titleStyle> &
  InputProps;

const InputBase: ForwardRefRenderFunction<
  HTMLInputElement,
  SheetContentVariants
> = (
  { leftAdornment, title, helperText, isFullWidth, size, error, ...props },
  ref
) => {
  const Icon = leftAdornment;

  return (
    <div className={isFullWidth ? "w-full" : "w-auto"}>
      <p className={titleStyle({ size })}>{title}</p>
      <div
        className={inputStyle({
          isFullWidth,
          size,
        })}
      >
        {leftAdornment && <Icon />}
        <input
          ref={ref}
          type="text"
          {...props}
          className="w-full bg-transparent outline-none"
        />
      </div>
      {helperText && <p className={helperTextStyle({ size })}>{helperText}</p>}
      {error && (
        <div className="flex items-center gap-2 text-sm  text-red-500">
          <RiErrorWarningLine />
          <p>{error.message}</p>
        </div>
      )}
    </div>
  );
};

export const Input = forwardRef(InputBase);
