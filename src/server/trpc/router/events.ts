import { z } from "zod";

import { router, protectedProcedure, publicProcedure } from "../trpc";

export const eventsRouter = router({
	getUserEvents: protectedProcedure.query(async ({ ctx }) => {
		const { user } = ctx.session;
		const events = await ctx.prisma.event.findMany({
			where: {
				ownerId: user.id
			},
		});
		console.log(events);
		return events;
	}),
	getEvent: publicProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const event = await ctx.prisma.event.findUnique({
				where: {
					id: input.id,
				},
			});

			return event;
		}),
	getEventBySlug: publicProcedure
		.input(z.object({ slug: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const event = await ctx.prisma.event.findUnique({
				where: {
					slug: input.slug,
				},
			});

			return event;
		}),
	addGuest: publicProcedure
		.input(z.object({
			name: z.string().min(1).regex(/^(\w+ ?)+$/),
			emoji: z.string().min(1),
			eventId: z.string()
		}, {
			invalid_type_error: 'Invalid type',
			required_error: 'Required',
		}))
		.mutation(async ({ ctx, input }) => {
			const event = await ctx.prisma.event.findUnique({
				where: {
					id: input.eventId,
				},
			});

			if (!event) {
				console.log("No event found", input.eventId);
				return null;
			}

			const currGuestList = event.guests;

			const guestString = `${input.name}#${input.emoji}`;

			const guest = await ctx.prisma.event.update({
				where: {
					id: input.eventId,
				},
				data: {
					guests: currGuestList === '' ? guestString : `${currGuestList},${guestString}`
				},
			});

			return guest;
		}),
	makeEvent: protectedProcedure
		.input(z.object({
			name: z.string().min(1),
			description: z.string().min(1),
			color: z.string().min(1),
			location: z.string().min(1),
			date: z.date(),
		}))
		.mutation(async ({ ctx, input }) => {
			const { user } = ctx.session;

			let slug = input.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
			let slugValid = false;
			do {
				const slugExists = await ctx.prisma.event.findUnique({
					where: {
						slug: slug
					},
				});
				if (slugExists) {
					slug = slug + Math.floor(Math.random() * 100);
				} else {
					slugValid = true;
				}
			} while (!slugValid);

			const event = await ctx.prisma.event.create({
				data: {
					title: input.name,
					description: input.description,
					color: input.color,
					location: input.location,
					date: input.date,
					ownerId: user.id,
					link: '',
					slug: slug
				},
			});

			return event;
		}
		),
});
