<script>
	import { normalizeList } from '$lib/utils';
	import { onMount } from 'svelte';
	import Tags from '$lib/components/Tags.svelte';
	import DateRange from '$lib/components/DateRange.svelte';
	import Description from '../Description.svelte';

	onMount(async () => {
		const response = await fetch(`/api/projects`);
		projects = await response.json();
	});

	let projects = $state();
</script>

<section>
	<h2 class="mb-2">Projects</h2>
	<ul class="not-prose list-none">
		{#each projects as project}
			<li>
				<a href={project.path} class="group">
					<div class="flex justify-between p-1">
						<h3 class="group-hover:-translate-x-2">{project.meta.title}</h3>
						<DateRange
							start={project.meta.start}
							end={project.meta.end}
							class="group-hover:translate-x-2"
						/>
					</div>
					<Tags
						tags={normalizeList(project.meta.skills)}
						class="ml-0"
						color="orange-200"
						hoverColor="orange-500"
					/>

					<Description description={project.meta.description} class="pl-4" />
				</a>
			</li>
			<hr class="mt-2 mb-2" />
		{/each}
	</ul>
</section>
