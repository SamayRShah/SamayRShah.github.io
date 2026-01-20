<script>
	import { T } from '@threlte/core';
	import Character from './Character.svelte';
	import { modelsConfig } from './models';
	import { useGltf } from '@threlte/extras';

	let activeModelIndex = $state(0);
	let modelYaw = 0;
	let modelPitch = 0;

	const next = (e) => {
		activeModelIndex = (activeModelIndex + 1) % modelsConfig.length;
	};

	const prev = () => {
		activeModelIndex = (activeModelIndex - 1 + modelsConfig.length) % modelsConfig.length;
	};
</script>

<T.PerspectiveCamera position={[0, 0, 4]} oncreate={(ref) => ref.lookAt(0, 1, 0)} makeDefault />

<T.DirectionalLight position={[0, 10, 8]} intensity={2} />
<T.HemisphereLight HemisphereLight(0xffffff, 0x444444, 3) />

<Character model={modelsConfig[activeModelIndex]} swapModel={next} />

<svelte:window
	onkeydown={(e) => {
		if (e.key == ' ') {
			next();
		}
	}}
/>
