import Image from "next/image";
import React from "react";
import Bill from "../components/Bill";
import CreateBillModal from "../components/CreateBillModal";
import { Header } from "../components/Header";
import Layout from "../components/Layout";
import MobileTabs from "../components/Sidebar/Tabs";
import { api } from "../utils/api";

const MyBills: React.FC = () => {
  const { data: bills, isSuccess } = api.bill.getAllFromUser.useQuery(
    {
      isPersonal: true,
    },
    { keepPreviousData: false }
  );

  return (
    <Layout>
      <Header>
        <div className="mt-4 flex w-full flex-col items-center justify-center gap-2 md:w-fit">
          <CreateBillModal isPersonal />
          <div className="w-full md:hidden">
            <MobileTabs />
          </div>
        </div>
      </Header>
      <div className="m-4 columns-1 md:columns-2">
        {isSuccess && bills.length === 0 && (
          <div className="flex flex-col items-center text-center">
            <Image
              src="/empty.png"
              alt="Empty Bills"
              width={100}
              height={100}
              className="mb-4"
            />
            <p className="font-medium text-gray-800 ">
              Nenhuma dívida cadastrada!
            </p>
            <p className="text-sm font-normal text-gray-400">
              Cadastre agora mesmo uma dívida que você precisa pagar para alguém
            </p>
          </div>
        )}
        {isSuccess && bills.map((item) => <Bill key={item.id} bill={item} />)}
      </div>
    </Layout>
  );
};

export default MyBills;
