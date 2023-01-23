import { Bill } from "@prisma/client";
import { addMonths } from "date-fns";
import { z } from "zod";

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc";

export const billRouter = createTRPCRouter({
  createBill: protectedProcedure
    .input(
      z.object({
        user: z.string().email(),
        title: z.string().min(3),
        debtor: z.string().min(3),
        value: z.number().nonnegative().gte(1),
        qtdInstallments: z.number().nonnegative().int(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const valuePerInstallment = input.value / input.qtdInstallments;
      const findUser = await ctx.prisma.user.findFirst({
        where: { email: ctx.session.user.email },
      });
      if (findUser) {
        const bill = await ctx.prisma.bill.create({
          data: {
            debtor: input.debtor,
            userId: findUser.id,
            title: input.title,
          },
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
      }
    }),

  getAllFromUser: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.bill.findMany({
      where: { User: { email: ctx.session.user.email } },
      include: { installment: true },
    });
  }),

  deleteBill: protectedProcedure
    .input(
      z.object({
        billId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.bill.delete({ where: { id: input.billId } });
    }),

  payInstallment: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.installment.update({
        where: { id: input.id },
        data: { payed: true, updated_at: new Date() },
      });
    }),
});
