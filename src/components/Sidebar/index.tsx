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
      <div className="hidden h-screen w-72 flex-col items-center rounded-md bg-white p-4 shadow-sm dark:border-r-2 dark:border-gray-800 dark:bg-gray-900 md:flex">
        <p className="mb-4 text-lg font-medium ">Veacos</p>
        <hr className="mb-4 w-full border-gray-100 dark:border-gray-800" />
        <ul className="flex w-full flex-col gap-2">
          <NavItem path="/home" icon={RiHome2Line} label="Quem me deve" />
          <NavItem path="/my-bills" icon={RiUserLine} label="Quem eu devo" />
        </ul>
        <div className="h-full w-full" />
        <ThemeToggler />
        <Profile />
      </div>
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex h-16 items-center justify-between bg-white dark:bg-gray-900 dark:border-b-[1px] dark:border-gray-800 p-4">
          <p className="font-semibold text-gray-800 dark:text-white">Veacos</p>
          <Button variant="destructive" icon={RiLogoutBoxLine}>
            Sair
          </Button>
        </div>
        <div className="p-4">
          <MobileTabs />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
