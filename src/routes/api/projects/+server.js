import { fetchMdProjects } from '$lib/utils/server';
import { json } from '@sveltejs/kit';

export const GET = async () => {
	const allProjects = await fetchMdProjects();

	const sortedProjects = allProjects.sort((a, b) => {
		return new Date(b.meta.start) - new Date(a.meta.start);
	});

	return json(sortedProjects);
};