import { type NextPage } from "next";
import Head from "next/head";

import { api } from "../utils/api";
import Sidebar from "../components/Sidebar";

import Bill from "../components/Bill";
import { useState } from "react";

const Home: NextPage = () => {
  const [searchItem, setSearchItem] = useState("");
  const {
    data: bills,
    isLoading,
    isSuccess,
  } = api.bill.getAllFromUser.useQuery(
    {
      search: searchItem,
    },
    { keepPreviousData: false, }
  );

  return (
    <>
      <Head>
        <title>Veacos</title>
      </Head>
      <main className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="w-full">
          <div className="flex justify-between bg-white p-6 shadow-sm">
            <div className="flex flex-col">
              <p className="text-xl font-medium">Quem me deve</p>
              <p className="text-sm text-gray-400">
                Acompanhe abaixo a listagem de todas as pessoas que te devem
                alguma coisa
              </p>
            </div>

            <div className="w-96">
              <input
                type="text"
                id="title"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Pesquise pelo nome do veaco ou o título da dívida"
                required
                onChange={(e) => setSearchItem(e.target.value)}
              />
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

export default Home;
