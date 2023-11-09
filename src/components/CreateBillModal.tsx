import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { log } from "next-axiom";
import { useRef, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { Ri24HoursFill, RiAddLine, RiCloseLine } from "react-icons/ri";
import { api } from "../utils/api";
import Button from "./Button";
import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { IconButton } from "./IconButton";
import { toast } from "sonner";
import MobileTabs from "./Sidebar/Tabs";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "./Sheet";
import { Input } from "./Input";
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
  const sheetRef = useRef(null);
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
      <SheetContent size="sm">
        <div className="px-4 pt-4">
          <p className="text-lg font-medium">Nova dívida</p>
          <form
            onSubmit={handleSubmit(handleCreateSubmit)}
            className="flex flex-col gap-4"
          >
            <Input title="Título da dívida" placeholder="teste" />
            <Input title="Veacos" />
            <div>
              <p className="mb-4 text-right text-6xl font-semibold">
                {valueField}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                  <Button
                    key={item}
                    isFullWidth
                    onClick={() => setValueField((old) => old.concat(item))}
                  >
                    {item}
                  </Button>
                ))}
                <Button
                  isFullWidth
                  onClick={() => setValueField((old) => old.concat("."))}
                >
                  ,
                </Button>
                <Button
                  isFullWidth
                  onClick={() => setValueField((old) => old.concat("0"))}
                >
                  0
                </Button>
                <Button
                  isFullWidth
                  onClick={() =>
                    setValueField((old) => old.substr(0, old.length - 1))
                  }
                >
                  Delete
                </Button>
              </div>
            </div>
            <motion.div
              animate={valueField.length > 0 ? "visible" : "hidden"}
              variants={{
                hidden: {
                  y: -60,
                  display: "none",
                },
                visible: {
                  y: 0,
                  display: "block",
                },
              }}
              transition={{
                duration: 0.6,
              }}
            >
              <Button isFullWidth variant="solid">
                Próximo
              </Button>
            </motion.div>
          </form>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CreateBillModal;
