<script>
	import Tags from '$lib/components/Tags.svelte';
	import { cn, normalizeList } from '$lib/utils';
	import Description from '$lib/components/Description.svelte';

	const { show = false, project, children, class: className } = $props();
</script>

<div
	class={cn(
		'overflow-hidden rounded-2xl border-4 border-orange-200 p-4 text-xs text-orange-200',
		className
	)}
>
	{#if show}
		<div class="h-full w-full" id="project-preview">
			<a href="{project.path}"><h1 class="font-serif text-2xl">{project.title}</h1></a>
			<hr class="mb-2" />
			<Tags color="orange-200" hoverColor="orange-500" tags={normalizeList(project.skills)} />
			{#if project.preview}<img class="mt-2" src={project.preview} alt={project.title} />{/if}
			<Description description={project.description} />
		</div>
	{:else}
		{@render children?.()}
	{/if}
</div>

<style lang="postcss">
	@reference "tailwindcss";

	#project-preview {
		overflow-y: scroll;
		scrollbar-color: var(--color-orange-600) transparent;
  		scrollbar-width: thin;
	}
</style>
