import { createTRPCRouter } from "./trpc";
import { exampleRouter } from "./routers/example";
import { billRouter } from "./routers/bill";
import { categoryRouter } from "./routers/category";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  bill: billRouter,
  category: categoryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
