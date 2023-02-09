import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { RiHome2Line, RiMoneyDollarBoxLine, RiUserLine } from "react-icons/ri";
import NavItem from "./NavItem";

const Sidebar: React.FC = () => {
  const { data: sessionData } = useSession();
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
      <div className="flex items-center gap-2">
        {sessionData?.user.image ? (
          <Image
            src={sessionData.user.image}
            width={50}
            height={50}
            alt="User Profile"
            className="rounded-full"
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
            <RiUserLine size={24} className="fill-gray-400" />
          </div>
        )}
        <div>
          <p className="font-medium">{sessionData?.user?.name}</p>
          <p className="text-xs text-gray-400">{sessionData?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
