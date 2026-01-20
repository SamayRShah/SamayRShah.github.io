<script>
	import { cn } from "$lib/utils";

	let { position, categories, class:classNames } = $props();
</script>

<span class={cn("flex items-center justify-start gap-2 h-shrink", classNames)}>
	{#if position}
		<strong>
			{position} ·
		</strong>
	{/if}
	{#if categories}
		{#each categories as category}
			<span class="capitalize bold">
				{category}
			</span>
		{/each}
		<p>Project</p>
	{/if}
</span>
