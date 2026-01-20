<script>
	import './layout.css';
	import Header from '$lib/components/Header.svelte';
	import ViewTransition from '$lib/components/ViewTransition.svelte';

	let { children, data } = $props();
</script>

<ViewTransition />

<Header />
{#key data.currentRoute}
	<main class="container mt-16 md:mt-32">
		{@render children()}
	</main>
{/key}
