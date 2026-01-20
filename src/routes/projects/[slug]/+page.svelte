<script>
	import DateRange from '$lib/components/DateRange.svelte';
	import PositionCategories from '$lib/components/PositionCategories.svelte';
	import Tags from '$lib/components/Tags.svelte';
	const { data } = $props();
</script>

<article class="prose prose-invert container pl-0 pr-0">
	<h1 class="mb-0 font-serif">{data.meta.title}</h1>
	<p class="mt-0 mb-0"><DateRange start={data.meta.start} end={data.meta.end}/></p>
	<PositionCategories class="not-prose" position={data.meta.position} categories={data.meta.categories} />
	<Tags tags={data.meta.skills} class="mt-1 not-prose" color="orange-200" hoverColor="orange-500"/>
	{#if data.meta.preview }<img src={data.meta.preview} alt={data.meta.title} />{/if}
	<data.content />
</article>