import { useRouter } from "next/router";
import { useEffect } from "react";
import { trpc } from "../../utils/trpc";

const Slug = () => {
	const { query: { slug }, push } = useRouter();
	const { mutate: getSlug, data: slugData } = trpc.events.getEventBySlug.useMutation();

	useEffect(() => {
		if (!slug) return;

		getSlug({
			slug: slug as string,
		});
	}, [slug]);

	useEffect(() => {
		if (!slugData) return;
		push(`/e/${slugData?.id}`);
	}, [slugData]);

	return (
		<div className="pt-24 px-5 text-7xl font-bold">
			<p>Loading event...</p>
		</div>
	);
}

export default Slug;
