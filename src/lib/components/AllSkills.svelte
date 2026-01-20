<script>
	import { onMount } from 'svelte';
	import Tags from './Tags.svelte';

	let skills = $state();

	onMount(async () => {
		const response = await fetch(`/api/skills`);
		skills = await response.json();
	});

	const { class: classNames = '', color, hoverColor } = $props();
</script>

<Tags tags={skills} class={classNames} color={color} hoverColor={hoverColor}/>
