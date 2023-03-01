import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { log } from "next-axiom";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { RiAddLine, RiCloseLine, RiSubtractLine } from "react-icons/ri";
import type { RouterInputs } from "../utils/api";
import { api } from "../utils/api";
import Button from "./Button";
import { Input } from "./Input";
import * as z from "zod";
import { useQueryClient } from "@tanstack/react-query";

interface CreatePersonalBillModalProps {
  isOpen: boolean;
  onClose: () => void;
}
const createBillSchema = z.object({
  title: z.string().min(3, "Este campo precisa conter no mínimo 3 caracteres"),
  debtor: z.string().min(3, "Este campo precisa conter no mínimo 3 caracteres"),
  value: z
    .number({ invalid_type_error: "O valor precisa ser um número" })
    .nonnegative("O valor precisa ser positivo")
    .gte(1, "O valor precisa ser maior que 0"),
});
type Bill = z.infer<typeof createBillSchema>;

const CreatePersonalBillModal = ({
  isOpen,
  onClose,
}: CreatePersonalBillModalProps) => {
  const { data: sessionData } = useSession();
  const [qtdInstallments, setQtdInstallments] = useState(1);
  const { register, handleSubmit, reset, formState } = useForm<Bill>({
    resolver: zodResolver(createBillSchema),
  });
  const queryClient = useQueryClient();
  const createBill = api.bill.createBill.useMutation();

  const handleCreateSubmit: SubmitHandler<Bill> = async (data) => {
    try {
      await createBill.mutateAsync({
        debtor: data.debtor,
        qtdInstallments,
        value: data.value,
        user: sessionData?.user?.email ?? "",
        title: data.title,
        isPersonal: true,
      });
      await queryClient.invalidateQueries();
      onClose();
    } catch (error) {
      log.error("Error: create personal bill", { error, data });
    }
  };

  return (
    <div
      className={`absolute ${
        isOpen ? "flex" : "hidden"
      } h-screen w-screen items-center justify-center bg-black/50 p-2 md:p-0`}
    >
      <div className="w-full rounded-lg bg-white shadow-md dark:bg-gray-900 md:w-1/3">
        <div className="flex justify-between rounded-t-lg bg-gray-100 p-4 dark:bg-gray-800">
          <p className="text-xl font-medium">Criar dívida pessoal</p>
          <button
            onClick={() => {
              onClose();
              reset();
            }}
            className="flex h-8 w-8 items-center justify-center rounded-lg border-2 border-gray-200 hover:bg-gray-200 dark:border-gray-800 dark:hover:bg-gray-700"
          >
            <RiCloseLine />
          </button>
        </div>
        <form onSubmit={handleSubmit(handleCreateSubmit)} className="p-4">
          <div className="mt-4">
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Nome da conta
            </label>
            <Input
              type="text"
              id="title"
              isFullWidth
              placeholder="10 real da pinga"
              required
              error={formState.errors?.title}
              {...register("title")}
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="debtor"
              className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
            >
              Pra quem estou devendo?
            </label>
            <Input
              type="text"
              id="debtor"
              placeholder="Fulano"
              isFullWidth
              required
              error={formState.errors?.debtor}
              {...register("debtor")}
            />
          </div>
          <div className="mb-6 grid gap-6 md:grid-cols-2 ">
            <div className="mt-4">
              <label
                htmlFor="value"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Valor que o veaco de deve
              </label>
              <Input
                type="text"
                id="value"
                placeholder="50 mirreis"
                required
                isFullWidth
                defaultValue={0}
                error={formState.errors?.value}
                {...register("value", { valueAsNumber: true })}
              />
            </div>
            <div className="mt-4 flex w-full items-center justify-center gap-4 md:w-fit">
              <label
                htmlFor="first_name"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Em quantas vezes?
              </label>
              <div className="flex gap-2 text-center">
                <button
                  type="button"
                  onClick={() =>
                    setQtdInstallments((old) => (old !== 1 ? old - 1 : old))
                  }
                  className="inline-flex items-center rounded-lg bg-black/90 p-2.5 text-center text-sm font-medium text-white hover:bg-black/80 focus:bg-black/70 focus:outline-none focus:ring-4 dark:bg-white dark:text-black"
                >
                  <RiSubtractLine size={20} />
                  <span className="sr-only">Icon description</span>
                </button>
                <div className="flex items-center justify-center">
                  <p className="text-center text-lg">{qtdInstallments}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setQtdInstallments((old) => old + 1)}
                  className="inline-flex items-center rounded-lg bg-black/90 p-2.5 text-center text-sm font-medium text-white hover:bg-black/80 focus:bg-black/70 focus:outline-none focus:ring-4 dark:bg-white dark:text-black"
                >
                  <RiAddLine size={20} />
                  <span className="sr-only">Icon description</span>
                </button>
              </div>
            </div>
          </div>
          <Button
            type="submit"
            variant="solid"
            isFullWidth
            icon={RiAddLine}
            isLoading={createBill.isLoading}
          >
            Criar Conta
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreatePersonalBillModal;
