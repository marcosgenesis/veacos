import {
  RiHome2Line,
  RiLogoutBoxLine,
  RiMoneyDollarBoxLine,
  RiUserLine,
} from "react-icons/ri";
import Button from "../Button";
import NavItem from "./NavItem";
import { Profile } from "./Profile";
import MobileTabs from "./Tabs";

const Sidebar: React.FC = () => {
  return (
    <>
      <div className="hidden h-screen w-72 flex-col items-center rounded-md bg-white p-4 shadow-sm md:flex">
        <p className="mb-4 text-lg font-medium">Veacos</p>
        <hr className="mb-4 w-full border-gray-100" />
        <ul className="flex w-full flex-col gap-2">
          <NavItem path="/" icon={RiHome2Line} label="Quem me deve" />
          <NavItem path="/my-bills" icon={RiUserLine} label="Quem eu devo" />
          <NavItem
            path="/unique-bills"
            icon={RiMoneyDollarBoxLine}
            label="Vendas Únicas"
          ></NavItem>
        </ul>
        <div className="h-full w-full" />
        <Profile />
      </div>
      <div className="flex flex-col gap-2 md:hidden">
        <div className="flex h-16 items-center justify-between bg-white p-4">
          <p className="font-semibold text-gray-800">Veacos</p>
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
