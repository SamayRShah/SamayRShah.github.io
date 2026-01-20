<script>
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div
	class="main-transition-bar pointer-events-none fixed inset-0 z-40 translate-x-full bg-blend-multiply"
	aria-hidden="true"
></div>

<style lang="postcss">
	@reference "tailwindcss";

	.main-transition-bar {
		view-transition-name: main-transition-bar;
	}

	/* Animate the main-transition-bar group */
	::view-transition-group(root) {
		animation: none;
	}

	::view-transition-old(main-transition-bar) {
		animation: none;
	}

	::view-transition-old(main-transition-bar) {
		animation: none;
	}

	::view-transition-group(main-transition-bar) {
		animation:
			slide-in 0.5s forwards,
			color-fade-in 0.3s forwards,
			color-fade-out 0.3s forwards 0.5s,
			slide-out 0.5s forwards 0.5s;
	}

	::view-transition-group(root) {
		animation: none;
	}

	::view-transition-old(root) {
		animation: slide-out 0.5s ease forwards 0.5s;
	}

	::view-transition-new(root) {
		animation: slide-in 0.5s ease forwards 1;
	}

	/* Keyframes */
	@keyframes slide-in {
		from {
			transform: translateX(100%);
		}
		to {
			transform: translateX(0);
		}
	}

	@keyframes slide-out {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(-100%);
		}
	}

	@keyframes color-fade-in {
		from {
			background-color: black;
		}
		to {
			background-color: var(--color-orange-200);
		}
	}

	@keyframes color-fade-out {
		from {
			background-color: var(--color-orange-200);
		}
		to {
			background-color: black;
		}
	}
</style>
