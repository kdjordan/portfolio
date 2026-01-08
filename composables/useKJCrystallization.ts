import * as THREE from 'three'

interface CrystallizationOptions {
  container: HTMLElement
  onComplete?: () => void
}

export function useKJCrystallization() {
  if (!import.meta.client) {
    return {
      init: () => Promise.resolve(),
      start: () => {},
      destroy: () => {},
      isReady: ref(false)
    }
  }

  const isReady = ref(false)
  let renderer: THREE.WebGLRenderer
  let scene: THREE.Scene
  let camera: THREE.OrthographicCamera
  let material: THREE.ShaderMaterial
  let animationId: number
  let container: HTMLElement
  let onCompleteCallback: (() => void) | undefined
  let startTime = 0
  let isAnimating = false

  const DURATION = 3.5

  // Vertex shader - simple fullscreen quad
  const vertexShader = `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `

  // Fragment shader - frost crystal growth
  const fragmentShader = `
    uniform float uTime;
    uniform float uProgress;
    uniform vec2 uResolution;

    varying vec2 vUv;

    // Noise functions for organic patterns
    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);

      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));

      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for (int i = 0; i < 6; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }

    // Crystal/frost pattern
    float crystalPattern(vec2 p, float scale) {
      vec2 q = p * scale;

      // Hexagonal grid for crystal structure
      vec2 r = vec2(q.x + q.y * 0.5, q.y * 0.866);
      vec2 a = mod(r, 1.0) - 0.5;
      vec2 b = mod(r + 0.5, 1.0) - 0.5;
      vec2 gv = length(a) < length(b) ? a : b;

      // Crystal branches
      float d = length(gv);
      float angle = atan(gv.y, gv.x);
      float branches = abs(sin(angle * 3.0));

      return smoothstep(0.3, 0.0, d - branches * 0.15);
    }

    // SDF for letter K
    float sdK(vec2 p) {
      p.x += 0.25; // shift right to center KJ

      // Vertical stem
      float stem = length(vec2(max(abs(p.x + 0.3) - 0.06, 0.0), max(abs(p.y) - 0.4, 0.0)));

      // Upper diagonal
      vec2 p1 = p - vec2(-0.24, 0.0);
      float angle1 = 0.75;
      vec2 d1 = vec2(cos(angle1), sin(angle1));
      float proj1 = clamp(dot(p1, d1), 0.0, 0.45);
      float diag1 = length(p1 - d1 * proj1) - 0.055;

      // Lower diagonal
      vec2 p2 = p - vec2(-0.24, 0.0);
      float angle2 = -0.75;
      vec2 d2 = vec2(cos(angle2), sin(angle2));
      float proj2 = clamp(dot(p2, d2), 0.0, 0.45);
      float diag2 = length(p2 - d2 * proj2) - 0.055;

      return min(stem, min(diag1, diag2));
    }

    // SDF for letter J
    float sdJ(vec2 p) {
      p.x -= 0.25; // shift left to center KJ

      // Top bar
      float bar = length(vec2(max(abs(p.x) - 0.25, 0.0), max(abs(p.y - 0.35) - 0.05, 0.0)));

      // Vertical stem
      float stem = length(vec2(max(abs(p.x - 0.0) - 0.055, 0.0), max(abs(p.y - 0.05) - 0.25, 0.0)));

      // Curved bottom (hook)
      vec2 hookCenter = vec2(-0.15, -0.2);
      float hookRadius = 0.15;
      vec2 hookP = p - hookCenter;
      float hookAngle = atan(hookP.y, hookP.x);

      // Only draw bottom half of curve
      float hook = 1.0;
      if (hookAngle < 0.0 && hookAngle > -3.14159) {
        hook = abs(length(hookP) - hookRadius) - 0.055;
      }

      // Connect stem to hook
      if (p.x > -0.055 && p.x < 0.055 && p.y < -0.2 && p.y > -0.35) {
        hook = min(hook, length(vec2(max(abs(p.x) - 0.055, 0.0), 0.0)));
      }

      return min(bar, min(stem, hook));
    }

    // Combined KJ
    float sdKJ(vec2 p) {
      return min(sdK(p), sdJ(p));
    }

    void main() {
      vec2 uv = vUv;
      vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
      vec2 p = (uv - 0.5) * aspect;

      // Get distance to KJ letters
      float d = sdKJ(p);

      // Frost growth - starts from edges of letters and spreads inward
      float growthNoise = fbm(p * 8.0 + uProgress * 0.5);
      float growth = uProgress * 1.5 + growthNoise * 0.3;

      // Crystal pattern intensity
      float crystal1 = crystalPattern(p + vec2(uProgress * 0.1), 15.0);
      float crystal2 = crystalPattern(p * 1.3 + vec2(0.5), 20.0);
      float crystals = max(crystal1, crystal2 * 0.7);

      // Frost spreads into the letter shapes
      float frostEdge = smoothstep(0.15, -0.05, d - (1.0 - growth) * 0.3);

      // Inner glow/fill
      float innerFrost = smoothstep(0.1, -0.1, d) * uProgress;

      // Combine frost elements
      float frost = frostEdge * (0.6 + crystals * 0.4);
      frost += innerFrost * 0.5;
      frost *= smoothstep(0.0, 0.3, uProgress); // fade in

      // Add sparkle/shimmer
      float sparkle = noise(p * 50.0 + uProgress * 10.0);
      sparkle = pow(sparkle, 8.0) * frostEdge * 0.5;

      // Color - icy blue-white
      vec3 frostColor = vec3(0.85, 0.92, 0.97);
      vec3 accentColor = vec3(0.7, 0.85, 0.95);
      vec3 color = mix(accentColor, frostColor, frost);

      // Add subtle blue tint to edges
      float edge = smoothstep(0.0, 0.1, d) * smoothstep(0.2, 0.05, d);
      color = mix(color, vec3(0.6, 0.8, 0.95), edge * frostEdge * 0.3);

      // Final alpha
      float alpha = frost + sparkle;
      alpha = clamp(alpha, 0.0, 1.0);

      // Slight vignette on frost
      float vignette = 1.0 - length(uv - 0.5) * 0.3;
      alpha *= vignette;

      gl_FragColor = vec4(color, alpha);
    }
  `

  const init = async (options: CrystallizationOptions): Promise<void> => {
    container = options.container
    onCompleteCallback = options.onComplete

    // Scene setup
    scene = new THREE.Scene()

    // Orthographic camera for fullscreen quad
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)

    // Renderer
    renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)

    // Fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2)

    material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uResolution: { value: new THREE.Vector2(container.clientWidth, container.clientHeight) }
      },
      transparent: true,
      depthWrite: false
    })

    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    // Handle resize
    const handleResize = () => {
      const width = container.clientWidth
      const height = container.clientHeight
      renderer.setSize(width, height)
      material.uniforms.uResolution.value.set(width, height)
    }
    window.addEventListener('resize', handleResize)

    isReady.value = true
  }

  const easeInOutCubic = (t: number): number => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
  }

  const start = () => {
    if (!isReady.value || isAnimating) return

    isAnimating = true
    startTime = performance.now()

    const animate = () => {
      const elapsed = (performance.now() - startTime) / 1000
      const progress = Math.min(elapsed / DURATION, 1)
      const easedProgress = easeInOutCubic(progress)

      material.uniforms.uTime.value = elapsed
      material.uniforms.uProgress.value = easedProgress

      renderer.render(scene, camera)

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      } else {
        // Hold briefly then complete
        setTimeout(() => {
          isAnimating = false
          onCompleteCallback?.()
        }, 800)
      }
    }

    animate()
  }

  const destroy = () => {
    if (animationId) cancelAnimationFrame(animationId)

    if (material) material.dispose()
    if (renderer) {
      renderer.dispose()
      container?.removeChild(renderer.domElement)
    }

    isReady.value = false
    isAnimating = false
  }

  return { init, start, destroy, isReady }
}
