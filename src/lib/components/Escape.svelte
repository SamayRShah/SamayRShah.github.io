<script>
	import { cn } from "$lib/utils";

	let element;
    const { children, class: classNames } = $props();

	const portalAction = (el) => {
		const target = document.querySelector('main') ?? document.body;
		target.append(el);

		return {
			destroy() {
				el.remove();
			}
		};
	};
</script>

<div bind:this={element} use:portalAction class={cn('fixed inset-0 z-100', classNames)}>
	{@render children?.()}
</div>

<style lang="postcss">
    @reference "tailwindcss";
</style>
