import { useQueryClient } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import { ptBR } from "date-fns/locale";
import { log } from "next-axiom";
import React from "react";
import { RiDeleteBin2Line, RiUserLine } from "react-icons/ri";
import { api, RouterOutputs } from "../../utils/api";
import Installment from "../Installment";
import { Spinner } from "../Spinner";

type Bill = RouterOutputs["bill"]["getAllFromUser"];

interface BillProps {
  bill: {
    total: number;
    payed: number;
    id: string;
    title: string;
    debtor: string;
    created_at: Date;
    updated_at: Date;
    userId: string | null;
    installment: Installment[];
  };
}
const Bill = ({ bill }: BillProps) => {
  const deleteBill = api.bill.deleteBill.useMutation();
  const queryClient = useQueryClient();

  async function handleDeleteBill(id: string) {
    try {
      await deleteBill.mutateAsync({ billId: id });
      await queryClient.invalidateQueries();
    } catch (error) {
      log.error("Error: delete bill", { error });
    }
  }

  return (
    <div key={bill.id} className="relative -z-0 flex flex-col">
      <div className="relative z-50 flex h-fit flex-wrap justify-between gap-2 rounded-md bg-white p-4 py-4 dark:border-2 dark:border-gray-800 dark:bg-gray-900 md:h-24 md:flex-nowrap">
        <div className="flex flex-col justify-between">
          <p className="truncate text-xl font-medium text-gray-800 dark:text-white">
            {bill.title}
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center">
              <RiUserLine className="fill-gray-400" />
              <p className="text-sm  font-medium text-gray-400">
                {bill.debtor}
              </p>
            </div>
            <p className="text-sm text-gray-400">
              {`Criada ${formatDistance(bill.created_at, new Date(), {
                addSuffix: true,
                locale: ptBR,
              })}`}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-1">
            <p className="">
              {bill.payed.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="text-sm text-gray-400">/</p>
            <p className="">
              {bill.total.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
          </div>
          <p className="text-xs uppercase text-gray-400">ganho/previsto</p>
        </div>
        {bill.total === bill.payed ? (
          <div className="flex items-center">
            <div className="flex h-8 items-center rounded-lg border-2 border-green-200 bg-green-100 p-3">
              <p className="text-sm font-medium text-green-600">
                Dívida quitada
              </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <p>
              {(bill.total - bill.payed).toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="text-xs uppercase text-gray-400">Ainda faltam</p>
          </div>
        )}
        <div className="flex items-center justify-center">
          <button
            onClick={() => handleDeleteBill(bill.id)}
            className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-gray-100 hover:bg-red-100 dark:border-gray-800"
          >
            {deleteBill.isLoading ? (
              <Spinner />
            ) : (
              <RiDeleteBin2Line className="fill-red-600" />
            )}
          </button>
        </div>
      </div>

      <div className="relative mt-2 flex flex-wrap gap-4">
        {bill.installment.map((installment) => (
          <Installment key={installment.id} installment={installment} />
        ))}
      </div>
    </div>
  );
};

export default Bill;
