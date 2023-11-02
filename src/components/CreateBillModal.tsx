import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { log } from "next-axiom";
import { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { RiAddLine, RiCloseLine } from "react-icons/ri";
import { api } from "../utils/api";
import Button from "./Button";
import * as z from "zod";
import * as Dialog from "@radix-ui/react-dialog";
import { useQueryClient } from "@tanstack/react-query";
import { IconButton } from "./IconButton";
import { toast } from "sonner";
import MobileTabs from "./Sidebar/Tabs";
import { motion } from "framer-motion";
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
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <div className="mx-4">
          <Button isFullWidth variant="solid" icon={RiAddLine}>
            Criar dívida
          </Button>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-overlayShow fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className="fixed top-1/2 left-1/2 max-h-[85vh] w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-md bg-white p-4 shadow-lg focus:outline-none">
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
          <form
            onSubmit={handleSubmit(handleCreateSubmit)}
            className="flex flex-col gap-4"
          >
            <MobileTabs />
            <div className="z-50 bg-white">
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default CreateBillModal;
