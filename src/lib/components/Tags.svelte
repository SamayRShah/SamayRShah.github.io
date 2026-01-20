<script>
	import { cn } from '$lib/utils';
	const {
		class: classNames = '',
		tags,
		route = 'skills',
		color = 'orange-200',
		hoverColor = 'orange-600'
	} = $props();

	const defaultClasses = 'flex flex-row flex-wrap gap-2 list-none text-xs uppercase';
</script>

<ul class={cn(defaultClasses, classNames)}>
	{#each tags as tag}
		<li class="rounded-sm border-2 opacity-80 hover:opacity-100 text-{color} hover:text-{hoverColor} hover:border-{hoverColor}">
			<span
				class="flex h-full w-full items-center justify-center px-2 py-0.5 text-center no-underline text-{color} hover:text-{hoverColor}"
			>
				{tag}
			</span>
		</li>
	{/each}
</ul>
