import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import type { IconType } from "react-icons";
import Button from "../Button";

interface NavItemProps {
  path: string;
  label: string;
  icon: IconType;
}

const NavItem = ({ path, icon, label }: NavItemProps) => {
  const router = useRouter();
  const isActive = router.pathname === path;
  return (
    <Link href={path}>
      <Button icon={icon} variant={isActive ? "solid" : "ghost"} isFullWidth>
        {label}
      </Button>
    </Link>
  );
};

export default NavItem;
