<script>
	import { cn } from "$lib/utils";

	const {start, end, class: classNames} = $props();

	function parseYearMonth(value) {
		if (!value || value === 'present') return null;

		const [month, year] = value.split('-').map(Number);
		return new Date(year, month - 1, 1);
	}

	function formatRange(start, end) {
		if (!start) return '';

		const fmt = new Intl.DateTimeFormat('en-US', {
			month: 'short',
			year: 'numeric'
		});

		const startDate = parseYearMonth(start);
		const endDate = parseYearMonth(end);

		if (!startDate) return '';

		const startText = fmt.format(startDate);
		const endText =
			end === 'present'
				? 'Present'
				: endDate
					? fmt.format(endDate)
					: '';

		return endText ? `${startText} – ${endText}` : startText;
	}
</script>

{#if start}
	<span class={cn("no-wrap opacity-70 text-sm", classNames)}>
		{formatRange(start, end)}
	</span>
{/if}
