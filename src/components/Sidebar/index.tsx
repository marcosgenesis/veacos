import Image from "next/image";
import { RiAddLine, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useState } from "react";
import { IconButton } from "../IconButton";
import CoinsIcon from "../icons/Coins";
import HomeIcon from "../icons/Home";
import CoinSwapIcon from "../icons/CoinSwap";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/router";
import CreateBillModal from "../CreateBillModal";
import { Tooltip } from "../Tooltip";
const Sidebar: React.FC = () => {
  const { pathname } = useRouter();
  return (
    <>
      <motion.div
        variants={{
          open: {
            height: "auto",
          },
          close: {
            height: "auto",
          },
        }}
        className="mt-10 flex flex-col items-center justify-center gap-4 rounded-lg border-[1px] border-gray-200 bg-white  p-2 shadow-sm"
      >
        <div className="flex flex-col items-center gap-2">
          <div className="w-fit rounded-lg bg-gray-200 px-2 text-center font-medium text-gray-800">
            <p className="text-xs">BETA</p>
          </div>
          <Image src="/logo.png" alt="Logo" width={52} height={52} />
        </div>
        <div>
          <CreateBillModal />
        </div>
        <div className="flex flex-col gap-2">
          <Link href="/home">
            <Tooltip title="Cobranças">
              <IconButton
                variant={pathname === "/home" ? "primary" : "tertiary-gray"}
              >
                <CoinSwapIcon stroke="stroke-gray-700" />
              </IconButton>
            </Tooltip>
          </Link>
          <Link href="/my-bills">
            <IconButton
              variant={pathname === "/my-bills" ? "primary" : "tertiary-gray"}
            >
              <CoinsIcon stroke="stroke-gray-700" />
            </IconButton>
          </Link>
        </div>
        {/* <ul className="flex gap-2 flex-col">
          <NavItem path="/home" icon={RiHome2Line} label="Cobranças" />
          <CreateBillModal />
          <NavItem path="/my-bills" icon={RiUserLine} label="Minhas dívidas" />
        </ul> */}
      </motion.div>
    </>
  );
};

export default Sidebar;
