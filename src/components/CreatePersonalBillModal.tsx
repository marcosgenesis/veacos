import { useSession } from "next-auth/react";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { RiAddLine, RiCloseLine, RiSubtractLine } from "react-icons/ri";
import type { RouterInputs } from "../utils/api";
import { api } from "../utils/api";

type Bill = RouterInputs["bill"]["createBill"];

interface CreatePersonalBillModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreatePersonalBillModal = ({
  isOpen,
  onClose,
}: CreatePersonalBillModalProps) => {
  const { data: sessionData } = useSession();
  const [qtdInstallments, setQtdInstallments] = useState(1);
  const { register, handleSubmit, reset } = useForm<Bill>();
  const createBill = api.bill.createBill.useMutation();

  const handleCreateSubmit: SubmitHandler<Bill> = async (date) => {
    try {
      await createBill.mutateAsync({
        debtor: date.debtor,
        qtdInstallments,
        value: parseFloat(date.value),
        user: sessionData?.user?.email,
        title: date.title,
        isPersonal:true,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`absolute ${
        isOpen ? "flex" : "hidden"
      } h-screen w-screen items-center justify-center bg-black/50`}
    >
      <div className="w-1/4 rounded-lg bg-white shadow-md">
        <div className="flex justify-between rounded-t-lg bg-gray-100 p-4">
          <p className="text-xl font-medium">Criar dívida pessoal</p>
          <button
            onClick={() => {
              onClose();
              reset();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-200 hover:bg-gray-200"
          >
            <RiCloseLine />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleCreateSubmit)} className="p-4">
          <div className="mt-4">
            <label
              htmlFor="title"
              class="mb-2 block text-sm font-medium text-gray-900"
            >
              Nome da conta
            </label>
            <input
              type="text"
              id="title"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="10 real da pinga"
              required
              {...register("title")}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="debtor"
              class="mb-2 block text-sm font-medium text-gray-900"
            >
              Pra quem estou devendo?
            </label>
            <input
              type="text"
              id="debtor"
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
              placeholder="Fulano"
              required
              {...register("debtor")}
            />
          </div>
          <div class="mb-6 grid gap-6 md:grid-cols-2">
            <div className="mt-4">
              <label
                htmlFor="value"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                Valor que o veaco de deve
              </label>
              <input
                type="text"
                id="value"
                class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                placeholder="50 mirreis"
                required
                {...register("value")}
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="first_name"
                class="mb-2 block text-sm font-medium text-gray-900"
              >
                Em quantas vezes?
              </label>
              <div className="flex gap-2 text-center">
                <button
                  type="button"
                  onClick={() =>
                    setQtdInstallments((old) => (old !== 1 ? old - 1 : old))
                  }
                  class=" inline-flex items-center rounded-lg bg-black/90 p-2.5 text-center text-sm font-medium text-white hover:bg-black/80 focus:bg-black/70 focus:outline-none focus:ring-4"
                >
                  <RiSubtractLine size={20} />
                  <span class="sr-only">Icon description</span>
                </button>
                <div className="flex items-center justify-center">
                  <p className="text-center text-lg">{qtdInstallments}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setQtdInstallments((old) => old + 1)}
                  class="inline-flex items-center rounded-lg bg-black/90 p-2.5 text-center text-sm font-medium text-white hover:bg-black/80 focus:bg-black/70 focus:outline-none focus:ring-4"
                >
                  <RiAddLine size={20} />
                  <span class="sr-only">Icon description</span>
                </button>
              </div>
            </div>
          </div>
          <button
            type="submit"
            class="mr-2 mb-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
          >
            Criar Conta
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePersonalBillModal;
