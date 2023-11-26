import Image from "next/image";
import React from "react";
import Bill from "../components/Bill";
import CreateBillModal from "../components/CreateBillModal";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import MobileTabs from "../components/Sidebar/Tabs";
import { api } from "../utils/api";
import Sidebar from "../components/Sidebar";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

const MyBills: React.FC = () => {
  const { data } = useSession();
  const { data: bills, isSuccess,isLoading } = api.bill.getAllFromUser.useQuery(
    {
      isPersonal: true,
    },
    { keepPreviousData: false }
  );

  return (
    <Layout>
    <div className="fixed top-0 -z-10 h-[calc(100vh_-_80px)] w-[100vw] blur-xl">
      <motion.div
        className="relative h-full w-full opacity-60"
        animate={{
          background: [
            "radial-gradient(900px circle at 0% 0%, rgba(253, 164, 164, 0.7) 0%, transparent 100%)",
            "radial-gradient(900px circle at 90% 0%, rgba(253, 164, 164, 0.7) 0%, transparent 100%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
    <div className="relative flex items-start justify-center gap-4">
      <Sidebar />
      <div className="flex flex-col">
        <div className="flex p-8">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-3xl text-gray-600">Bem vindo novamente </p>
              <motion.p
                animate={{ rotateZ: [0, 20, 0], rotateY: [0, 20, 0] }}
                transition={{
                  repeat: 1,
                  duration: 0.4,
                  type: "just",
                  repeatType: "reverse",
                }}
                className="text-3xl text-gray-600"
              >
                👋
              </motion.p>
            </div>

            <div className="flex items-center gap-2">
              <div>
                <Image
                  src={data?.user.image}
                  width={50}
                  height={50}
                  alt="User Profile"
                  className="rounded-full"
                />
              </div>
              <p className="text-6xl font-medium text-gray-800">
                {data?.user?.name}
              </p>
            </div>
          </div>
          {/* <div className="w-80 rounded-md border-[1px] border-gray-50 bg-white p-4 shadow-md">
          <CreateBillModal />
        </div> */}
        </div>
        <div>
          {isLoading && <p>Carregando...</p>}

          {bills?.length === 0 && (
            <p className="text-center text-black/30">
              Nenhuma conta cadastrada
            </p>
          )}
          {isSuccess &&
            bills.map((item) => <Bill key={item.id} bill={item} />)}
        </div>
      </div>
    </div>
  </Layout>
  );
};

export default MyBills;
