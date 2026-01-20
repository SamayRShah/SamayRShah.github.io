<script>
	import { onMount } from 'svelte';
	import Tags from '$lib/components/Tags.svelte';

	let skills = $state();

	onMount(async () => {
		const response = await fetch(`/api/skills`);
		skills = await response.json();
	});

	const { class: classNames = ''} = $props();
</script>

<section>
	<h2 class="mb-2">Skills</h2>
	<Tags tags={skills} class={classNames} color="orange-200" hoverColor="orange-500" />
</section>
