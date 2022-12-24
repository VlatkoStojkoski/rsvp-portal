import { router } from "../trpc";
import { authRouter } from "./auth";
import { eventsRouter } from "./events";

export const appRouter = router({
	events: eventsRouter,
	auth: authRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
