import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { api } from "../utils/api";
import { RiDeleteBin2Line, RiTimeLine } from "react-icons/ri";

const Home: NextPage = () => {
  const { data: sessionData } = useSession();
  const bills = api.bill.getAllFromUser.useQuery();
  const deleteBill = api.bill.deleteBill.useMutation();
  const payInstallment = api.bill.payInstallment.useMutation();

  async function handleDeleteBill(id: string) {
    try {
      await deleteBill.mutateAsync({ billId: id });
      await bills.refetch();
    } catch (error) {
      console.log(error);
    }
  }

  async function handlePayInstallment(id: string) {
    try {
      await payInstallment.mutateAsync({ id });
      await bills.refetch();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <Head>
        <title>Quem me deve</title>
      </Head>
      <main className="mt-12 flex min-h-screen flex-col items-center">
        <div className="flex w-3/6 items-center justify-between ">
          <div className="flex items-center justify-center gap-2">
            <img
              src={sessionData?.user?.image}
              alt="User profile"
              className=" w-16 rounded-lg"
            />
            <div>
              <p className=" text-lg">{sessionData?.user?.name}</p>
              <p className="text-xs text-gray-400">
                {sessionData?.user?.email}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <button className="h-10 rounded-xl bg-black px-8 py-2 text-white hover:bg-gray-800">
              <Link href="/create">Criar nova conta</Link>
            </button>
            <button
              className="rounded-xl bg-black px-8 py-2 font-semibold text-white no-underline transition hover:bg-gray-800"
              onClick={sessionData ? () => void signOut() : () => void signIn()}
            >
              {sessionData ? "Sair" : "Logar"}
            </button>
          </div>
        </div>
        <div className="w-6/12">
          {bills.data?.length === 0 && (
            <p className="text-center text-black/30">
              Nenhuma conta cadastrada
            </p>
          )}
          {bills.isSuccess &&
            bills.data.map((item) => (
              <div
                key={item.id}
                className="flex items-center rounded-md py-4 px-2"
              >
                <div className="rounded-sm bg-slate-100 p-4">
                  <p className="truncate text-xl font-medium">{item.debtor}</p>
                  <div className="flex gap-2">
                    <RiTimeLine />
                    <p className="text-xs">
                      {item.created_at.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex max-w-6xl gap-2 overflow-hidden">
                  {item.installment.map((installment) => (
                    <div
                      key={installment.id}
                      className="cursor-pointer rounded-sm border-2 border-gray-100 p-4"
                      onClick={() => handlePayInstallment(installment.id)}
                    >
                      <p className="text-xs text-black/40">
                        {installment.date.toLocaleDateString()}
                      </p>
                      <p>{installment.value.toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                <div>
                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-lg hover:bg-black/10"
                    onClick={() => handleDeleteBill(item.id)}
                  >
                    <RiDeleteBin2Line />
                  </button>
                </div>
              </div>
            ))}
        </div>
      </main>
    </>
  );
};

export default Home;
