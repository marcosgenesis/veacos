import Image from "next/image";
import {
  RiHome2Line,
  RiLogoutBoxLine,
  RiMoneyDollarBoxLine,
  RiUserLine,
} from "react-icons/ri";
import Button from "../Button";
import ThemeToggler from "../ThemeToggle";
import NavItem from "./NavItem";
import { Profile } from "./Profile";
import MobileTabs from "./Tabs";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className="hidden w-72 flex-col items-center gap-4 rounded-md border-[1px] border-gray-100 bg-white p-4 shadow-sm dark:border-r-2 dark:border-gray-800 dark:bg-gray-900 md:flex md:h-fit">
        <div className="flex w-full items-center justify-center gap-2 text-center">
          <Image src={"/logo.png"} width={40} height={40} alt="veacos logo" />
          <p className="text-lg font-medium ">Veacos</p>
        </div>
        <hr className="mb-4 w-full border-gray-100 dark:border-gray-800" />
        <ul className="flex w-full flex-col gap-2">
          <NavItem path="/home" icon={RiHome2Line} label="Quem me deve" />
          <NavItem path="/my-bills" icon={RiUserLine} label="Quem eu devo" />
        </ul>
        <div className="h-full w-full" />
      </div>
    </>
  );
};

export default Sidebar;
