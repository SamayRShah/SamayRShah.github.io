<script>
	import { onMount, onDestroy } from 'svelte';
	import * as THREE from 'three';
	import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
	import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
	import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
	import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
	import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
	import { modelsConfig } from './models';
	import { CRTShader } from './shaders';

	let container;
	let scene, camera, renderer, composer;
	let loadedModels = [];
	let activeModelIndex = 0;
	let pointer = new THREE.Vector2(0, 0);
	let isDragging = false;
	let pointerMoved = false;
	let prevPointer = new THREE.Vector2();
	const raycaster = new THREE.Raycaster();
	const pointerClick = new THREE.Vector2();

	onMount(() => {
		// Scene
		scene = new THREE.Scene();
		scene.background = null;

		// Camera
		camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.set(0, 0, 4);
		camera.lookAt(0, 1, 0);

		// Renderer
		renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setClearColor(0x000000, 0);
		renderer.domElement.style.touchAction = 'none';
		container.appendChild(renderer.domElement);

		// Lights
		scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 3));
		const dirLight = new THREE.DirectionalLight(0xffffff, 2);
		dirLight.position.set(0, 10, 8);
		scene.add(dirLight);

		// GLTF loader
		const loader = new GLTFLoader();
		let modelsLoadedCount = 0;

		function onModelsLoaded() {
			if (!loadedModels.length) return;
			loadedModels[0].visible = true;
			activeModelIndex = 0;
		}

		modelsConfig.forEach((config) => {
			loader.load(config.url, (gltf) => {
				const model = gltf.scene;
				model.scale.setScalar(config.scale);

				const box = new THREE.Box3().setFromObject(model);
				const center = box.getCenter(new THREE.Vector3());
				model.position.sub(center);
				model.position.y = 0;

				let headBone = null;
				model.traverse((obj) => {
					if (obj.isBone && obj.name.toLowerCase().includes(config.headBoneName.toLowerCase())) {
						headBone = obj;
					}
				});

				model.userData = {
					headBone,
					rotationRanges: config.rotationRanges,
					rotateAxes: config.rotateAxes
				};

				model.visible = false;
				loadedModels.push(model);
				scene.add(model);

				modelsLoadedCount++;
				if (modelsLoadedCount === modelsConfig.length) {
					onModelsLoaded();
				}
			});
		});

		// Post Processing
		composer = new EffectComposer(renderer);

		const renderPass = new RenderPass(scene, camera);
		renderPass.clearAlpha = 0;
		composer.addPass(renderPass);

		const bloomPass = new UnrealBloomPass(
			new THREE.Vector2(window.innerWidth, window.innerHeight),
			1.5,
			0.4,
			0.85
		);
		composer.addPass(bloomPass);
		const crtPass = new ShaderPass(CRTShader);
		composer.addPass(crtPass);

		// Head Tracking
		function updateHeadLook() {
			const model = loadedModels[activeModelIndex];
			if (!model || !model.userData.headBone) return;

			const bone = model.userData.headBone;
			const ranges = model.userData.rotationRanges;
			const axes = model.userData.rotateAxes;

			const yaw = THREE.MathUtils.degToRad(
				THREE.MathUtils.lerp(ranges.yaw[0], ranges.yaw[1], (pointer.x + 1) / 2)
			);
			const pitch = THREE.MathUtils.degToRad(
				THREE.MathUtils.lerp(ranges.pitch[0], ranges.pitch[1], (pointer.y + 1) / 2)
			);
			const roll = THREE.MathUtils.degToRad(
				THREE.MathUtils.lerp(ranges.roll[0], ranges.roll[1], (pointer.y + 1) / 2)
			);

			bone.rotation.set(
				axes.pitch === 'x' ? pitch : axes.pitch === 'y' ? yaw : roll,
				axes.yaw === 'x' ? pitch : axes.yaw === 'y' ? yaw : roll,
				axes.roll === 'x' ? pitch : axes.roll === 'y' ? yaw : roll
			);
		}

		// Render loop
		function animate(time) {
			updateHeadLook();
			crtPass.uniforms.time.value = time * 0.001;
			composer.render();
		}
		renderer.setAnimationLoop(animate);

		// Resizing
		const onResize = () => {
			const w = window.innerWidth;
			const h = window.innerHeight;

			renderer.setSize(w, h);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			composer.setSize(w, h);
			crtPass.uniforms.resolution.value.set(w, h);
			bloomPass.setSize(w, h);
		};

		// Cleanup
		onDestroy(() => {
			renderer.dispose();
		});
	});

	// Input
	const onPointerDown = (e) => {
		isDragging = true;
		pointerMoved = false;
		prevPointer.set(e.clientX, e.clientY);
	};

	const onPointerMove = (e) => {
		pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
		pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

		if (!isDragging) return;

		pointerMoved = true;

		const dx = e.clientX - prevPointer.x;
		const dy = e.clientY - prevPointer.y;

		const model = loadedModels[activeModelIndex];
		if (model) {
			model.rotation.y += dx * 0.005;
			model.rotation.x += dy * 0.003;
		}

		prevPointer.set(e.clientX, e.clientY);
	};

	const onPointerUp = (e) => {
		if (!pointerMoved) {
			pointerClick.x = (e.clientX / window.innerWidth) * 2 - 1;
			pointerClick.y = -(e.clientY / window.innerHeight) * 2 + 1;

			raycaster.setFromCamera(pointerClick, camera);
			const intersects = raycaster.intersectObjects(loadedModels, true);

			if (intersects.length && loadedModels.length > 1) {
				loadedModels[activeModelIndex].visible = false;
				activeModelIndex = (activeModelIndex + 1) % loadedModels.length;
				loadedModels[activeModelIndex].visible = true;
			}
		}

		isDragging = false;
	};

	const onPointerCancel = () => {
		isDragging = false;
	};
</script>

<svelte:window on:resize={onResize} onpointermove={onPointerMove}/>

<div
	bind:this={container}
	on:pointerdown={onPointerDown}
	on:pointerup={onPointerUp}
	on:pointercancel={onPointerCancel}
	class="three-container fixed inset-0 -z-1 w-full h-full"
></div>
