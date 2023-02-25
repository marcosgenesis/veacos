import React from "react";

import { api } from "../utils/api";
import Sidebar from "../components/Sidebar";

import Bill from "../components/Bill";
import { useState } from "react";
import Link from "next/link";
import { RiAddLine } from "react-icons/ri";
import { requireAuthentication } from "../utils/withAuth";
import { GetServerSideProps } from "next";
import Button from "../components/Button";
import Head from "next/head";

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
      <main className="flex min-h-screen flex-col bg-gray-100 md:flex-row">
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
            <div className="hidden justify-between bg-white p-6 shadow-sm md:flex">
              <div className="flex flex-col">
                <p className="text-xl font-medium">Quem me deve</p>
                <p className="text-sm text-gray-400">
                  Acompanhe abaixo a listagem de todas as pessoas que te devem
                  alguma coisa
                </p>
              </div>

              <div className="flex gap-4">
                <Link
                  href={"/create"}
                  className="item-center flex  justify-center gap-2 rounded-lg bg-slate-900 p-4 text-white"
                >
                  <RiAddLine size={24} />
                  Criar dívida
                </Link>
                <input
                  type="text"
                  id="title"
                  className="block w-96 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Pesquise pelo nome do veaco ou o título da dívida"
                  required
                  onChange={(e) => setSearchItem(e.target.value)}
                />
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
// export const getServerSideProps: GetServerSideProps = (context) => {
//   return requireAuthentication(context, (session) => {
//     return { props: { session } };
//   });
// };

export default Home;
