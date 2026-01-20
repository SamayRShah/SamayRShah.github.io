<script>
	import { cn } from '$lib/utils';

	const { description, class: classNames } = $props();

	const parseLine = (line) => {	
		const regex = /\[([^\]]+)\]\((.+?)\)/g;
		let result = [];
		let lastIndex = 0;
		let match;

		while ((match = regex.exec(line)) !== null) {
			if (match.index > lastIndex) {
				result.push({ type: 'text', content: line.slice(lastIndex, match.index) });
			}
			result.push({ type: 'link', text: match[1], url: match[2] });
			lastIndex = regex.lastIndex;
		}

		if (lastIndex < line.length) {
			result.push({ type: 'text', content: line.slice(lastIndex) });
		}

		return result;
	}
</script>

<ul class={cn('list-outside list-disc pl-4', classNames)}>
	{#each description as line}
		<li>
			{#each parseLine(line) as part}
				{#if part.type === 'text'}
					{part.content}
				{:else if part.type === 'link'}
					<a class="underline hover:text-orange-500" href={part.url} target="_blank" rel="noopener noreferrer">{part.text}</a>
				{/if}
			{/each}
		</li>
	{/each}
</ul>
