import React, { useEffect } from "react";

import { api } from "../utils/api";

import Bill from "../components/Bill";
import { type GetServerSideProps } from "next";
import { getServerAuthSession } from "../server/auth";
import Layout from "../components/Layout";
import { Header } from "../components/Header";
import CreateBillModal from "../components/CreateBillModal";
import MobileTabs from "../components/Sidebar/Tabs";

const Home: React.FC = () => {
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
      <Header>
        <div className="flex flex-col items-center justify-center mt-4 gap-2 w-full md:w-fit">
          <CreateBillModal />
          <div className="md:hidden w-full">
            <MobileTabs />
          </div>
        </div>
      </Header>
      <div className="m-4 columns-1 md:columns-2">
        {isLoading && <p>Carregando...</p>}

        {bills?.length === 0 && (
          <p className="text-center text-black/30">Nenhuma conta cadastrada</p>
        )}
        {isSuccess && bills.map((item) => <Bill key={item.id} bill={item} />)}
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
