<script>
	/* eslint-disable svelte/no-navigation-without-resolve */
	const { children, experiences } = $props();
</script>

<div class="relative w-full rounded-lg bg-accent p-4">
	{#each experiences as experience (experience.id)}
		<div class="absolute inset-y-0 left-6 w-1 bg-accent-foreground" aria-hidden="true"></div>
		<a
			href={experience.href}
			target="_blank"
			rel="noopener noreferer"
			class="absolute top-4 left-6 flex size-10 -translate-x-1/2 items-center justify-center rounded-full border border-accent-foreground bg-accent-foreground"
		>
			<img src={experience.logo} alt={experience.name} class="rounded-full object-contain" />
		</a>
		<div class="ml-8">
			<h2>{experience.title}</h2>
			<p class="text-sm whitespace-pre-line opacity-80">
				{#each experience.description as line (line)}
					{line}<br>
				{/each}
			</p>
		</div>
	{/each}

	{#if children}
		<div class="ml-8">
			{@render children()}
		</div>
	{/if}
</div>
