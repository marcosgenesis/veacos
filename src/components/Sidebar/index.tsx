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
import CreateBillModal from "../CreateBillModal";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className="flex w-screen justify-center rounded-md border-[1px] border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex justify-between">
          <ul className="flex gap-2">
            <NavItem path="/home" icon={RiHome2Line} label="Cobranças" />
            <CreateBillModal />
            <NavItem
              path="/my-bills"
              icon={RiUserLine}
              label="Minhas dívidas"
            />
          </ul>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
