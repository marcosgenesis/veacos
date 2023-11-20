import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "../trpc";

export const categoryRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const { name, color } = input;
      const category = await ctx.prisma.category.create({
        data: {
          name,
          color,
        },
      });
      return category;
    }),
  getAllGeneral: protectedProcedure
    .query(async ({ ctx }) => {
      return ctx.prisma.category.findMany({ where: { source: 'GENERAL' } });
    }),
});
