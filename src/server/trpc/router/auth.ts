import { router, publicProcedure, protectedProcedure } from "../trpc";

export const authRouter = router({
	getSession: publicProcedure.query(({ ctx }) => {
		return ctx.session;
	}),
	getSecretMessage: protectedProcedure.query(() => {
		return "you can now see this secret message!";
	}),
	getUserEvents: protectedProcedure.query(async ({ ctx }) => {
		const { user } = ctx.session;
		const events = await ctx.prisma.event.findMany({
			where: {
				ownerId: user.id
			},
		});
		console.log(events);
		return events;
	})
});
