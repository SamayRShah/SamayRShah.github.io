export const load = async ({ fetch }) => {
	const skillsResponse = await fetch(`/api/skills`);
	const response = await fetch(`/api/projects`);
	const skills = await skillsResponse.json();
	const projects = await response.json();

	return {
		skills,
        projects
	};
};
