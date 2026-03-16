<script>
	import DateRange from '$lib/components/DateRange.svelte';
	import PositionCategories from '$lib/components/PositionCategories.svelte';
	import BackButton from '$lib/components/BackButton.svelte';
	import Tags from '$lib/components/Tags.svelte';
	const { data } = $props();
</script>

<div class="md:fixed max-md:hidden">
	<BackButton />
</div>

<article class="container prose pr-0 pl-0 prose-invert">
	<h1 class="mb-0 font-serif">{data.meta.title}</h1>
	<p class="mt-0 mb-0"><DateRange start={data.meta.start} end={data.meta.end} /></p>
	<PositionCategories
		class="not-prose"
		position={data.meta.position}
		categories={data.meta.categories}
	/>
	<Tags tags={data.meta.skills} class="not-prose mt-1" color="orange-200" hoverColor="orange-500" />
	{#if data.meta.preview}<img src={data.meta.preview} alt={data.meta.title} />{/if}
	<data.content />
</article>
