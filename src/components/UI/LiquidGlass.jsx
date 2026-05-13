import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const LiquidGlass = ({ 
  title1 = "Liquid", 
  title2 = "Glass", 
  subtitle = "Metaball Refraction Demo",
  className = "" 
}) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const bgTextureRef = useRef(null);
  const dropletTexRef = useRef(null);
  const requestRef = useRef(null);
  const mouseRef = useRef({ x: 999, y: 999, active: false, down: false });
  const dropsRef = useRef([]);
  const pausedRef = useRef(false);

  // Constants
  const MAX_DROPLETS = 30;
  const FIXED_DT_MS = 8;
  const MAX_FRAME_DT_MS = 100;
  const MAX_CATCHUP = 6;
  const MAX_ENTRIES = MAX_DROPLETS * 2;

  useEffect(() => {
    if (!containerRef.current) return;

    // --- Renderer Setup ---
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // --- Physics / Drops Setup ---
    const dropletBuf = new Float32Array(MAX_ENTRIES * 4);
    const dropletTex = new THREE.DataTexture(
      dropletBuf,
      MAX_ENTRIES,
      1,
      THREE.RGBAFormat,
      THREE.FloatType
    );
    dropletTex.minFilter = THREE.NearestFilter;
    dropletTex.magFilter = THREE.NearestFilter;
    dropletTexRef.current = dropletTex;

    const spawn = (x, y, r, vx = 0, vy = 0) => {
      if (dropsRef.current.length >= MAX_DROPLETS) return;
      const angle = Math.random() * Math.PI * 2;
      const spd = 0.0002 + Math.random() * 0.0005; // Much slower base speed
      dropsRef.current.push({
        x, y, r,
        area: Math.PI * r * r,
        vx: vx || Math.cos(angle) * spd,
        vy: vy || Math.sin(angle) * spd,
        alive: true,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.02 + Math.random() * 0.05, // Slower direction change
        softPrevX: x, softPrevY: y,
        softOffX: 0, softOffY: 0,
        softVelX: 0, softVelY: 0
      });
    };

    // Seed initial drops
    for (let i = 0; i < 20; i++) {
      spawn(
        (Math.random() - 0.5) * 1.5,
        (Math.random() - 0.5) * 1.5,
        0.02 + Math.random() * 0.05
      );
    }

    // --- Shader ---
    const shaderMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uRes: { value: new THREE.Vector2(renderer.domElement.width, renderer.domElement.height) },
        uData: { value: dropletTex },
        uCount: { value: 0 },
        uTime: { value: 0 }
      },
      vertexShader: `void main(){ gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        precision highp float;
        #define MAX_N ${MAX_ENTRIES}
        uniform vec2 uRes;
        uniform sampler2D uData;
        uniform int uCount;
        uniform float uTime;

        void main(){
          vec2 uv = gl_FragCoord.xy / uRes;
          float asp = uRes.x / uRes.y;
          vec2 p = (uv - 0.5) * vec2(asp, 1.0);

          float field = 0.0;
          vec2 grad = vec2(0.0);

          for(int i = 0; i < MAX_N; i++){
            if(i >= uCount) break;
            vec4 d = texture2D(uData, vec2((float(i)+0.5)/float(MAX_N), 0.5));
            vec2 c = d.xy;
            float r = d.z;
            if(r < 0.001) continue;
            vec2 delta = p - c;
            float dSq = dot(delta, delta) + 1e-5;
            float contrib = r * r / dSq;
            field += contrib;
            grad += -2.0 * contrib / dSq * delta;
          }

          float thr = 1.0;
          float edge = smoothstep(thr - 0.08, thr + 0.03, field);

          if (edge < 0.01) {
            discard; // Make background fully transparent
          }

          float gradLen = length(grad);
          float nScale = atan(gradLen * 0.5) * 0.3;
          vec2 nGrad = (gradLen > 1e-4) ? (grad / gradLen) * nScale : vec2(0.0);
          vec3 N = normalize(vec3(-nGrad, 1.0));
          vec3 L = normalize(vec3(0.3, 0.6, 1.0));
          vec3 V = vec3(0.0, 0.0, 1.0);
          vec3 H = normalize(L + V);
          float diff = max(dot(N, L), 0.0);
          float spec = pow(max(dot(N, H), 0.0), 120.0);

          float cosTheta = max(dot(N, V), 0.0);
          float fresnel = 0.04 + 0.96 * pow(1.0 - cosTheta, 4.0);

          float rim = smoothstep(thr + 0.6, thr, field) * edge;

          float depth = smoothstep(thr, thr + 3.0, field);
          // Light bluish tint for water
          vec3 tint = mix(vec3(0.6, 0.8, 1.0), vec3(0.9, 0.95, 1.0), depth * 0.4);

          vec3 glassColor = tint * (0.2 + 0.1 * diff)
                          + vec3(1.0) * spec * 0.8
                          + vec3(0.8, 0.9, 1.0) * rim * 0.4
                          + vec3(1.0) * fresnel * 0.5;

          float borderOuter = smoothstep(thr - 0.12, thr - 0.01, field);
          float borderInner = smoothstep(thr + 0.0, thr + 0.08, field);
          float border = borderOuter * (1.0 - borderInner) * 0.3;

          vec3 col = glassColor + vec3(1.0) * border;
          
          // Alpha calculation for glass effect
          float alpha = edge * 0.25 + spec * 0.7 + border * 0.6 + rim * 0.4;
          alpha = clamp(alpha, 0.0, 0.85);

          // Premultiply alpha for correct browser compositing
          gl_FragColor = vec4(col * alpha, alpha);
        }
      `
    });

    // --- Input (Global) ---
    const mouse = { current: { x: 999, y: 999, active: false, down: false } };
    const spawnCD = { current: 0 };
    let aspect = 1;

    const updateMouse = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      aspect = rect.width / rect.height;
      mouse.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * aspect;
      mouse.current.y = 0.5 - (e.clientY - rect.top) / rect.height;
      mouse.current.active = true;
    };

    const handlePointerMove = (e) => updateMouse(e);
    const handlePointerDown = (e) => {
      mouse.current.down = true;
      updateMouse(e);
      spawnCD.current = 0; // Force immediate spawn on click
    };
    const handlePointerUp = () => { mouse.current.down = false; };
    const handlePointerLeave = () => {
      mouse.current.active = false;
      mouse.current.down = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    window.addEventListener("pointerleave", handlePointerLeave);

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMat);
    scene.add(mesh);

    // --- Physics Logic ---
    const DAMP = 0.99; // More damping so they don't accelerate too much
    const TENSION_RANGE = 0.15;
    const TENSION_F = 0.0005;
    const MERGE_RATIO = 0.65;
    const BOUNCE = 0.8; // Bouncier on walls
    const WANDER_F = 0.00002; // Much smaller wander force
    // Remove center pull so they spread out over the whole screen

    const fixedUpdate = () => {
      aspect = renderer.domElement.width / renderer.domElement.height;
      const drops = dropsRef.current;

      // Mouse Spawn
      if (mouse.current.down && mouse.current.active) {
        spawnCD.current -= FIXED_DT_MS;
        if (spawnCD.current <= 0 && drops.length < MAX_DROPLETS) {
          spawnCD.current = 120;
          spawn(
            mouse.current.x + (Math.random() - 0.5) * 0.02,
            mouse.current.y + (Math.random() - 0.5) * 0.02,
            0.02 + Math.random() * 0.015
          );
        }
      }

      // Apply forces
      for (const d of drops) {
        d.wanderAngle += (Math.random() - 0.5) * d.wanderSpeed;
        d.vx += Math.cos(d.wanderAngle) * WANDER_F;
        d.vy += Math.sin(d.wanderAngle) * WANDER_F;
      }

      // Tension
      for (let i = 0; i < drops.length; i++) {
        const a = drops[i];
        for (let j = i + 1; j < drops.length; j++) {
          const b = drops[j];
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dSq = dx * dx + dy * dy;
          const rng = TENSION_RANGE + a.r + b.r;
          if (dSq < rng * rng && dSq > 1e-5) {
            const dist = Math.sqrt(dSq);
            const s = 1 - dist / rng;
            const f = s * TENSION_F;
            a.vx += (dx / dist) * f;
            a.vy += (dy / dist) * f;
            b.vx -= (dx / dist) * f;
            b.vy -= (dy / dist) * f;
          }
        }
      }

      // Integrate
      for (const d of drops) {
        d.x += d.vx;
        d.y += d.vy;
        d.vx *= DAMP;
        d.vy *= DAMP;

        const wx = aspect * 0.5;
        const wy = 0.5;
        if (d.x - d.r < -wx) { d.x = -wx + d.r; d.vx = Math.abs(d.vx) * BOUNCE; }
        if (d.x + d.r > wx) { d.x = wx - d.r; d.vx = -Math.abs(d.vx) * BOUNCE; }
        if (d.y - d.r < -wy) { d.y = -wy + d.r; d.vy = Math.abs(d.vy) * BOUNCE; }
        if (d.y + d.r > wy) { d.y = wy - d.r; d.vy = -Math.abs(d.vy) * BOUNCE; }
      }

      // Merge
      for (let i = 0; i < drops.length; i++) {
        const a = drops[i];
        if (!a.alive) continue;
        for (let j = i + 1; j < drops.length; j++) {
          const b = drops[j];
          if (!b.alive) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < (a.r + b.r) * MERGE_RATIO) {
            const na = a.area + b.area;
            a.x = (a.x * a.area + b.x * b.area) / na;
            a.y = (a.y * a.area + b.y * b.area) / na;
            a.vx = (a.vx * a.area + b.vx * b.area) / na;
            a.vy = (a.vy * a.area + b.vy * b.area) / na;
            a.r = Math.min(Math.sqrt(na / Math.PI), 0.15); // Cap max radius
            a.area = Math.PI * a.r * a.r; // Recalculate area based on capped radius
            b.alive = false;
          }
        }
      }
      dropsRef.current = drops.filter(d => d.alive);

      // Soft bodies
      for (const d of dropsRef.current) {
        const dx = d.x - d.softPrevX;
        const dy = d.y - d.softPrevY;
        d.softVelX += (dx - d.softOffX) * 0.22;
        d.softVelY += (dy - d.softOffY) * 0.22;
        d.softVelX *= 0.6;
        d.softVelY *= 0.6;
        d.softOffX += d.softVelX;
        d.softOffY += d.softVelY;
        d.softPrevX = d.x;
        d.softPrevY = d.y;
      }
    };

    // --- Main Loop ---
    let last = performance.now();
    let acc = 0;

    const loop = () => {
      if (pausedRef.current) {
        requestRef.current = requestAnimationFrame(loop);
        return;
      }
      const now = performance.now();
      const dt = Math.min(now - last, MAX_FRAME_DT_MS);
      last = now;
      acc += dt;

      while (acc >= FIXED_DT_MS) {
        fixedUpdate();
        acc -= FIXED_DT_MS;
      }

      // Sync data texture
      const drops = dropsRef.current;
      const n = Math.min(drops.length, MAX_DROPLETS);
      dropletBuf.fill(0);
      for (let i = 0; i < n; i++) {
        const d = drops[i];
        dropletBuf[i * 4] = d.x;
        dropletBuf[i * 4 + 1] = d.y;
        dropletBuf[i * 4 + 2] = d.r;
        dropletBuf[i * 4 + 3] = 1;
        
        const gi = (n + i) * 4;
        dropletBuf[gi] = d.x - d.softOffX * 3.5;
        dropletBuf[gi + 1] = d.y - d.softOffY * 3.5;
        dropletBuf[gi + 2] = d.r * 0.7;
        dropletBuf[gi + 3] = 1;
      }
      dropletTex.needsUpdate = true;
      shaderMat.uniforms.uCount.value = n * 2;
      shaderMat.uniforms.uTime.value = now * 0.001;

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(loop);
    };

    requestRef.current = requestAnimationFrame(loop);

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      shaderMat.uniforms.uRes.value.set(renderer.domElement.width, renderer.domElement.height);
    };

    window.addEventListener('resize', handleResize);

    // Intersection Observer to pause when not visible
    const observer = new IntersectionObserver(([entry]) => {
      pausedRef.current = !entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(containerRef.current);

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
      window.removeEventListener("pointerleave", handlePointerLeave);
      observer.disconnect();
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        if (containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      renderer.dispose();
      dropletTex.dispose();
      shaderMat.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className={className || "relative w-full h-full overflow-hidden"}
      style={{ touchAction: 'none' }}
    />
  );
};

export default LiquidGlass;
