import { createTRPCRouter } from "@/trpc";

// Participation router:
import { participationRouter } from "./routers/participation.router";

export const appRouter = createTRPCRouter({
  participation: participationRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
