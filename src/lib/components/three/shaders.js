import { Vector2 } from 'three';
export const CRTShader = {
	uniforms: {
		tDiffuse: { value: null },
		time: { value: 0 },
		resolution: {
			value:
				typeof window !== 'undefined'
					? new Vector2(window.innerWidth, window.innerHeight)
					: new Vector2(0, 0)
		}
	},
	vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
        }
      `,
	fragmentShader: `
        uniform sampler2D tDiffuse; // scene tex auto added from shaderPass
        uniform vec2 resolution;
        uniform float time;
        varying vec2 vUv;

        void main() {
          // fish-eye
          vec2 uv = vUv * 2.0 - 1.0;
          float r = length(uv);
          float fisheyeStrength = 0.25;
          uv *= 1.0 + fisheyeStrength * r * r;
          vec2 distortedUv = uv * 0.5 + 0.5;

          // pixelization
          float pixelSize = 2.5;
          vec2 pixelUv = floor(distortedUv * resolution / pixelSize) * pixelSize / resolution;

          // sampling
          vec4 tex = texture2D(tDiffuse, pixelUv);
          vec3 color = tex.rgb;

          // scan lines
          float scanline = sin(distortedUv.y * resolution.y * 2.5) * 0.05;
          color -= scanline;

          // time flicker
          color *= 0.94 + 0.06 * sin(time * 18.0);

          // rolling scanline #1 (slow, thick)
          float rollPos1 = fract(time * 0.12);
          float roll1 = smoothstep(0.15, 0.0, abs(pixelUv.y - rollPos1));
          color += roll1 * 0.08;

          // rolling scanline #2 (faster, thinner)
          float rollPos2 = fract(time * 0.35);
          float roll2 = smoothstep(0.08, 0.0, abs(pixelUv.y - rollPos2));
          color += roll2 * 0.05;

          // rolling scanline #3 (subtle background roll)
          float rollPos3 = fract(time * 0.6);
          float roll3 = smoothstep(0.04, 0.0, abs(pixelUv.y - rollPos3));
          color += roll3 * 0.03;

          // slight vertical jitter for instability
          float jitter = sin(time * 40.0 + distortedUv.y * 200.0) * 0.002;
          color += jitter;

          // vignette
          float dist = distance(vUv, vec2(0.5));
          color *= smoothstep(0.9, 0.6, dist);

          // bit crushing
          float colorDepth = 16.0;
          color = floor(color * colorDepth) / colorDepth;

          // green tint
          color.g *= 1.2;

          gl_FragColor = vec4(color, tex.a);
        }
      `
};
