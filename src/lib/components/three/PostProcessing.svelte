<script>
	import { onMount } from 'svelte';
	import { useThrelte, useTask } from '@threlte/core';
	import {
		EffectComposer,
		RenderPass,
		UnrealBloomPass,
		ShaderPass
	} from 'three/examples/jsm/Addons.js';
	import { Vector2 } from 'three';
	import { CRTShader } from './shaders';

	const { scene, camera, renderer, size, renderStage, autoRender } = useThrelte();

	let composer;
	let renderPass;
	let crtPass;

	onMount(() => {
		composer = new EffectComposer(renderer);

		// Create passes ONCE
		renderPass = new RenderPass(scene, $camera);
		composer.addPass(renderPass);

		composer.addPass(new UnrealBloomPass(new Vector2($size.width, $size.height), 1.5, 0.2, 0.85));

		crtPass = new ShaderPass(CRTShader);
		composer.addPass(crtPass);

		const prev = autoRender.current;
		autoRender.set(false);

		return () => autoRender.set(prev);
	});

	// Update camera reference safely
	$effect(() => {
		if (renderPass) {
			renderPass.camera = $camera;
		}
	});

	// Resize handling
	$effect(() => {
		if (composer) {
			composer.setSize($size.width, $size.height);
		}
		if (crtPass?.uniforms) {
			crtPass.uniforms.resolution.value = new Vector2($size.width, $size.height);
		}
	});

	// Render task — THIS is the key
	useTask(
		(delta) => {
			composer?.render();
			if (crtPass) crtPass.uniforms.time.value += delta;
		},
		{
			stage: renderStage,
			autoInvalidate: false
		}
	);
</script>
