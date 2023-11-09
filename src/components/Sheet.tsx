import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { IconButton } from "./IconButton";
import { RiCloseLine } from "react-icons/ri";
import { type VariantProps, tv } from "tailwind-variants";
const Sheet = DialogPrimitive.Root;
const SheetTrigger = DialogPrimitive.Trigger;

const styledContent = tv({
  base: "fixed inset-0 h-full bg-white",
  variants: {
    side: {
      top: "w-full h-[300px] b-auto",
      right: "r-0",
      bottom: "b-0 h-[300px] t-auto",
      left: "l-0",
    },
    size: {
      sm: "w-1/4 md:w-1/3 lg:w-1/2",
      md: "w-1/2",
      lg: "w-3/4",
    },
  },
  defaultVariants: {
    side: "right",
    size: "md",
  },
});

type SheetContentVariants = VariantProps<typeof styledContent>;
type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;
type SheetContentProps = DialogContentPrimitiveProps & SheetContentVariants;

const SheetContent = ({ children, ...props }: SheetContentProps) => {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 bg-black/20" />
      <DialogPrimitive.Content
        className={styledContent({ side: props.side, size: props.size })}
      >
        {children}
        <DialogPrimitive.Close className="absolute top-2 right-2" asChild>
          <div>
          <IconButton variant={'tertiary-gray'}>
            <RiCloseLine />
          </IconButton>
          </div>
        </DialogPrimitive.Close>
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  );
};

const SheetClose = DialogPrimitive.Close;
const SheetTitle = DialogPrimitive.Title;
const SheetDescription = DialogPrimitive.Description;

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetDescription,
};
