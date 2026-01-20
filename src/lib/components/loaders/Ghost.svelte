<script>
	const pupils = ['pupil', 'pupil1'];
	const eyes = ['eye', 'eye1'];
	const tops = Array.from({ length: 5 }, (_, i) => `top${i}`);
	const sts = Array.from({ length: 6 }, (_, i) => `st${i}`);
	const ans = Array.from({ length: 19 }, (_, i) => `an${i + 1}`);
</script>

<!-- Ghost Component -->
<div id="ghost">
	<div id="red">
		{#each pupils as id}
			<div {id}></div>
		{/each}

		{#each eyes as id}
			<div {id}></div>
		{/each}

		{#each tops as id}
			<div {id}></div>
		{/each}

		{#each sts as id}
			<div {id}></div>
		{/each}

		{#each ans as id}
			<div {id}></div>
		{/each}
	</div>
	<div id="shadow"></div>
</div>

<style>
	/* Color Variables */
	:root {
		--body: var(--color-orange-500);
		--eyes: var(--color-orange-100);
		--pupils: var(--color-blue-500);
		--shadow: var(--color-orange-200);
	}

	/* Ghost container */
	#ghost {
		position: relative;
		scale: 0.8;
	}

	/* Red grid with animation */
	#red {
		animation: upNDown infinite 0.5s;
		position: relative;
		width: 140px;
		height: 140px;
		display: grid;
		grid-template-columns: repeat(14, 1fr);
		grid-template-rows: repeat(14, 1fr);
		grid-column-gap: 0;
		grid-row-gap: 0;
		grid-template-areas:
			'a1  a2  a3  a4  a5  top0  top0  top0  top0  a10 a11 a12 a13 a14'
			'b1  b2  b3  top1 top1 top1 top1 top1 top1 top1 top1 b12 b13 b14'
			'c1 c2 top2 top2 top2 top2 top2 top2 top2 top2 top2 top2 c13 c14'
			'd1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 d14'
			'e1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 e14'
			'f1 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 top3 f14'
			'top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4'
			'top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4'
			'top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4'
			'top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4'
			'top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4'
			'top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4 top4'
			'st0 st0 an4 st1 an7 st2 an10 an10 st3 an13 st4 an16 st5 st5'
			'an1 an2 an3 an5 an6 an8 an9 an9 an11 an12 an14 an15 an17 an18';
	}

	/* Up and Down Animation */
	@keyframes upNDown {
		0%,
		49% {
			transform: translateY(0);
		}
		50%,
		100% {
			transform: translateY(-10px);
		}
	}

	/* Top and St cells share red background */
	#top0,
	#top1,
	#top2,
	#top3,
	#top4,
	#st0,
	#st1,
	#st2,
	#st3,
	#st4,
	#st5 {
		background-color: var(--body);
	}

	#top0 {
		grid-area: top0;
	}
	#top1 {
		grid-area: top1;
	}
	#top2 {
		grid-area: top2;
	}
	#top3 {
		grid-area: top3;
	}
	#top4 {
		grid-area: top4;
	}
	#st0 {
		grid-area: st0;
	}
	#st1 {
		grid-area: st1;
	}
	#st2 {
		grid-area: st2;
	}
	#st3 {
		grid-area: st3;
	}
	#st4 {
		grid-area: st4;
	}
	#st5 {
		grid-area: st5;
	}

	/* Flickering cells */
	#an1,
	#an6,
	#an7,
	#an8,
	#an11,
	#an12,
	#an13,
	#an18 {
		animation: flicker0 infinite 0.5s;
	}
	#an2,
	#an3,
	#an4,
	#an9,
	#an10,
	#an15,
	#an16,
	#an17 {
		animation: flicker1 infinite 0.5s;
	}

	/* Grid areas for animation cells */
	#an1 {
		grid-area: an1;
	}
	#an2 {
		grid-area: an2;
	}
	#an3 {
		grid-area: an3;
	}
	#an4 {
		grid-area: an4;
	}
	#an5 {
		grid-area: an5;
	}
	#an6 {
		grid-area: an6;
	}
	#an7 {
		grid-area: an7;
	}
	#an8 {
		grid-area: an8;
	}
	#an9 {
		grid-area: an9;
	}
	#an10 {
		grid-area: an10;
	}
	#an11 {
		grid-area: an11;
	}
	#an12 {
		grid-area: an12;
	}
	#an13 {
		grid-area: an13;
	}
	#an14 {
		grid-area: an14;
	}
	#an15 {
		grid-area: an15;
	}
	#an16 {
		grid-area: an16;
	}
	#an17 {
		grid-area: an17;
	}
	#an18 {
		grid-area: an18;
	}

	@keyframes flicker0 {
		0%,
		49% {
			background-color: var(--body);
		}
		50%,
		100% {
			background-color: transparent;
		}
	}

	@keyframes flicker1 {
		0%,
		49% {
			background-color: transparent;
		}
		50%,
		100% {
			background-color: var(--body);
		}
	}

	/* Eyes */
	#eye,
	#eye1 {
		width: 40px;
		height: 50px;
		position: absolute;
		top: 30px;
	}

	#eye {
		left: 10px;
	}
	#eye1 {
		right: 30px;
	}

	#eye::before,
	#eye::after,
	#eye1::before,
	#eye1::after {
		content: '';
		display: block;
		position: absolute;
		background-color: var(--eyes);
	}

	#eye::before,
	#eye1::before {
		width: 20px;
		height: 50px;
		transform: translateX(10px);
	}

	#eye::after,
	#eye1::after {
		width: 40px;
		height: 30px;
		transform: translateY(10px);
	}

	/* Pupils */
	#pupil,
	#pupil1 {
		width: 20px;
		height: 20px;
		background-color: var(--pupils);
		position: absolute;
		top: 50px;
		z-index: 1;
		animation: eyesMovement infinite 3s;
	}

	#pupil {
		left: 10px;
	}
	#pupil1 {
		right: 50px;
	}

	@keyframes eyesMovement {
		0%,
		49% {
			transform: translateX(0);
		}
		50%,
		99% {
			transform: translateX(10px);
		}
		100% {
			transform: translateX(0);
		}
	}

	/* Shadow */
	#shadow {
		background-color: var(--shadow);
		width: 140px;
		height: 140px;
		position: absolute;
		border-radius: 50%;
		transform: rotateX(80deg);
		filter: blur(20px);
		top: 80%;
		animation: shadowMovement infinite 0.5s;
	}

	@keyframes shadowMovement {
		0%,
		49% {
			opacity: 0.5;
		}
		50%,
		100% {
			opacity: 0.2;
		}
	}
</style>
