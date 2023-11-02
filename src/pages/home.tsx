import React, { useEffect } from "react";

import { api } from "../utils/api";

import Bill from "../components/Bill";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "../server/auth";
import Layout from "../components/Layout";
import { Header } from "../components/Header";
import CreateBillModal from "../components/CreateBillModal";
import MobileTabs from "../components/Sidebar/Tabs";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";
import Image from "next/image";

const Home: React.FC = () => {
  const { data } = useSession();
  const {
    data: bills,
    isLoading,
    isSuccess,
  } = api.bill.getAllFromUser.useQuery(
    {
      isPersonal: false,
    },
    { keepPreviousData: false }
  );

  return (
    <Layout>
      <div className="absolute -z-10 h-[calc(100vh_-_80px)] w-screen blur-xl">
        <motion.div
          className=" relative h-full w-full opacity-80"
          animate={{
            background: [
              "radial-gradient(900px circle at 0% 0%, rgba(253, 164, 175,0.7) 0%, transparent 100%)",
              "radial-gradient(900px circle at 90% 0%, rgba(253, 164, 175,0.7) 0%, transparent 100%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center justify-center">
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
          {isSuccess && bills.map((item) => <Bill key={item.id} bill={item} />)}
        </div>
      </div>
    </Layout>
  );
};
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getServerAuthSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default Home;
