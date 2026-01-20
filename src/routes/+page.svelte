<script>
	import Tags from '$lib/components/Tags.svelte';
	import ProjectPreview from '$lib/components/ProjectPreview.svelte';
	import ProjectsList from '$lib/components/ProjectsList.svelte';
	import { normalizeList } from '$lib/utils';
	import Threlte from '$lib/components/three/Threlte.svelte';

	const { data } = $props();

	let previewProject = $state();
	let showPreview = $state();

	const handleProjectHover = (project) => {
		showPreview = true;
		previewProject = project.meta;
		previewProject.path = project.path;
	}

	const handleMainHover = () => {
		showPreview = false;
	}
</script>

<ProjectPreview
	show={showPreview}
	project={previewProject}
	class="fixed inset-x-8 z-2 h-[38vh] backdrop-blur-lg md:top-[50%] md:left-8 md:h-[50vh] md:w-[30vw] md:-translate-y-[50%] md:bg-none"
>
	<div class="h-full">
		<h1 class="font-serif text-lg md:text-2xl">Samay R. Shah - Tech Artist</h1>
		<hr class="mb-2" />
		<div class="max-h-[40%] overflow-y-scroll md:max-h-[70%]">
			<Tags tags={data.skills} color="orange-200" hoverColor="orange-500" />
		</div>
		<p class="mt-4 text-sm md:text-lg">
			mail: <a class="text-red-500 underline hover:text-red-500" href="mailto:srs6812@rit.edu"
				>srs6812@rit.edu</a
			>
		</p>
		<p class="text-sm md:text-lg">Rochester, NY - open to relocation</p>
	</div>
</ProjectPreview>

<ProjectsList
	projects={data.projects}
	onProjectHover={handleProjectHover}
	onMainHover={handleMainHover}
/>

<div class="fixed inset-0 h-full w-full -z-1">
	<Threlte />
</div>
