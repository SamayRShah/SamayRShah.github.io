<script>
	import { onMount, onDestroy } from 'svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { media } from '$lib/utils';

	const { projects = [], onProjectHover = () => {}, onMainHover = () => {} } = $props();

	let projectList;
	let projectItems = [];
	let currentIndex = 0;
	let observer = null;
	let observerActive = false; // track if observer is currently active

	const scroll = (direction) => {
		if (!projectItems.length) return;

		currentIndex += direction;

		if (currentIndex < 0) currentIndex = projectItems.length - 1;
		else if (currentIndex > projectItems.length - 1) currentIndex = 0;

		projectItems[currentIndex].scrollIntoView({
			behavior: 'smooth',
			block: 'nearest',
			inline: 'nearest'
		});
	};

	const createObserver = () => {
		// disconnect any existing observer
		if (observer) {
			observer.disconnect();
			observer = null;
		}

		projectItems = Array.from(projectList.querySelectorAll('.project a'));
		if (!projectItems.length) return;

		// Scroll to first item
		projectItems[currentIndex].scrollIntoView({
			behavior: 'auto',
			block: 'nearest',
			inline: 'nearest'
		});

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.dispatchEvent(new PointerEvent('pointerenter'));
						currentIndex = projectItems.indexOf(entry.target);
					}
				});
			},
			{
				threshold: 1
			}
		);

		projectItems.forEach((item) => observer.observe(item));
		observerActive = true;
	};

	const destroyObserver = () => {
		if (observer) {
			observer.disconnect();
			observer = null;
			observerActive = false;
		}
	};

	const onResize = () => {
		if (media('max-md')) {
			if (!observerActive) createObserver(); // only create if not already active
		} else {
			destroyObserver();
		}
	};

	onMount(() => {
		if (media('max-md')) createObserver();
	});

	onDestroy(() => {
		destroyObserver();
	});
</script>


<svelte:window on:resize={onResize} />

<div class="wrapper">
	<button onclick={() => scroll(-1)}>
		<ChevronLeft class="border-orange-200" />
	</button>
	<ul class="list projects" bind:this={projectList}>
		<li class="item project">
			<a href="/resume" class="main-link" onpointerenter={onMainHover}> Resume </a>
		</li>

		<hr />

		{#each projects as project, i}
			<li class="item project">
				<a href={project.path} class="project-link" onpointerenter={() => onProjectHover(project)}>
					{@html project.meta.display_title}
				</a>
			</li>
		{/each}
	</ul>
	<button onclick={() => scroll(1)}>
		<ChevronRight class="border-orange-200" />
	</button>
</div>

<style lang="postcss">
	@reference "tailwindcss";

	.wrapper {
		@apply max-md:fixed max-md:inset-x-0 max-md:bottom-20 max-md:flex max-md:items-center max-md:justify-between max-md:overflow-hidden max-md:px-12;

		button {
			@apply cursor-pointer md:hidden;
		}

		.list {
			@apply list-none font-serif transform-3d;
			@apply md:pointer-events-none md:absolute md:right-8 md:pt-[65vh] md:pb-[65vh] md:perspective-midrange;
			@apply max-md:flex max-md:snap-x max-md:snap-mandatory max-md:overflow-x-scroll;

			hr {
				@apply pointer-events-auto h-1 origin-right -rotate-y-45 border-2 border-orange-200 transition duration-250 transform-3d max-md:hidden;
			}

			.item {
				@apply pointer-events-auto origin-right text-center text-lg font-bold uppercase transition duration-250 transform-3d;
				@apply sm:text-3xl;
				@apply max-md:flex max-md:min-w-full max-md:snap-center max-md:snap-always max-md:items-center max-md:justify-center max-md:px-8 md:text-5xl;
				@apply md:-rotate-y-45 md:text-right;
				@apply lg:text-7xl;

				a {
					@apply inline-block origin-right text-orange-200 no-underline transition-all duration-250 transform-3d max-md:my-auto max-md:font-bold md:text-transparent;
					@apply [-webkit-text-stroke:2px_var(--color-orange-200)] md:[-webkit-text-stroke:2px_var(--color-orange-200)] lg:[-webkit-text-stroke:4px_var(--color-orange-200)];
				}

				.main-link {
					@apply text-red-500 [-webkit-text-stroke:2px_var(--color-red-500)] md:[-webkit-text-stroke:2px_var(--color-red-500)] lg:[-webkit-text-stroke:4px_var(--color-red-500)];
				}
			}
			.item:hover {
				@apply md:-rotate-y-15;
				.project-link {
					color: var(--color-orange-200);
				}
				.main-link {
					color: var(--color-red-500);
				}
			}
		}
	}
</style>
