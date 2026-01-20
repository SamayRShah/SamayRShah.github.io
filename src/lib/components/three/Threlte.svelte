<script>
	import PostProcessing from './PostProcessing.svelte';
	import Scene from './Scene.svelte';
	import { Canvas } from '@threlte/core';
</script>

<Canvas>
	<Scene />
	<PostProcessing />
</Canvas>
