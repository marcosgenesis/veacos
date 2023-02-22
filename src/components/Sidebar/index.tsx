import { RiHome2Line, RiMoneyDollarBoxLine, RiUserLine } from "react-icons/ri";
import NavItem from "./NavItem";
import { Profile } from "./Profile";

const Sidebar: React.FC = () => {
  return (
    <div className="flex h-screen w-72 flex-col items-center rounded-md bg-white p-4 shadow-sm">
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
  );
};

export default Sidebar;
