import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { log } from "next-axiom";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { RiAddLine, RiCloseLine, RiSubtractLine } from "react-icons/ri";
import { api } from "../utils/api";
import Button from "./Button";
import { Input } from "./Input";
import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { IconButton } from "./IconButton";
import { toast } from "sonner";

interface CreateBillModalProps {
  isPersonal?: boolean;
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

const CreateBillModal = ({ isPersonal = false }: CreateBillModalProps) => {
  const { data: sessionData } = useSession();
  const [qtdInstallments, setQtdInstallments] = useState(1);
  const { register, handleSubmit, formState } = useForm<Bill>({
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
        isPersonal: isPersonal,
      });
      await queryClient.invalidateQueries();
      toast.success("Dívida criada");
    } catch (error) {
      log.error("Error: create personal bill", { error, data });
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <Button isFullWidth icon={RiAddLine}>
          Criar dívida
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-8 shadow-lg focus:outline-none">
          <div className="flex w-full items-center justify-between">
            <Dialog.Title className="text-lg font-medium text-gray-900">
              Criar dívida
            </Dialog.Title>
            <Dialog.Close asChild>
              <IconButton>
                <RiCloseLine />
              </IconButton>
            </Dialog.Close>
          </div>
          <form onSubmit={handleSubmit(handleCreateSubmit)}>
            <div className="mt-4">
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
              >
                Título da dívida
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
                {isPersonal ? "Pra quem estou devendo?" : "Nome do veaco"}
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateBillModal;
