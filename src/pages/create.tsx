import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { RiAddLine, RiSubtractLine } from "react-icons/ri";
import { api, RouterInputs } from "../utils/api";

type Bill = RouterInputs["bill"]["createBill"]

const Create: NextPage = () => {
  const { data: sessionData } = useSession();
  const createBill = api.bill.createBill.useMutation();
  const [qtdInstallments, setQtdInstallments] = useState(1);
  const { register, handleSubmit } = useForm<Bill>();
  const router = useRouter();

  const handleCreateSubmit:SubmitHandler<Bill> = async (date) =>{
    try {
      console.log(sessionData?.user);

      await createBill.mutateAsync({
        debtor: date.debtor,
        qtdInstallments,
        value: parseFloat(date.value),
        user: sessionData?.user?.email,
        title: date.title,
      });
      await router.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        onSubmit={handleSubmit(handleCreateSubmit)}
        className="rounded-md border-2 border-gray-200 bg-white p-4"
      >
        <p className="text-xl">Anote quem te deve!</p>
        <p className="text-xs text-black/60">
          Crie abaixo uma conta que algúem te deve, e faça o acompanhamento por
          aqui
        </p>
        <div className="mt-4">
          <label
            for="title"
            class="mb-2 block text-sm font-medium text-gray-900"
          >
            Nome da conta
          </label>
          <input
            type="text"
            id="title"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
            placeholder="10 real da pinga"
            required
            {...register("title")}
          />
        </div>
        <div className="mt-4">
          <label
            for="debtor"
            class="mb-2 block text-sm font-medium text-gray-900"
          >
            Nome do veaco
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
              for="value"
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
              for="first_name"
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
  );
};

export default Create;
