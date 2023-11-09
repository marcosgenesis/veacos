import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { log } from "next-axiom";
import { useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
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

  value: z
    .number({ invalid_type_error: "O valor precisa ser um número" })
    .nonnegative("O valor precisa ser positivo")
    .gte(1, "O valor precisa ser maior que 0"),
});
type Bill = z.infer<typeof createBillSchema>;

const CreateBillModal = ({ isPersonal = false }: CreateBillModalProps) => {
  const { data: sessionData } = useSession();
  const [qtdInstallments, setQtdInstallments] = useState(1);
  const [valueField, setValueField] = useState("");
  const { handleSubmit } = useForm<Bill>({
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
          <form
            onSubmit={handleSubmit(handleCreateSubmit)}
            className="mt-4 flex flex-col gap-4"
          >
            <Input title="Título da dívida" placeholder="teste" />
            <Input title="Veaco" />
            <Input title="Valor" placeholder="R$ 0,00" />
            <SearchOrCreateCategory />
          </form>
        </div>
        <div className="absolute bottom-0 w-full p-4 gap-2 flex sm:flex-col md:flex border-t-[1px] border-gray-300">
          <Button isFullWidth>Cancelar</Button>
          <Button isFullWidth variant="solid">Registrar dívida</Button>
        </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateBillModal;
