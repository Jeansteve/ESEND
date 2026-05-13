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

    // --- Background Texture ---
    const bgCanvas = document.createElement('canvas');
    const bgCtx = bgCanvas.getContext('2d');
    const bgTexture = new THREE.CanvasTexture(bgCanvas);
    bgTexture.minFilter = THREE.LinearFilter;
    bgTexture.magFilter = THREE.LinearFilter;
    bgTextureRef.current = bgTexture;

    const drawBackground = () => {
      const w = renderer.domElement.width;
      const h = renderer.domElement.height;
      bgCanvas.width = w;
      bgCanvas.height = h;

      // Gradient background
      const grd = bgCtx.createLinearGradient(0, 0, w * 0.6, h);
      grd.addColorStop(0, "#020617");
      grd.addColorStop(0.35, "#1e1b4b");
      grd.addColorStop(0.6, "#312e81");
      grd.addColorStop(1, "#4338ca");
      bgCtx.fillStyle = grd;
      bgCtx.fillRect(0, 0, w, h);

      // Waves
      bgCtx.save();
      bgCtx.globalAlpha = 0.25;
      for (let i = 0; i < 5; i++) {
        const cx = w * (0.2 + i * 0.18);
        const cy = h * (0.3 + Math.sin(i * 1.3) * 0.25);
        const rg = bgCtx.createRadialGradient(cx, cy, 0, cx, cy, w * 0.35);
        const hue = 220 + i * 15;
        rg.addColorStop(0, `hsla(${hue}, 80%, 60%, 0.4)`);
        rg.addColorStop(1, `hsla(${hue}, 60%, 40%, 0)`);
        bgCtx.fillStyle = rg;
        bgCtx.fillRect(0, 0, w, h);
      }
      bgCtx.restore();

      // Text
      bgCtx.fillStyle = "#ffffff";
      bgCtx.textAlign = "center";
      bgCtx.textBaseline = "middle";

      // Title 1
      const titleSize = Math.round(w * 0.12);
      bgCtx.font = `900 ${titleSize}px 'Outfit', sans-serif`;
      bgCtx.fillText(title1.toUpperCase(), w * 0.5, h * 0.38);
      
      // Title 2
      bgCtx.fillStyle = "#6366f1"; // Indigo ESEND
      bgCtx.fillText(title2.toUpperCase(), w * 0.5, h * 0.38 + titleSize * 0.95);

      // Subtitle
      const subSize = Math.round(w * 0.018);
      bgCtx.font = `700 ${subSize}px 'Inter', sans-serif`;
      bgCtx.fillStyle = "#ffffff";
      bgCtx.globalAlpha = 0.4;
      bgCtx.fillText(subtitle.toUpperCase(), w * 0.5, h * 0.38 + titleSize * 2.1);
      bgCtx.globalAlpha = 1;

      bgTexture.needsUpdate = true;
    };

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
      const spd = 0.0003 + Math.random() * 0.0008;
      dropsRef.current.push({
        x, y, r,
        area: Math.PI * r * r,
        vx: vx || Math.cos(angle) * spd,
        vy: vy || Math.sin(angle) * spd,
        alive: true,
        wanderAngle: Math.random() * Math.PI * 2,
        wanderSpeed: 0.3 + Math.random() * 0.5,
        softPrevX: x, softPrevY: y,
        softOffX: 0, softOffY: 0,
        softVelX: 0, softVelY: 0
      });
    };

    // Seed initial drops
    for (let i = 0; i < 15; i++) {
      spawn(
        (Math.random() - 0.5) * 1.2,
        (Math.random() - 0.5) * 0.8,
        0.03 + Math.random() * 0.06
      );
    }

    // --- Shader ---
    const shaderMat = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uRes: { value: new THREE.Vector2(renderer.domElement.width, renderer.domElement.height) },
        uData: { value: dropletTex },
        uBg: { value: bgTexture },
        uCount: { value: 0 },
        uTime: { value: 0 }
      },
      vertexShader: `void main(){ gl_Position = vec4(position, 1.0); }`,
      fragmentShader: `
        precision highp float;
        #define MAX_N ${MAX_ENTRIES}
        uniform vec2 uRes;
        uniform sampler2D uData;
        uniform sampler2D uBg;
        uniform int uCount;
        uniform float uTime;

        void main(){
          vec2 uv = gl_FragCoord.xy / uRes;
          float asp = uRes.x / uRes.y;
          vec2 p = (uv - 0.5) * vec2(asp, 1.0);

          float field = 0.0;
          vec2 grad = vec2(0.0);
          vec2 lens = vec2(0.0);
          float lensW = 0.0;

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

            float w = r * r / (dSq + r * r);
            lens += (c - p) * w;
            lensW += w;
          }

          lens /= (lensW + 0.001);
          float lensLen = length(lens);
          float thr = 1.0;
          float edge = smoothstep(thr - 0.08, thr + 0.03, field);

          float refractStrength = 0.045;
          float mappedLens = atan(lensLen * 6.0) * refractStrength;
          vec2 refractDir = (lensLen > 1e-5) ? lens / lensLen : vec2(0.0);
          float refractMask = smoothstep(thr - 0.2, thr + 1.5, field);
          vec2 refractedUV = clamp(uv + refractDir * mappedLens * refractMask, 0.001, 0.999);

          vec3 bgClean = texture2D(uBg, uv).rgb;

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
          float caStr = 0.0015 * edge;
          vec3 bgCA;
          bgCA.r = texture2D(uBg, refractedUV + vec2(caStr, caStr * 0.5)).r;
          bgCA.g = texture2D(uBg, refractedUV).g;
          bgCA.b = texture2D(uBg, refractedUV - vec2(caStr, caStr * 0.5)).b;

          float depth = smoothstep(thr, thr + 3.0, field);
          vec3 tint = mix(vec3(1.0), vec3(0.85, 0.9, 1.0), depth * 0.4);

          vec3 glassColor = bgCA * tint * (0.9 + 0.1 * diff)
                          + vec3(1.0) * spec * 0.7
                          + vec3(0.8, 0.9, 1.0) * rim * 0.15
                          + vec3(1.0) * fresnel * 0.12;

          float shadowField = smoothstep(thr - 0.4, thr - 0.05, field);
          vec3 bg = bgClean * (1.0 - shadowField * 0.08);

          float borderOuter = smoothstep(thr - 0.12, thr - 0.01, field);
          float borderInner = smoothstep(thr + 0.0, thr + 0.08, field);
          float border = borderOuter * (1.0 - borderInner) * 0.2;

          vec3 col = mix(bg, glassColor, edge);
          col += vec3(1.0) * border;

          gl_FragColor = vec4(col, 1.0);
        }
      `
    });

    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), shaderMat);
    scene.add(mesh);

    // Initial draw
    document.fonts.ready.then(drawBackground);
    drawBackground();

    // --- Physics Logic ---
    const DAMP = 0.992;
    const MOUSE_R = 0.22;
    const MOUSE_F = 0.005;
    const TENSION_RANGE = 0.15;
    const TENSION_F = 0.0005;
    const MERGE_RATIO = 0.65;
    const BOUNCE = 0.45;
    const WANDER_F = 0.00005;
    const CENTER_PULL = 0.00001;

    const fixedUpdate = () => {
      const aspect = renderer.domElement.width / renderer.domElement.height;
      const drops = dropsRef.current;
      const mouse = mouseRef.current;

      // Apply forces
      for (const d of drops) {
        d.wanderAngle += (Math.random() - 0.5) * d.wanderSpeed;
        d.vx += Math.cos(d.wanderAngle) * WANDER_F;
        d.vy += Math.sin(d.wanderAngle) * WANDER_F;
        d.vx -= d.x * CENTER_PULL;
        d.vy -= d.y * CENTER_PULL;

        if (mouse.active) {
          const dx = d.x - mouse.x;
          const dy = d.y - mouse.y;
          const dSq = dx * dx + dy * dy;
          const rr = MOUSE_R + d.r;
          if (dSq < rr * rr && dSq > 1e-5) {
            const dist = Math.sqrt(dSq);
            const s = 1 - dist / rr;
            const f = s * s * MOUSE_F;
            d.vx += (dx / dist) * f;
            d.vy += (dy / dist) * f;
          }
        }
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
            a.r = Math.sqrt(na / Math.PI);
            a.area = na;
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

    // --- Interaction ---
    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      const aspect = rect.width / rect.height;
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width - 0.5) * aspect;
      mouseRef.current.y = 0.5 - (e.clientY - rect.top) / rect.height;
      mouseRef.current.active = true;
    };
    const handlePointerDown = () => { mouseRef.current.down = true; };
    const handlePointerUp = () => { mouseRef.current.down = false; };
    const handlePointerLeave = () => { 
      mouseRef.current.active = false; 
      mouseRef.current.down = false; 
    };

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      renderer.setSize(w, h);
      shaderMat.uniforms.uRes.value.set(renderer.domElement.width, renderer.domElement.height);
      drawBackground();
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('pointerdown', handlePointerDown);
    renderer.domElement.addEventListener('pointerup', handlePointerUp);
    renderer.domElement.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('resize', handleResize);

    // Intersection Observer to pause when not visible
    const observer = new IntersectionObserver(([entry]) => {
      pausedRef.current = !entry.isIntersecting;
    }, { threshold: 0.1 });
    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(requestRef.current);
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.removeEventListener('pointermove', handlePointerMove);
        rendererRef.current.domElement.removeEventListener('pointerdown', handlePointerDown);
        rendererRef.current.domElement.removeEventListener('pointerup', handlePointerUp);
        rendererRef.current.domElement.removeEventListener('pointerleave', handlePointerLeave);
        if (containerRef.current) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      renderer.dispose();
      bgTexture.dispose();
      dropletTex.dispose();
      shaderMat.dispose();
    };
  }, [title1, title2, subtitle]);

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full h-full overflow-hidden bg-[#020617] ${className}`}
      style={{ touchAction: 'none' }}
    />
  );
};

export default LiquidGlass;
