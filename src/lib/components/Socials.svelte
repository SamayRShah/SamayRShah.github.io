<script>
	import { cn } from '$lib/utils';
	import { socials } from '$lib/data';
	import { Github, Linkedin, Mail } from '@lucide/svelte';
	const icons = { Github: Github, Linkedin: Linkedin, Mail: Mail };

	const { class: classNames = '', size = '4' } = $props();

	const defaultClasses = 'flex flex-row flex-wrap gap-2 list-none text-xs uppercase';
</script>

<ul class={cn(defaultClasses, classNames)}>
	{#each socials as social}
		<li class="text-orange-200 opacity-50 hover:text-orange-500 hover:opacity-100">
			<a href={social.link} aria-label={social.name}>
				{#if icons[social.icon]}
                    {@const ActiveIcon = icons[social.icon]}
					<ActiveIcon class="size-{size}" />
				{:else}
					<strong>{social.name}</strong>
				{/if}
			</a>
		</li>
	{/each}
</ul>
