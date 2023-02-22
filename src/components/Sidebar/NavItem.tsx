import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import type { IconType } from "react-icons";

interface NavItemProps {
  path: string;
  label: string;
  icon: IconType;
}

const NavItem = ({ path, icon, label }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === path;
  const Icon = icon;
  return (
    <Link
      href={path}
      className={`flex cursor-pointer items-center gap-4 rounded-md p-4 ${
        isActive ? "bg-gray-900  hover:bg-gray-800" : "hover:bg-gray-100"
      } `}
    >
      <Icon
        size={20}
        className={`${isActive ? "text-white" : "fill-gray-400"}`}
      />
      <p className={`${isActive ? "text-white" : "text-gray-400"} font-medium`}>
        {label}
      </p>
    </Link>
  );
};

export default NavItem;
