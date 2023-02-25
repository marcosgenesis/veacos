import React, { useState } from "react";
import { motion } from "framer-motion";
import { Installment } from "@prisma/client";
import { api } from "../utils/api";
import { RiCheckLine, RiErrorWarningLine } from "react-icons/ri";
import Confetti, { ConfettiConfig } from "react-dom-confetti";
import { useQueryClient } from "@tanstack/react-query";

interface InstallmentProps {
  installment: Installment;
}

const config:ConfettiConfig = {
  angle: 90,
  spread: 142,
  startVelocity: 40,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 1000,
  stagger: 5,
  width: "6px",
  height: "7px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

const Installment: React.FC<InstallmentProps> = ({ installment }) => {
  const [isConfettiActive, setIsConfettiActive] = useState(false);
  const payInstallment = api.bill.payInstallment.useMutation();
  const queryClient = useQueryClient();

  async function handlePayInstallment(id: string, payed: boolean) {
    try {
      await payInstallment.mutateAsync({ id, payed });
      setIsConfettiActive(false);
      await queryClient.invalidateQueries();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <motion.div
      key={installment.id}
      className="relative z-50 flex flex-grow cursor-pointer flex-col items-center rounded-lg bg-white p-4"
      onClick={async () => {
        !installment.payed && setIsConfettiActive(true);
        return handlePayInstallment(installment.id, !installment.payed);
      }}
    >
      <div className="flex items-center justify-center">
        {installment.payed ? (
          <RiCheckLine className="fill-green-600" />
        ) : (
          <RiErrorWarningLine className="fill-red-400" />
        )}
      </div>
      <p className="text-gray-900">
        {installment.value.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </p>
      <p className="text-xs text-gray-400">
        {`${installment.date.toLocaleDateString("pt-br")}`}
      </p>

      <Confetti active={isConfettiActive} config={config} />
    </motion.div>
  );
};

export default Installment;
