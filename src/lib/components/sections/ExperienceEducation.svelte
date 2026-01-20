<script>
	import * as Tabs from '$lib/components/ui/tabs/index';
	import { experiences, education } from '$lib/data/index';
	import ExperienceCard from '$lib/components/ExperienceCard.svelte';
</script>

<section>
	<h2>Experience & Education</h2>
	<Tabs.Root value="experience">
		<Tabs.List class="w-full p-1">
			<Tabs.Trigger class="cursor-pointer" value="experience">Experience</Tabs.Trigger>
			<Tabs.Trigger class="cursor-pointer" value="education">Education</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="experience">
			<ExperienceCard {experiences}>
			</ExperienceCard>
		</Tabs.Content>
		<Tabs.Content value="education">
			<ExperienceCard experiences={education} >
			</ExperienceCard>
		</Tabs.Content>
	</Tabs.Root>
</section>
