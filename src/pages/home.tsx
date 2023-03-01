import React from "react";

import { api } from "../utils/api";
import Sidebar from "../components/Sidebar";

import Bill from "../components/Bill";
import { useState } from "react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { GetServerSideProps } from "next";
import Button from "../components/Button";
import Head from "next/head";
import { getServerAuthSession } from "../server/auth";
import { Input } from "../components/Input";

const Home: React.FC = () => {
  const [searchItem, setSearchItem] = useState("");
  const {
    data: bills,
    isLoading,
    isSuccess,
  } = api.bill.getAllFromUser.useQuery(
    {
      search: searchItem,
      isPersonal: false,
    },
    { keepPreviousData: false }
  );

  return (
    <>
      <Head>
        <title>Veacos</title>
      </Head>
      <main className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900 md:flex-row">
        <Sidebar />
        <div className="w-full">
          <div>
            <div className="px-4 md:hidden">
              <Link href={"/create"}>
                <Button isFullWidth variant="solid" icon={RiAddLine}>
                  Criar dívida
                </Button>
              </Link>
            </div>
            <div className="hidden justify-between bg-white p-6 shadow-sm dark:border-b-2 dark:border-gray-800 dark:bg-gray-900 md:flex">
              <div className="flex flex-col">
                <p className="text-xl font-medium">Quem me deve</p>
                <p className="text-sm text-gray-400">
                  Acompanhe abaixo a listagem de todas as pessoas que te devem
                  alguma coisa
                </p>
              </div>

              <div className="flex gap-4">
                <Link href={"/create"}>
                  <Button isFullWidth variant="solid" icon={RiAddLine}>
                    Criar dívida
                  </Button>
                </Link>
                <Input
                  placeholder="Pesquise pelo nome do veaco"
                  onChange={(e) => setSearchItem(e.target.value)}
                />
                {/* <input
                  type="text"
                  id="title"
                  className="block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Pesquise pelo nome do veaco ou o título da dívida"
                  required
                /> */}
              </div>
            </div>
          </div>
          <div className="m-4 flex flex-col gap-8">
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
      </main>
    </>
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
