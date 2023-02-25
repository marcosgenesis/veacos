import Image from "next/image";
import React, { useState } from "react";
import { RiAddLine } from "react-icons/ri";
import Bill from "../components/Bill";
import Button from "../components/Button";
import CreatePersonalBillModal from "../components/CreatePersonalBillModal";
import Sidebar from "../components/Sidebar";
import { api } from "../utils/api";

// import { Container } from './styles';

const MyBills: React.FC = () => {
  const [searchItem, setSearchItem] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { data: bills, isSuccess } = api.bill.getAllFromUser.useQuery(
    {
      search: searchItem,
      isPersonal: true,
    },
    { keepPreviousData: false }
  );

  return (
    <main className="flex min-h-screen flex-col bg-gray-100 md:flex-row">
      <Sidebar />
      <div className="w-full">
        <div>
          <div className="px-4 md:hidden">
            <Button isFullWidth variant="solid" icon={RiAddLine} 
                onClick={() => setIsOpen(true)}>
              Criar dívida
            </Button>
          </div>
          <div className="hidden justify-between bg-white p-6 shadow-sm md:flex">
            <div className="flex flex-col">
              <p className="text-xl font-medium">Quem eu devo</p>
              <p className="text-sm text-gray-400">
                Abaixo está todas as pessoas que você deve, e suas respectivas
                parcelas
              </p>
            </div>

            <div className="flex gap-4">
              <Button
                variant="solid"
                icon={RiAddLine}
                onClick={() => setIsOpen(true)}
              >
                Criar Dívida
              </Button>
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
          {isSuccess && bills.length === 0 && (
            <div className="flex flex-col items-center">
              <Image
                src="/empty.png"
                alt="Empty Bills"
                width={100}
                height={100}
                className="mb-4"
              />
              <p className="font-medium text-gray-800">
                Nenhuma dívida cadastrada!
              </p>
              <p className="text-sm font-normal text-gray-400">
                Cadastre agora mesmo uma dívida que você precisa pagar para
                alguém
              </p>
            </div>
          )}
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
