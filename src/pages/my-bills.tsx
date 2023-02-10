import Link from "next/link";
import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import Bill from "../components/Bill";
import CreatePersonalBillModal from "../components/CreatePersonalBillModal";
import Sidebar from "../components/Sidebar";
import { api } from "../utils/api";

// import { Container } from './styles';

const MyBills: React.FC = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: bills,isSuccess } = api.bill.getAllFromUser.useQuery(
    {
      search: searchItem,
      isPersonal: true,
    },
    { keepPreviousData: false }
  );

  return (
    <main className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="w-full">
        <div className="flex justify-between bg-white p-6 shadow-sm">
          <div className="flex flex-col">
            <p className="text-xl font-medium">Quem eu devo</p>
            <p className="text-sm text-gray-400">
              Abaixo está todas as pessoas que você deve, e suas respectivas
              parcelas
            </p>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setIsOpen(true)}
              className="item-center flex  justify-center gap-2 rounded-lg bg-slate-900 p-4 text-white"
            >
              <RiAddLine size={24} />
              Criar dívida
            </button>
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
        <div className="m-4 flex flex-col gap-8">
          {isSuccess && bills.map((item) => <Bill key={item.id} bill={item} />)}
        </div>
      </div>
      <CreatePersonalBillModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </main>
  );
};

export default MyBills;
