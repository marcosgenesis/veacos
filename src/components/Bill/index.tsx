import { useQueryClient } from "@tanstack/react-query";
import { formatDistance } from "date-fns";
import { motion } from "framer-motion";
import { ptBR } from "date-fns/locale";
import { log } from "next-axiom";
import {
  RiArrowDownSLine,
  RiArrowUpSLine,
  RiDeleteBin2Line,
  RiMoneyDollarBoxLine,
  RiMoneyDollarCircleFill,
  RiMoneyDollarCircleLine,
  RiUserLine,
} from "react-icons/ri";
import { useDisclosure } from "../../hooks/useDisclosure";
import { api, type RouterOutputs } from "../../utils/api";
import { IconButton } from "../IconButton";
import Installment from "../Installment";

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
  const { isOpen, toggle } = useDisclosure(false);

  async function handleDeleteBill(id: string) {
    try {
      await deleteBill.mutateAsync({ billId: id });
      await queryClient.invalidateQueries();
    } catch (error) {
      log.error("Error: delete bill", { error });
    }
  }

  return (
    <div className="relative mb-4 flex break-inside-avoid flex-col flex-wrap justify-between gap-2 rounded-md border-[1px] border-gray-100 bg-white p-2 shadow-sm dark:border-2 dark:border-gray-800 dark:bg-gray-900 md:flex-nowrap">
      <div className="flex justify-between gap-4 rounded-md bg-gray-50 p-4">
        <div className="flex flex-col justify-between">
          <p className="truncate text-xl font-medium text-gray-800 dark:text-white">
            {bill.title}
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="flex items-center justify-center gap-2 rounded-full bg-gray-100 px-2 py-1">
              <RiUserLine className="fill-gray-500" />
              <p className="text-sm  font-medium text-gray-800">
                {bill.debtor}
              </p>
            </div>
            <div className="flex items-center justify-center gap-2 rounded-full bg-red-100 px-2 py-1">
              <RiMoneyDollarCircleFill className="fill-red-500" />
              <p className="text-sm  font-medium text-red-800">
                {bill.total.toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <IconButton
            destructive
            variant={"secundary-gray"}
            onClick={() => handleDeleteBill(bill.id)}
            isLoading={deleteBill.isLoading}
          >
            <RiDeleteBin2Line />
          </IconButton>
          <IconButton onClick={() => toggle()}>
            {isOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
          </IconButton>
        </div>
      </div>
      {isOpen && (
        <motion.div className="relative mt-2 flex flex-wrap gap-4">
          {bill.installment.map((installment) => (
            <Installment key={installment.id} installment={installment} />
          ))}
        </motion.div>
      )}
      {/* <div className="flex flex-col items-center justify-center">
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
        </div> */}
      {/* {bill.total === bill.payed ? (
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
        )} */}
    </div>
  );
};

export default Bill;
