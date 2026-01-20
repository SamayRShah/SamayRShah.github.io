import { normalizeList } from '$lib/utils';

export const load = async ({ params }) => {
	const post = await import(`../${params.slug}.md`);

	return {
		content: post.default,
		meta: {
			...post.metadata,
			categories: normalizeList(post.metadata.categories),
			skills: normalizeList(post.metadata.skills)
		}
	};
};
