import Link from "next/link";
import { useRouter } from "next/router";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";
import type { IconType } from "react-icons";
import { tv } from "tailwind-variants";

interface NavItemProps {
  path: string;
  label: string;
  icon: IconType;
}

const navItem = tv({
  base: "flex h-11 w-full items-center gap-3 rounded-full px-4 text-lg font-medium text-gray-600 hover:bg-gray-100",
  slots: {
    iconStyle: "fill-gray-700",
  },
  variants: {
    active: {
      true: "bg-gray-50 text-gray-900 border-[1px] border-gray-200",
    },
  },
});

const NavItem = ({ path, icon, label }: NavItemProps) => {
  const Icon = icon;
  const router = useRouter();
  const isActive = router.pathname === path;
  const { iconStyle, base } = navItem({ active: isActive });
  return (
    <Link href={path}>
      <button className={base()}>
        {/* <Icon size={20} className={iconStyle()} /> */}
        {label}
      </button>
      {/* <Button icon={icon} variant={isActive ? "solid" : "tertiary"} isFullWidth>
        {label}
      </Button> */}
    </Link>
  );
};

export default NavItem;
