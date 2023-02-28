import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { log } from "next-axiom";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import Button from "../components/Button";
import Input from "../components/Input";
import { api, RouterInputs } from "../utils/api";

type Bill = RouterInputs["bill"]["createBill"];

const Create: NextPage = () => {
  const { data: sessionData } = useSession();
  const createBill = api.bill.createBill.useMutation();
  const [qtdInstallments, setQtdInstallments] = useState(1);
  const { register, handleSubmit } = useForm<Bill>();
  const router = useRouter();

  const handleCreateSubmit: SubmitHandler<Bill> = async (date) => {
    try {
      await createBill.mutateAsync({
        debtor: date.debtor,
        qtdInstallments,
        value: date.value,
        user: sessionData?.user?.email ?? "",
        title: date.title,
      });
      await router.push("/");
    } catch (error) {
      log.error("create bill", { error, date });
    }
  };

  return (
    <div className="flex h-screen items-center justify-center dark:bg-gray-900">
      <form
        onSubmit={handleSubmit(handleCreateSubmit)}
        className="rounded-md border-2 border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <p className="text-xl">Anote quem te deve!</p>
        <p className="text-xs text-black/60 dark:text-gray-400">
          Crie abaixo uma conta que algúem te deve, e faça o acompanhamento por
          aqui
        </p>
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
            {...register("title")}
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="debtor"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            Nome do veaco
          </label>
          <Input
            type="text"
            id="debtor"
            isFullWidth
            placeholder="Fulano"
            required
            {...register("debtor")}
          />
        </div>
        <div className="mb-6 grid gap-6 md:grid-cols-2">
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
              {...register("value", { valueAsNumber: true })}
            />
          </div>
          <div className="mt-4">
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
                className=" inline-flex items-center rounded-lg bg-black/90 p-2.5 text-center text-sm font-medium text-white hover:bg-black/80 focus:bg-black/70 focus:outline-none focus:ring-4 dark:bg-white dark:text-gray-900 hover:dark:bg-gray-200"
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
                className="inline-flex items-center rounded-lg bg-black/90 p-2.5 text-center text-sm font-medium text-white hover:bg-black/80 focus:bg-black/70 focus:outline-none focus:ring-4 dark:bg-white dark:text-gray-900 hover:dark:bg-gray-200"
              >
                <RiAddLine size={20} />
                <span className="sr-only">Icon description</span>
              </button>
            </div>
          </div>
        </div>
        <Button
          variant="solid"
          isFullWidth
          type="submit"
          // className="mr-2 mb-2 w-full rounded-lg bg-gray-800 px-5 py-2.5 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300"
        >
          Criar Conta
        </Button>
      </form>
    </div>
  );
};

export default Create;
