"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";

/* ============================================================
   1. BLOB PATH UTILITIES
   ============================================================ */

interface BlobOptions {
  points?: number;
  radius: number;
  irregularity?: number;
  cx?: number;
  cy?: number;
  seed?: number;
}

function hash(n: number): number {
  const s = Math.sin(n) * 43758.5453123;
  return s - Math.floor(s);
}

function noise1D(x: number): number {
  const i = Math.floor(x);
  const f = x - i;
  const a = hash(i);
  const b = hash(i + 1);
  const u = f * f * (3 - 2 * f);
  return a * (1 - u) + b * u;
}

function generateBlobPath(opts: BlobOptions): string {
  const { points = 12, radius, irregularity = 0.24, cx = 0, cy = 0, seed = 0 } = opts;
  const angleStep = (Math.PI * 2) / points;
  const vertices: { x: number; y: number }[] = [];

  for (let i = 0; i < points; i++) {
    const angle = i * angleStep;
    const n = noise1D(i * 0.9 + seed) * 2 - 1;
    const r = radius * (1 + n * irregularity);
    vertices.push({ x: cx + Math.cos(angle) * r, y: cy + Math.sin(angle) * r });
  }
  return catmullRomToBezierPath(vertices);
}

function catmullRomToBezierPath(pts: { x: number; y: number }[]): string {
  const n = pts.length;
  if (n < 3) return "";
  const get = (i: number) => pts[((i % n) + n) % n];
  let d = `M ${get(0).x.toFixed(2)} ${get(0).y.toFixed(2)} `;

  for (let i = 0; i < n; i++) {
    const p0 = get(i - 1);
    const p1 = get(i);
    const p2 = get(i + 1);
    const p3 = get(i + 2);
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C ${c1x.toFixed(2)} ${c1y.toFixed(2)}, ${c2x.toFixed(2)} ${c2y.toFixed(2)}, ${p2.x.toFixed(2)} ${p2.y.toFixed(2)} `;
  }
  return d + "Z";
}

function coveringRadius(cx: number, cy: number, width: number, height: number): number {
  const distances = [
    Math.hypot(cx, cy),
    Math.hypot(width - cx, cy),
    Math.hypot(cx, height - cy),
    Math.hypot(width - cx, height - cy),
  ];
  return Math.max(...distances) * 1.18;
}

/* ============================================================
   2. PARTICLE UTILITIES
   ============================================================ */

interface Particle {
  id: number;
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  maxOpacity: number;
  hue: number;
  angle: number;
  angularVelocity: number;
  orbitRadius: number;
  life: number;
  lifeSpeed: number;
  blur: number;
}

const PARTICLE_COLORS = [
  { h: 12, s: 95, l: 55 },  // Electric Orange (#ff3b11)
  { h: 262, s: 85, l: 65 }, // Electric Violet
  { h: 189, s: 94, l: 55 }, // Cyan Bloom
];

let particleIdCounter = 0;

function createParticle(originX: number, originY: number): Particle {
  const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.8 + Math.random() * 2.5;
  return {
    id: particleIdCounter++,
    x: originX,
    y: originY,
    originX,
    originY,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    size: 1.8 + Math.random() * 4.8,
    opacity: 0,
    maxOpacity: 0.5 + Math.random() * 0.5,
    hue: color.h + (Math.random() * 20 - 10),
    angle,
    angularVelocity: (Math.random() - 0.5) * 0.08,
    orbitRadius: 20 + Math.random() * 150,
    life: 0,
    lifeSpeed: 0.008 + Math.random() * 0.014,
    blur: Math.random() * 2,
  };
}

function spawnParticles(count: number, originX: number, originY: number): Particle[] {
  return Array.from({ length: count }, () => createParticle(originX, originY));
}

function stepParticle(p: Particle, portalRadius: number): boolean {
  p.life += p.lifeSpeed;
  if (p.life >= 1) return false;

  p.angle += p.angularVelocity;
  const radiusProgress = Math.sin(p.life * Math.PI);
  const currentOrbit = p.orbitRadius * (0.3 + radiusProgress * 0.7) + portalRadius * 0.15;
  const targetX = p.originX + Math.cos(p.angle) * currentOrbit + p.vx * p.life * 40;
  const targetY = p.originY + Math.sin(p.angle) * currentOrbit + p.vy * p.life * 40;
  p.x += (targetX - p.x) * 0.18;
  p.y += (targetY - p.y) * 0.18;

  if (p.life < 0.15) p.opacity = (p.life / 0.15) * p.maxOpacity;
  else if (p.life > 0.7) p.opacity = p.maxOpacity * (1 - (p.life - 0.7) / 0.3);
  else p.opacity = p.maxOpacity;

  return true;
}

/* ============================================================
   3. TRANSITION CONTEXT + PROVIDER
   ============================================================ */

type TransitionPhase = "idle" | "freeze" | "expanding" | "dissolving" | "covering" | "revealing";
interface TransitionOrigin { x: number; y: number; }

interface TransitionContextValue {
  phase: TransitionPhase;
  origin: TransitionOrigin;
  isAnimating: boolean;
  navDisabled: boolean;
  triggerTransition: (targetSectionId: string, event?: React.MouseEvent) => void;
}

const BubbleTransitionContext = createContext<TransitionContextValue>({
  phase: "idle",
  origin: { x: 0, y: 0 },
  isAnimating: false,
  navDisabled: false,
  triggerTransition: () => {},
});

export const useBubbleTransition = () => useContext(BubbleTransitionContext);

const PHASE1_FREEZE = 150;
const PHASE2_EXPAND = 580;
const PHASE4_DISSOLVE_START = 420;
const PHASE4_DISSOLVE_DURATION = 400;
const NAV_SETTLE = 60;
const PHASE6_REVEAL = 850;

function usesReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

export function BlackBubbleTransitionProvider({ children }: { children: ReactNode }) {
  const timeouts = useRef<number[]>([]);
  const [phase, setPhase] = useState<TransitionPhase>("idle");
  const [origin, setOrigin] = useState<TransitionOrigin>({ x: 0, y: 0 });
  const [navDisabled, setNavDisabled] = useState(false);

  const clearTimers = useCallback(() => {
    timeouts.current.forEach((t) => window.clearTimeout(t));
    timeouts.current = [];
  }, []);

  const schedule = useCallback((fn: () => void, delay: number) => {
    const id = window.setTimeout(fn, delay);
    timeouts.current.push(id);
  }, []);

  const triggerTransition = useCallback(
    (targetSectionId: string, event?: React.MouseEvent) => {
      if (navDisabled) return;

      const clickX = event?.clientX ?? (typeof window !== "undefined" ? window.innerWidth / 2 : 0);
      const clickY = event?.clientY ?? (typeof window !== "undefined" ? window.innerHeight / 2 : 0);

      if (usesReducedMotion()) {
        const el = document.getElementById(targetSectionId);
        if (el) el.scrollIntoView({ behavior: "instant" });
        return;
      }

      clearTimers();
      setOrigin({ x: clickX, y: clickY });
      setNavDisabled(true);
      setPhase("freeze");

      // Phase 2: Liquid Portal Blob expands outward from click origin
      schedule(() => setPhase("expanding"), PHASE1_FREEZE);

      // Phase 3: Dissolve background
      schedule(() => {
        setPhase("dissolving");
      }, PHASE1_FREEZE + PHASE4_DISSOLVE_START);

      // Phase 4: Scroll to section behind liquid portal curtain
      schedule(() => {
        setPhase("covering");
        const el = document.getElementById(targetSectionId);
        if (el) {
          el.scrollIntoView({ behavior: "instant" });
        }
      }, PHASE1_FREEZE + PHASE2_EXPAND);

      // Phase 5: Liquid Portal Blob retracts to reveal target section
      schedule(() => {
        setPhase("revealing");
      }, PHASE1_FREEZE + PHASE2_EXPAND + NAV_SETTLE);

      // Phase 6: Settle idle state
      schedule(() => {
        setPhase("idle");
        setNavDisabled(false);
      }, PHASE1_FREEZE + PHASE2_EXPAND + NAV_SETTLE + PHASE6_REVEAL);
    },
    [navDisabled, clearTimers, schedule]
  );

  const value = useMemo(
    () => ({
      phase,
      origin,
      isAnimating: phase !== "idle",
      navDisabled,
      triggerTransition,
    }),
    [phase, origin, navDisabled, triggerTransition]
  );

  return (
    <BubbleTransitionContext.Provider value={value}>
      {children}
      <PortalTransition phase={phase} origin={origin} />
    </BubbleTransitionContext.Provider>
  );
}

/* ============================================================
   4. PORTAL BLOB (morphing SVG)
   ============================================================ */

const GRADIENT_ID = "portal-liquid-gradient";
const BLOOM_FILTER_ID = "portal-liquid-bloom";
const ABERRATION_FILTER_ID = "portal-liquid-aberration";

function PortalBlob({ phase, origin }: { phase: TransitionPhase; origin: TransitionOrigin }) {
  const pathRef = useRef<SVGPathElement>(null);
  const edgePathRef = useRef<SVGPathElement>(null);
  const radiusObj = useRef({ r: 0 });
  const rafId = useRef<number | null>(null);
  const noiseTime = useRef(0);
  const [viewport, setViewport] = useState({
    w: typeof window !== "undefined" ? window.innerWidth : 1920,
    h: typeof window !== "undefined" ? window.innerHeight : 1080,
  });

  useEffect(() => {
    const onResize = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const fullRadius = coveringRadius(origin.x, origin.y, viewport.w, viewport.h);
    gsap.killTweensOf(radiusObj.current);

    if (phase === "freeze") {
      gsap.to(radiusObj.current, { r: 8, duration: 0.15, ease: "power2.out" });
    } else if (phase === "expanding" || phase === "dissolving") {
      gsap.to(radiusObj.current, { r: fullRadius, duration: 0.6, ease: "power3.inOut" });
    } else if (phase === "covering") {
      radiusObj.current.r = fullRadius;
    } else if (phase === "revealing") {
      gsap.to(radiusObj.current, { r: 0, duration: 0.8, ease: "power3.inOut" });
    } else {
      radiusObj.current.r = 0;
    }
  }, [phase, origin, viewport]);

  useEffect(() => {
    const tick = () => {
      noiseTime.current += 0.014;
      const r = radiusObj.current.r;
      if (r > 0.5) {
        const d = generateBlobPath({
          points: 14,
          radius: r,
          irregularity: r < 50 ? 0.16 : 0.22,
          cx: origin.x,
          cy: origin.y,
          seed: noiseTime.current,
        });
        pathRef.current?.setAttribute("d", d);
        edgePathRef.current?.setAttribute("d", d);
      } else {
        pathRef.current?.setAttribute("d", "");
        edgePathRef.current?.setAttribute("d", "");
      }
      rafId.current = requestAnimationFrame(tick);
    };
    rafId.current = requestAnimationFrame(tick);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, [origin]);

  const visible = phase !== "idle";

  return (
    <svg className="portal-blob-svg pointer-events-none" aria-hidden="true" style={{ opacity: visible ? 1 : 0 }} width="100%" height="100%">
      <defs>
        <radialGradient id={GRADIENT_ID} cx="50%" cy="50%" r="65%">
          <stop offset="0%" stopColor="#ff3b11" stopOpacity="0.98" />
          <stop offset="40%" stopColor="#7c3aed" stopOpacity="0.96" />
          <stop offset="100%" stopColor="#0a0a12" stopOpacity="0.95" />
        </radialGradient>
        <filter id={BLOOM_FILTER_ID} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="16" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={ABERRATION_FILTER_ID} x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
          <feOffset in="SourceGraphic" dx="2.5" dy="0" result="r" />
          <feColorMatrix in="r" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 0" result="rOnly" />
          <feOffset in="SourceGraphic" dx="-2.5" dy="0" result="b" />
          <feColorMatrix in="b" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 1 0" result="bOnly" />
          <feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0  0 1 0 0 0  0 0 0 0 0  0 0 0 1 0" result="gOnly" />
          <feBlend in="rOnly" in2="bOnly" mode="screen" result="rb" />
          <feBlend in="rb" in2="gOnly" mode="screen" />
        </filter>
      </defs>
      <path ref={pathRef} fill={`url(#${GRADIENT_ID})`} filter={`url(#${BLOOM_FILTER_ID})`} />
      <path ref={edgePathRef} fill="none" stroke="#ff3b11" strokeWidth="2.5" filter={`url(#${ABERRATION_FILTER_ID})`} opacity="0.8" />
    </svg>
  );
}

/* ============================================================
   5. PARTICLE SYSTEM (canvas)
   ============================================================ */

const SPAWN_COUNT = 280;

function ParticleSystem({ phase, origin }: { phase: TransitionPhase; origin: TransitionOrigin }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const rafId = useRef<number | null>(null);
  const portalRadius = useRef(0);
  const spawnedForThisRun = useRef(false);

  useEffect(() => {
    if (phase === "expanding" && !spawnedForThisRun.current) {
      particles.current = spawnParticles(SPAWN_COUNT, origin.x, origin.y);
      spawnedForThisRun.current = true;
    }
    if (phase === "idle") spawnedForThisRun.current = false;
    if (phase === "revealing") {
      particles.current = particles.current.concat(spawnParticles(Math.floor(SPAWN_COUNT * 0.4), origin.x, origin.y));
    }
  }, [phase, origin]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const growthDuration = 600;
    let growthStart = performance.now();
    if (phase === "expanding" || phase === "dissolving") growthStart = performance.now();

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      if (phase === "expanding" || phase === "dissolving" || phase === "covering") {
        const elapsed = performance.now() - growthStart;
        portalRadius.current = Math.min(1, elapsed / growthDuration) * 900;
      } else if (phase === "revealing") {
        portalRadius.current = Math.max(0, portalRadius.current - 12);
      }

      particles.current = particles.current.filter((p) => stepParticle(p, portalRadius.current));

      ctx.globalCompositeOperation = "lighter";
      for (const p of particles.current) {
        ctx.save();
        ctx.filter = p.blur > 0.3 ? `blur(${p.blur.toFixed(1)}px)` : "none";
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
        gradient.addColorStop(0, `hsla(${p.hue}, 95%, 65%, ${p.opacity})`);
        gradient.addColorStop(1, `hsla(${p.hue}, 95%, 55%, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.globalCompositeOperation = "source-over";

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener("resize", resize);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [phase]);

  const visible = phase !== "idle";
  return <canvas ref={canvasRef} className="portal-particle-canvas pointer-events-none" aria-hidden="true" style={{ opacity: visible ? 1 : 0 }} />;
}

/* ============================================================
   6. GLOW OVERLAY (cursor glow, darken, grain, stars)
   ============================================================ */

const STAR_COUNT = 45;

function GlowOverlay({ phase }: { phase: TransitionPhase }) {
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const darkenRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const current = { ...target };
    let rafId: number;

    const onMove = (e: PointerEvent) => { target.x = e.clientX; target.y = e.clientY; };
    window.addEventListener("pointermove", onMove);

    const tick = () => {
      current.x += (target.x - current.x) * 0.15;
      current.y += (target.y - current.y) * 0.15;
      if (cursorGlowRef.current) {
        cursorGlowRef.current.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;
      }
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => { window.removeEventListener("pointermove", onMove); cancelAnimationFrame(rafId); };
  }, []);

  useEffect(() => {
    if (!darkenRef.current) return;
    const opacityByPhase: Record<TransitionPhase, number> = {
      idle: 0, freeze: 0.1, expanding: 0.35, dissolving: 0.55, covering: 0.7, revealing: 0.15,
    };
    gsap.to(darkenRef.current, { opacity: opacityByPhase[phase], duration: 0.35, ease: "power2.out" });
  }, [phase]);

  const stars = useMemo(
    () => Array.from({ length: STAR_COUNT }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: 1 + Math.random() * 2.5,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
    })),
    []
  );

  const visible = phase !== "idle";

  return (
    <div className="glow-overlay-root pointer-events-none" aria-hidden="true">
      <div ref={darkenRef} className="overlay-darken pointer-events-none" />
      <div className="overlay-stars pointer-events-none" style={{ opacity: visible && phase !== "freeze" ? 1 : 0 }}>
        {stars.map((s) => (
          <span
            key={s.id}
            className="overlay-star"
            style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, animationDelay: `${s.delay}s`, animationDuration: `${s.duration}s` }}
          />
        ))}
      </div>
      <div ref={cursorGlowRef} className="cursor-glow pointer-events-none" style={{ opacity: visible ? 1 : 0 }} />
    </div>
  );
}

/* ============================================================
   7. PORTAL TRANSITION (composes 4-6)
   ============================================================ */

function PortalTransition({ phase, origin }: { phase: TransitionPhase; origin: TransitionOrigin }) {
  const active = phase !== "idle";
  return (
    <div className="portal-transition-root fixed inset-0 z-[99999] pointer-events-none select-none" style={{ pointerEvents: active ? "auto" : "none" }} aria-hidden={!active}>
      <GlowOverlay phase={phase} />
      <ParticleSystem phase={phase} origin={origin} />
      <PortalBlob phase={phase} origin={origin} />
    </div>
  );
}
