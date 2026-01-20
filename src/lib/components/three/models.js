export const modelsConfig = [
	{
		url: '/assets/models/dr_dino_compressed.glb',
		headBoneName: 'head',
		rotationRanges: { yaw: [-30, 30], pitch: [0, 0], roll: [30, -30] },
		rotateAxes: { yaw: 'y', pitch: 'x', roll: 'z' },
		scale: 0.9
	},
	{
		url: '/assets/models/bob-omb_compressed.glb',
		headBoneName: 'body',
		rotationRanges: { yaw: [-45, 45], pitch: [20, -20], roll: [0, 0] },
		rotateAxes: { yaw: 'y', pitch: 'x', roll: 'z' },
		scale: 0.9
	}
];
