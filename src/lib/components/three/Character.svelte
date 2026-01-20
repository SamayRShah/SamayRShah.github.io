<script>
	import * as THREE from 'three';
	import { T, useTask } from '@threlte/core';
	import { GLTF, HTML, interactivity, useDraco, useGltf } from '@threlte/extras';
	import { createEventDispatcher } from 'svelte';
	import Escape from '$lib/components/Escape.svelte';
	import Loaders from '../loaders/Loaders.svelte';
	import { fade } from 'svelte/transition';
	import { cubicIn, cubicOut } from 'svelte/easing';
	const { MathUtils } = THREE;
	const ROTATION_SPEED = 2;
	const dracoLoader = useDraco();

	const pointer = { x: 0, y: 0 };
	const prevPointer = { x: 0, y: 0 };
	const norm = { x: 0, y: 0 };

	let { model, swapModel } = $props();

	let gltf = $state(null);
	let lastUrl = null;

	const gltfValue = $derived(() => $gltf ?? null);
	let character = $derived(gltfValue()?.scene);
	let headBone = $derived(gltfValue()?.nodes[model.headBoneName] ?? null);

	let modelPitch = 0,
		modelYaw = 0;
	let isDragging = false;
	let reversed = false;

	const wrapAngle = (a) => (a > Math.PI ? a - 2 * Math.PI : a < -Math.PI ? a + 2 * Math.PI : a);

	const normalizePointer = (e) => {
		((norm.x = (e.clientX / window.innerWidth) * 2 - 1),
			(norm.y = -(e.clientY / window.innerHeight) * 2 + 1));
	};

	let rafPending = false;
	let lastEvent = null;
	const onPointerDown = (e) => {
		normalizePointer(e)
		isDragging = true;
		prevPointer.x = pointer.x = norm.x;
		prevPointer.y = pointer.y = norm.y;
	};

	const onPointerMove = (e) => {
		lastEvent = e;
		if (rafPending) return;

		rafPending = true;
		requestAnimationFrame(() => {
			rafPending = false;
			handlePointerMove(lastEvent);
		});
	};

	let needsCharacterUpdate = false;
	const handlePointerMove = (e) => {
		normalizePointer(e);

		if (isDragging) {
			const dx = norm.x - prevPointer.x;
			const dy = norm.y - prevPointer.y;

			modelYaw = wrapAngle(modelYaw + dx * ROTATION_SPEED);
			modelPitch = wrapAngle(modelPitch - dy * ROTATION_SPEED);

			reversed = modelYaw >= (2 * Math.PI) / 3 || modelYaw <= -(2 * Math.PI) / 3;
			needsCharacterUpdate = true;
		}

		prevPointer.x = pointer.x = norm.x;
		prevPointer.y = pointer.y = norm.y;
	};

	// character rotation
	useTask(() => {
		if (!character || !needsCharacterUpdate) return;
		character.rotation.set(modelPitch, modelYaw, 0);
		needsCharacterUpdate = false;
	});

	let yawDeg, pitchDeg, rollDeg, axes;
	let pitchAxis, yawAxis, rollAxis;
	// head tracking
	useTask(() => {
		if (!headBone) return;

		const px = (pointer.x + 1) / 2;
		const py = (pointer.y + 1) / 2;

		const yaw = MathUtils.degToRad(
			MathUtils.lerp(yawDeg[reversed ? 1 : 0], yawDeg[reversed ? 0 : 1], px)
		);

		const pitch = MathUtils.degToRad(MathUtils.lerp(pitchDeg[0], pitchDeg[1], py));
		const roll = MathUtils.degToRad(MathUtils.lerp(rollDeg[0], rollDeg[1], py));

		const r = headBone.rotation;
		r[pitchAxis === 0 ? 'x' : pitchAxis === 1 ? 'y' : 'z'] = pitch;
		r[yawAxis === 0 ? 'x' : yawAxis === 1 ? 'y' : 'z'] = yaw;
		r[rollAxis === 0 ? 'x' : rollAxis === 1 ? 'y' : 'z'] = roll;
	});

	$effect(() => {
		if (!model.url) {
			gltf = null;
			return;
		}

		if (model.url == lastUrl) return;
		// load new model
		gltf = useGltf(model.url, { dracoLoader });
		lastUrl = model.url;

		// axes configurations
		yawDeg = model.rotationRanges.yaw;
		pitchDeg = model.rotationRanges.pitch;
		rollDeg = model.rotationRanges.roll;
		axes = model.rotateAxes;
		pitchAxis = axes.pitch === 'x' ? 0 : axes.pitch === 'y' ? 1 : 2;
		yawAxis = axes.yaw === 'x' ? 0 : axes.yaw === 'y' ? 1 : 2;
		rollAxis = axes.roll === 'x' ? 0 : axes.roll === 'y' ? 1 : 2;
		needsCharacterUpdate = true;
	});

	interactivity();
</script>

<svelte:window
	onpointermove={onPointerMove}
	onpointerdown={onPointerDown}
	onpointerup={() => (isDragging = false)}
	ontouchstart={(e) => {
		const t = e.touches[0];
		onPointerDown({
			clientX: t.clientX,
			clientY: t.clientY
		});
	}}
	ontouchmove={(e) => {
		const t = e.touches[0];
		onPointerMove({
			clientX: t.clientX,
			clientY: t.clientY
		});
	}}
	ontouchend={() => (isDragging = false)}
/>

{#if gltfValue()}
	<T
		is={gltfValue().scene}
		scale={model.scale}
		onclick={(e) => {
			e.stopPropagation();
			swapModel();
		}}
	/>
{:else}
	<div
		in:fade={{ duration: 500, easing: cubicOut }}
		out:fade={{ duration: 500, easing: cubicIn }}
		class="bg-opacity-50 absolute inset-0 z-50 flex items-center justify-center bg-black"
	>
		<Escape class="flex flex-col items-center justify-center">
			<Loaders class="opacity-60" />
		</Escape>
	</div>
{/if}

<style lang="postcss">
	@reference "tailwindcss";
</style>
