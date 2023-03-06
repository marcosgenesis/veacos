import Link from "next/link";
import { useRouter } from "next/router";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";
import { twMerge } from "tailwind-merge";
import type { IconType } from "react-icons";

interface NavItemProps {
  path: string;
  label: string;
  icon: IconType;
}

const navItem = cva(
  "flex h-11 w-full items-center gap-3 rounded-lg pl-3 text-lg font-medium text-gray-600 hover:bg-gray-100",
  {
    variants: {
      active: {
        true: ['bg-gray-100','text-gray-900']
      },
    },
    defaultVariants: {
      ative: false,
    },
  }
);

const NavItem = ({ path, icon, label }: NavItemProps) => {
  const Icon = icon;
  const router = useRouter();
  const isActive = router.pathname === path;
  return (
    <Link href={path}>
      <button className={twMerge(navItem({ active: isActive }))}>
        <Icon size={20} className="fill-gray-700" />
        {label}
      </button>
      {/* <Button icon={icon} variant={isActive ? "solid" : "tertiary"} isFullWidth>
        {label}
      </Button> */}
    </Link>
  );
};

export default NavItem;
