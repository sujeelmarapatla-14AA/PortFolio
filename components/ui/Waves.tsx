"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

export interface WavesProps {
  lineColor?: string;
  backgroundColor?: string;
  waveSpeedX?: number;
  waveSpeedY?: number;
  waveAmpX?: number;
  waveAmpY?: number;
  friction?: number;
  tension?: number;
  maxCursorMove?: number;
  xGap?: number;
  yGap?: number;
  className?: string;
  style?: React.CSSProperties;
}

interface Point {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
}

const Waves: React.FC<WavesProps> = ({
  lineColor = "#ff7c27",
  backgroundColor = "transparent",
  waveSpeedX = 0.02,
  waveSpeedY = 0.01,
  waveAmpX = 40,
  waveAmpY = 20,
  friction = 0.9,
  tension = 0.01,
  maxCursorMove = 120,
  xGap = 12,
  yGap = 36,
  className = "",
  style,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  const mouseRef = useRef({ x: -9999, y: -9999 });
  const timeRef = useRef(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let points: Point[][] = [];
    let cols = 0;
    let rows = 0;

    const buildGrid = (w: number, h: number) => {
      cols = Math.ceil(w / xGap) + 1;
      rows = Math.ceil(h / yGap) + 1;
      points = [];

      for (let r = 0; r < rows; r++) {
        const rowPoints: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const posX = c * xGap;
          const posY = r * yGap;
          rowPoints.push({
            x: posX,
            y: posY,
            originX: posX,
            originY: posY,
            vx: 0,
            vy: 0,
          });
        }
        points.push(rowPoints);
      }
    };

    const updateSize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.scale(dpr, dpr);
      buildGrid(rect.width, rect.height);
    };

    updateSize();

    const resizeObserver = new ResizeObserver(() => {
      updateSize();
    });
    resizeObserver.observe(container);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const render = () => {
      const rect = container.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      if (backgroundColor && backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, rect.width, rect.height);
      }

      timeRef.current += 1;
      const t = timeRef.current;

      // Update Point Dynamics
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          // Harmonic Wave displacement
          const waveX = Math.sin(t * waveSpeedX + r * 0.25) * waveAmpX;
          const waveY = Math.cos(t * waveSpeedY + c * 0.25) * waveAmpY;

          const targetX = p.originX + waveX;
          const targetY = p.originY + waveY;

          // Mouse Force Displacement
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxCursorMove && dist > 0) {
            const force = (1 - dist / maxCursorMove) * 24;
            const angle = Math.atan2(dy, dx);
            p.vx -= Math.cos(angle) * force * 0.2;
            p.vy -= Math.sin(angle) * force * 0.2;
          }

          // Spring dynamics towards wave target
          const ax = (targetX - p.x) * tension;
          const ay = (targetY - p.y) * tension;

          p.vx = (p.vx + ax) * friction;
          p.vy = (p.vy + ay) * friction;

          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // Render Horizontal Waves
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1.8;
      ctx.globalAlpha = 0.75;

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          if (c === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            const prev = points[r][c - 1];
            const cx = (prev.x + p.x) / 2;
            const cy = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, cx, cy);
          }
        }
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(render);
    };

    animationRef.current = requestAnimationFrame(render);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [
    mounted,
    lineColor,
    backgroundColor,
    waveSpeedX,
    waveSpeedY,
    waveAmpX,
    waveAmpY,
    friction,
    tension,
    maxCursorMove,
    xGap,
    yGap,
    handleMouseMove,
  ]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`waves-container ${className}`}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
        ...style,
      }}
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
};

export default Waves;
