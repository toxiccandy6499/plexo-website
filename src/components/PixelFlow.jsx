import React, { useEffect, useRef } from 'react';

/*
 * Flowing dots in the PLEXO palette behind the hero.
 * They fade in as a soft wave, drift along a slow flow field, glide around the cursor
 * (a tap makes a ripple on phones, scrolling is never blocked), and fully pause when the
 * hero is off screen or the tab is hidden.
 */
const PALETTE = ['#FFE600', '#FFE600', '#FFE600', '#FFB800', '#FFB800', '#E52320', '#E52320', '#111111'];

function flow(x, y, t) {
  return Math.sin(x * 0.0021 + t * 0.15) * 1.3
       + Math.cos(y * 0.0026 - t * 0.11) * 1.1
       + Math.sin((x + y) * 0.0012 + t * 0.07) * 0.9;
}

export function PixelFlow({ className = '' }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const cv = canvasRef.current;
    const host = cv.parentElement;
    const ctx = cv.getContext('2d');
    const mobile = matchMedia('(pointer: coarse)').matches;
    const still = false;   // always animate (Windows 'Animation effects off' would otherwise freeze it)
    const ptr = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    let W = 0, H = 0, pts = [], start = 0, running = false, raf = 0, rz = 0;

    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = host.clientWidth; H = host.clientHeight;
      if (!W || !H) return false;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    }

    function setup() {
      if (!size()) return;
      const count = Math.min(Math.round((W * H) / (mobile ? 2600 : 2200)), mobile ? 320 : 480);
      pts = Array.from({ length: count }, () => {
        const x = Math.random() * W, y = Math.random() * H;
        return {
          x, y, vx: 0, vy: 0,
          hx: x, hy: y,                                   // home spot it wanders around
          ph: Math.random() * Math.PI * 2,                // its own phase, so dots don't move in lockstep
          sp: 0.4 + Math.random() * 0.6,
          r: (mobile ? 2.5 : 2.5) + Math.random() * 3.5,
          c: PALETTE[Math.floor(Math.random() * PALETTE.length)],
          delay: (x / W) * 1600 + Math.random() * 700,
          a: 0, max: 0.7 + Math.random() * 0.3,
        };
      });
      start = performance.now();
    }

    function frame(now) {
      const t = now / 1000, since = now - start;
      ctx.clearRect(0, 0, W, H);
      ptr.x += (ptr.tx - ptr.x) * 0.12; ptr.y += (ptr.ty - ptr.y) * 0.12;
      const R = mobile ? 90 : 150, R2 = R * R;
      for (const p of pts) {
        if (since < p.delay) continue;
        p.a += (p.max - p.a) * 0.03;
        // shared flow + a personal wobble, then a gentle pull back to its home so dots never bunch into lines
        const ang = flow(p.x, p.y, t) + Math.sin(t * p.sp + p.ph) * 1.6;
        p.vx += Math.cos(ang) * 0.03; p.vy += Math.sin(ang) * 0.03;
        p.vx += (p.hx - p.x) * 0.0016; p.vy += (p.hy - p.y) * 0.0016;
        // home spots drift very slowly so the field still feels alive
        p.hx += Math.cos(p.ph + t * 0.05) * 0.08; p.hy += Math.sin(p.ph + t * 0.04) * 0.08;
        if (p.hx < 0) p.hx += W; else if (p.hx > W) p.hx -= W;
        if (p.hy < 0) p.hy += H; else if (p.hy > H) p.hy -= H;
        const dx = p.x - ptr.x, dy = p.y - ptr.y, d2 = dx * dx + dy * dy;
        if (d2 < R2) {
          const d = Math.sqrt(d2) || 1, f = (1 - d / R) * 0.35;
          p.vx += (dx / d) * f; p.vy += (dy / d) * f;
        }
        p.vx *= 0.94; p.vy *= 0.94;
        // speed limit: everything glides, nothing darts
        const v = Math.hypot(p.vx, p.vy), MAX = 0.9;
        if (v > MAX) { p.vx = (p.vx / v) * MAX; p.vy = (p.vy / v) * MAX; }
        p.x += p.vx; p.y += p.vy;
        if (p.x < -10) { p.x = W + 10; p.hx = p.x; } else if (p.x > W + 10) { p.x = -10; p.hx = p.x; }
        if (p.y < -10) { p.y = H + 10; p.hy = p.y; } else if (p.y > H + 10) { p.y = -10; p.hy = p.y; }
        const ex = (p.x - W / 2) / (W * (mobile ? 0.48 : 0.34)), ey = (p.y - H / 2) / (H * 0.3);
        const e = ex * ex + ey * ey;                                    // 0 at centre, 1 at the text's edge
        const clear = e >= 1.6 ? 1 : e <= 0.35 ? 0.08 : 0.08 + 0.92 * ((e - 0.35) / 1.25);
        ctx.globalAlpha = p.a * clear;
        ctx.fillStyle = p.c;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      if (running) raf = requestAnimationFrame(frame);
    }

    const drawStill = () => { for (const p of pts) { p.a = p.max; p.delay = 0; } running = false; frame(performance.now()); };
    const play = () => {
      if (still) { drawStill(); return; }
      if (!running && !document.hidden) { running = true; raf = requestAnimationFrame(frame); }
    };
    const pause = () => { running = false; cancelAnimationFrame(raf); };

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? play() : pause()));
    io.observe(host);
    const onVis = () => (document.hidden ? pause() : play());
    document.addEventListener('visibilitychange', onVis);

    const onMove = (e) => {
      if (e.pointerType === 'touch') return;
      const r = host.getBoundingClientRect(); ptr.tx = e.clientX - r.left; ptr.ty = e.clientY - r.top;
    };
    const onLeave = () => { ptr.tx = ptr.ty = -9999; };
    let tapT = 0;
    const onDown = (e) => {
      if (e.pointerType !== 'touch') return;
      const r = host.getBoundingClientRect();
      ptr.tx = ptr.x = e.clientX - r.left; ptr.ty = ptr.y = e.clientY - r.top;
      clearTimeout(tapT); tapT = setTimeout(onLeave, 700);
    };
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerdown', onDown);
    const onResize = () => {
      clearTimeout(rz);
      rz = setTimeout(() => {
        const oldW = W;
        if (!pts.length || Math.abs(host.clientWidth - oldW) > 80) { setup(); if (still) drawStill(); return; }   // real layout change
        const sx = host.clientWidth / (oldW || 1);
        if (!size()) return;                                         // small change: keep dots, just rescale
        for (const p of pts) { p.x *= sx; p.hx *= sx; p.a = Math.max(p.a, p.max * 0.8); p.delay = 0; }
        if (!running) frame(performance.now());
      }, 150);
    };
    window.addEventListener('resize', onResize);

    setup();
    return () => {
      pause(); io.disconnect();
      document.removeEventListener('visibilitychange', onVis);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
      window.removeEventListener('resize', onResize);
      clearTimeout(rz); clearTimeout(tapT);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className={`absolute inset-0 w-full h-full pointer-events-none ${className}`} />;
}
