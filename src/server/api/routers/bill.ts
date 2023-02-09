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
  getDetailedBillFromUser: protectedProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      return ctx.prisma.bill.findFirst({ where: { id: input.id } });
    }),
  getAllFromUser: protectedProcedure
    .input(z.object({ search: z.string().optional().default("") }))
    .query(async ({ input, ctx }) => {
      const bills = await ctx.prisma.bill.findMany({
        where: {
          User: {
            email: ctx.session.user.email,
          },
          OR: [
            { title: { contains: input.search } },
            { debtor: { contains: input.search } },
          ],
        },
        include: { installment: true },
      });

      return bills.map((bill) => {
        const info = bill.installment.reduce(
          (acc, item) => {
            if (item.payed) {
              acc = {
                total: acc.total + item.value,
                payed: acc.payed + item.value,
              };
              return acc;
            }
            return { ...acc, total: acc.total + item.value };
          },
          { total: 0, payed: 0 }
        );
        return { ...bill, ...info };
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
    .input(z.object({ id: z.string(), payed: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.installment.update({
        where: { id: input.id },
        data: { payed: input.payed, updated_at: new Date() },
      });
    }),
});
