<script>
	const { children, experiences } = $props();
	// name, href, title, logo, start, end, description
</script>

<div class="relative w-full rounded-lg bg-accent p-4">
	{#each experiences as experience}
		<div class="absolute inset-y-0 left-6 w-1 bg-accent-foreground" aria-hidden="true"></div>
		<a
			href={experience.href}
			class="absolute top-4 left-6 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent-foreground bg-accent-foreground"
		>
			<img src={experience.logo} alt={experience.name} class="rounded-full object-contain" />
		</a>
		<div class="ml-8">
			<h2>{experience.title}</h2>
			<p>{@html experience.description.join('<br />')}</p>
		</div>
	{/each}
	{#if children}
		<div class="ml-8">
			{@render children()}
		</div>
	{/if}
</div>
