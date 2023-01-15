import { Bill } from "@prisma/client";
import { addMonths } from "date-fns";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const billRouter = createTRPCRouter({
  createBill: protectedProcedure
    .input(
      z.object({
        user: z.string().uuid(),
        debtor: z.string().min(3),
        value: z.number().nonnegative().gte(1),
        qtdInstallments: z.number().nonnegative().int(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const valuePerInstallment = input.value / input.qtdInstallments;
      const bill = await ctx.prisma.bill.create({
        data: { debtor: input.debtor, userId: input.user },
      });

      for (let index = 0; index < input.qtdInstallments; index++) {
        await ctx.prisma.installment.create({
          data: {
            value: valuePerInstallment,
            date: addMonths(new Date(), index + 1),
            Bill: { connect: { id: bill.id } },
          },
        });
      }
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
