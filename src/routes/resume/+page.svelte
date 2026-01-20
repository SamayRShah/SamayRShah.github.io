<script>
	import Skills from '$lib/components/sections/Skills.svelte';
	import ExperienceEducation from '$lib/components/sections/ExperienceEducation.svelte';
	import Socials from '$lib/components/Socials.svelte';
	import Tags from '$lib/components/Tags.svelte';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import { MapPin } from '@lucide/svelte/icons';
	import ResumeProjects from '$lib/components/sections/ResumeProjects.svelte';
	import { about } from '$lib/data/index.js';
	const { data } = $props();
</script>

<article class="container prose prose-invert pl-0 pr-0">
	<h1 class="mb-0 font-serif">Samay R. Shah</h1>
	<section>
		<p class="mt-2">
			<span class="flex items-center gap-2"
				><MapPin class="size-4" color="var(--color-red-500)" />
				{ about.location}</span
			>
			{ about.description }
		</p>
		<Socials class="not-prose gap-3" size="5" />
	</section>
    <ExperienceEducation />
	<Skills class="not-prose"/>
	<ResumeProjects />
</article>
