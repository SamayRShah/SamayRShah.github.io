import { normalizeList } from '$lib/utils';
import { fetchMdProjects } from '$lib/utils/server';
import { json } from '@sveltejs/kit';

export const GET = async () => {
    const allProjects = await fetchMdProjects();

    const skills = Array.from(
        new Set(allProjects.flatMap((project) => normalizeList(project.meta.skills)))
    );
    
    return json(skills);
};
