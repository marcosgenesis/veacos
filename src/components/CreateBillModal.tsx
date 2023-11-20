import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { log } from "next-axiom";
import { useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { Controller, FormProvider, useForm } from "react-hook-form";
import {
  Ri24HoursFill,
  RiAddLine,
  RiCloseLine,
  RiMoneyCnyBoxFill,
  RiMoneyDollarCircleLine,
  RiMoneyPoundBoxFill,
  RiMoneyPoundCircleFill,
} from "react-icons/ri";
import { api } from "../utils/api";
import Button from "./Button";
import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "./Sheet";
import { Input } from "./Input";
import SearchOrCreateCategory from "./Category/SearchOrCreateCategory";
interface CreateBillModalProps {
  isPersonal?: boolean;
}
const createBillSchema = z.object({
  title: z.string().min(3, "Este campo precisa conter no mínimo 3 caracteres"),
  debtor: z.string().min(3, "Este campo precisa conter no mínimo 3 caracteres"),
  category: z.enum([
    "dailyExpenses",
    "housing",
    "healthcare",
    "education",
    "transportation",
    "leisureAndEntertainment",
    "savingsAndInvestments",
    "debts",
    "insurance",
    "clothingAndAccessories",
  ]),
  value: z
    .string()
    .transform((value) => {
      return Number(value);
    })
    .refine(
      (value) => {
        return !isNaN(value);
      },
      { message: "Valor inválido" }
    ),
  installments: z.string({
    required_error: "Este campo é obrigatório",
  }).min(1, "Este campo precisa conter no mínimo 1 valor")
});
type Bill = z.infer<typeof createBillSchema>;

const CreateBillModal = ({ isPersonal = false }: CreateBillModalProps) => {
  const { data: sessionData } = useSession();
  const [qtdInstallments, setQtdInstallments] = useState(1);
  const [valueField, setValueField] = useState("");
  const methods = useForm<Bill>({
    resolver: zodResolver(createBillSchema),
  });
  const queryClient = useQueryClient();
  const createBill = api.bill.createBill.useMutation();

  const handleCreateSubmit: SubmitHandler<Bill> = async (data) => {
    try {
      console.log({ data });

      // await createBill.mutateAsync({
      //   debtor: data.debtor,
      //   qtdInstallments,
      //   value: data.value,
      //   user: sessionData?.user?.email ?? "",
      //   title: data.title,
      //   isPersonal: isPersonal,
      // });
      // await queryClient.invalidateQueries();
      toast.success("Dívida criada");
    } catch (error) {
      log.error("Error: create personal bill", { error, data });
    }
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className="mx-4">
          <Button isFullWidth variant="solid" icon={RiAddLine}>
            Criar dívida
          </Button>
        </div>
      </SheetTrigger>
      <SheetContent size="md">
        <div className="relative h-screen">
          <div className="relative px-4 pt-4">
            <p className="text-lg font-medium">Nova dívida</p>
            <FormProvider {...methods}>
              <form
                id="create-bill-form"
                onSubmit={methods.handleSubmit(handleCreateSubmit)}
                className="mt-4 flex flex-col gap-4"
              >
                <Controller
                  name="title"
                  control={methods.control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Input
                        title="Título da dívida"
                        placeholder="teste"
                        error={methods.formState.errors.title}
                        {...field}
                      />
                    );
                  }}
                />
                <Controller
                  name="debtor"
                  control={methods.control}
                  defaultValue=""
                  render={({ field }) => {
                    return (
                      <Input
                        title="Veaco"
                        placeholder="teste"
                        {...field}
                        error={methods.formState.errors.debtor}
                      />
                    );
                  }}
                />
                <div className="flex gap-4">
                  <Controller
                    name="value"
                    control={methods.control}
                    render={({ field }) => {
                      return (
                        <Input
                          title="Valor"
                          defaultValue={0}
                          isFullWidth
                          {...field}
                          error={methods.formState.errors.value}
                          value={field.value}
                        />
                      );
                    }}
                  />
                  <Controller
                    name="installments"
                    control={methods.control}
                    render={({ field }) => {
                      return (
                        <Input
                          title="Quantidade de parcelas"
                          placeholder="3x"
                          isFullWidth
                          {...field}
                          error={methods.formState.errors.installments}
                          value={field.value}
                        />
                      );
                    }}
                  />
                </div>
                <SearchOrCreateCategory />
              </form>
            </FormProvider>
          </div>
          <div className="absolute bottom-0 flex w-full flex-col gap-2 border-t-[1px] border-gray-300  p-4 sm:flex-row">
            <Button isFullWidth>Cancelar</Button>
            <Button
              isFullWidth
              variant="solid"
              type="submit"
              form="create-bill-form"
            >
              Registrar dívida
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateBillModal;
