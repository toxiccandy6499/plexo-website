import React, { useEffect, useRef, useState } from 'react';

/*
 * Google Labs-style footer playground: PLEXO things fall in when the section comes into view,
 * and you can grab, drag and throw them. Physics by matter-js; the items are normal DOM elements
 * whose position/rotation is copied from their physics bodies every frame.
 *
 * Dragging uses pointer events on the items only, so on phones the empty space still scrolls the page.
 */
// Chunky, rounded shapes in PLEXO red and yellow, all the same size (S on laptops, about half on phones).
const Y = '#FFE600', R = '#E52320';
const S = 210;
const SHAPES = [
  { kind: 'circle', color: Y },
  { kind: 'square', color: R },
  { kind: 'flower', color: Y },
  { kind: 'hex', color: R },
  { kind: 'octagon', color: Y },
  { kind: 'scallop', color: R },
];

// Regular polygon points in a w x h box, pulled in by `pad` so a thick round-joined stroke
// rounds the corners while the outer edge still meets the box.
function polyPoints(sides, w, h, startDeg, pad) {
  const cx = w / 2, cy = h / 2;
  const R0 = Math.max(w, h) / 2 / (sides === 8 ? Math.cos(Math.PI / 8) : 1);
  const r = R0 - pad;
  return Array.from({ length: sides }, (_, i) => {
    const a = ((startDeg + (360 / sides) * i) * Math.PI) / 180;
    return `${(cx + r * Math.cos(a)).toFixed(2)},${(cy + r * Math.sin(a)).toFixed(2)}`;
  }).join(' ');
}

function ShapeArt({ kind, color }) {
  const svg = (vb, children) => <svg viewBox={vb} className="block w-full h-full overflow-visible" aria-hidden="true">{children}</svg>;
  if (kind === 'flower')
    return svg('0 0 100 100', <g fill={color}>
      <circle cx="50" cy="50" r="26" />
      {[[50, 24], [76, 50], [50, 76], [24, 50]].map(([x, y]) => <circle key={`${x}${y}`} cx={x} cy={y} r="24" />)}
    </g>);
  if (kind === 'scallop')
    return svg('0 0 100 100', <g fill={color}>
      <circle cx="50" cy="50" r="38" />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4;
        return <circle key={i} cx={50 + 35 * Math.cos(a)} cy={50 + 35 * Math.sin(a)} r="15" />;
      })}
    </g>);
  if (kind === 'hex') // pointy-top, box is sqrt(3)/2 as wide as tall
    return svg('0 0 86.6 100', <polygon points={polyPoints(6, 86.6, 100, -90, 11)} fill={color} stroke={color} strokeWidth="22" strokeLinejoin="round" />);
  if (kind === 'octagon') // flat top
    return svg('0 0 100 100', <polygon points={polyPoints(8, 100, 100, 22.5, 11)} fill={color} stroke={color} strokeWidth="22" strokeLinejoin="round" />);
  return null;
}

function shapeStyle(sh, k) {
  const size = Math.round(S * k);
  const w = sh.kind === 'hex' ? Math.round(size * 0.866) : size;
  const base = { width: w, height: size };
  if (sh.kind === 'circle') return { ...base, borderRadius: '9999px', background: sh.color };
  if (sh.kind === 'square') return { ...base, borderRadius: Math.round(size * 0.26), background: sh.color };
  return base;
}

export function Playground() {
  const boxRef = useRef(null);
  const itemRefs = useRef([]);
  // Shape size follows the screen: about half on phones, and smaller on short laptop screens so they never pile up out of view.
  const [k] = useState(() => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth < 640) return 0.58; // phones
    const byWidth = window.innerWidth < 1100 ? 0.95 : 1.2;
    return Math.min(byWidth, window.innerHeight / 700);
  });

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    // Lighter first load: the physics engine (matter-js) is only downloaded when the visitor
    // scrolls near the bottom of the page, a little before the footer is revealed.
    let cleanup = null, loading = false, dead = false;
    const nearFooter = () => {
      return box.getBoundingClientRect().top < window.innerHeight * 1.8;
    };
    const maybeLoad = () => {
      if (loading || !nearFooter()) return;
      loading = true;
      window.removeEventListener('scroll', maybeLoad);
      import('matter-js').then(({ default: Matter }) => { if (!dead) cleanup = setup(Matter); });
    };
    window.addEventListener('scroll', maybeLoad, { passive: true });
    maybeLoad();
    return () => {
      dead = true;
      window.removeEventListener('scroll', maybeLoad);
      if (cleanup) cleanup();
    };

    function setup(Matter) {
    const { Engine, Runner, Bodies, Body, Composite, Constraint, Events } = Matter;

    const engine = Engine.create({ gravity: { x: 0, y: 1 } });
    const runner = Runner.create();
    let walls = [];
    let bodies = [];
    let started = false;
    let raf = 0;

    const W = () => box.clientWidth;
    const H = () => box.clientHeight;

    const buildWalls = () => {
      Composite.remove(engine.world, walls);
      const t = 200;
      walls = [
        Bodies.rectangle(W() / 2, H() + t / 2, W() * 3, t, { isStatic: true }), // floor
        Bodies.rectangle(-t / 2, H() / 2 - 1000, t, H() * 2 + 2000, { isStatic: true }), // left
        Bodies.rectangle(W() + t / 2, H() / 2 - 1000, t, H() * 2 + 2000, { isStatic: true }), // right
      ];
      Composite.add(engine.world, walls);
    };

    const spawn = () => {
      bodies = SHAPES.map((item, i) => {
        const el = itemRefs.current[i];
        const w = el.offsetWidth, h = el.offsetHeight;
        const x = 60 + Math.random() * Math.max(1, W() - 120);
        const y = -h - i * 140; // staggered drop from above
        const opts = { restitution: 0.35, friction: 0.3, frictionAir: 0.01, angle: (Math.random() - 0.5) * 0.8 };
        let b;
        // Round-ish shapes (circle, flower, scallop) roll as circles; the rest keep their corners, softened.
        if (item.kind === 'circle' || item.kind === 'flower' || item.kind === 'scallop') b = Bodies.circle(x, y, w / 2, { ...opts, restitution: 0.5 });
        else if (item.kind === 'hex') b = Bodies.polygon(x, y, 6, h / 2, { ...opts, chamfer: { radius: h * 0.12 } }); // pointy-top like the drawing
        else if (item.kind === 'octagon') b = Bodies.polygon(x, y, 8, h / 2 / Math.cos(Math.PI / 8), { ...opts, chamfer: { radius: h * 0.1 } });
        else b = Bodies.rectangle(x, y, w, h, { ...opts, chamfer: { radius: w * 0.26 } });
        b.plexoW = w; b.plexoH = h;
        return b;
      });
      Composite.add(engine.world, bodies);
    };

    // copy physics → DOM every frame
    const sync = () => {
      bodies.forEach((b, i) => {
        const el = itemRefs.current[i];
        if (!el) return;
        el.style.transform = `translate(${b.position.x - b.plexoW / 2}px, ${b.position.y - b.plexoH / 2}px) rotate(${b.angle}rad)`;
        el.style.opacity = 1;
      });
      raf = requestAnimationFrame(sync);
    };

    // drag with pointer events on the items only
    let drag = null;
    const toLocal = (e) => {
      const r = box.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const onDown = (i) => (e) => {
      const b = bodies[i];
      if (!b) return;
      e.preventDefault();
      const p = toLocal(e);
      const offset = Matter.Vector.rotate({ x: p.x - b.position.x, y: p.y - b.position.y }, -b.angle);
      drag = Constraint.create({ pointA: p, bodyB: b, pointB: offset, stiffness: 0.2, damping: 0.1, length: 0 });
      Composite.add(engine.world, drag);
      itemRefs.current[i].setPointerCapture(e.pointerId);
      itemRefs.current[i].style.cursor = 'grabbing';
    };
    const onMove = (e) => { if (drag) drag.pointA = toLocal(e); };
    const onUp = (i) => () => {
      if (drag) Composite.remove(engine.world, drag);
      drag = null;
      if (itemRefs.current[i]) itemRefs.current[i].style.cursor = '';
    };
    const handlers = SHAPES.map((_, i) => ({ down: onDown(i), up: onUp(i) }));
    itemRefs.current.forEach((el, i) => {
      el.addEventListener('pointerdown', handlers[i].down);
      el.addEventListener('pointermove', onMove);
      el.addEventListener('pointerup', handlers[i].up);
      el.addEventListener('pointercancel', handlers[i].up);
    });

    // keep things inside if they get flung out
    Events.on(engine, 'afterUpdate', () => {
      bodies.forEach((b) => {
        if (b.position.y > H() + 300 || b.position.x < -300 || b.position.x > W() + 300) {
          Body.setPosition(b, { x: W() / 2, y: -100 });
          Body.setVelocity(b, { x: 0, y: 0 });
        }
      });
    });

    // only run while on screen; start the drop the first time it's seen
    // The footer sits pinned behind the page, so "visible" means the page above has slid away enough.
    let running = false;
    const check = () => {
      const r = box.getBoundingClientRect();
      const revealed = r.top < window.innerHeight * 0.7 && r.bottom > 0;
      if (revealed && !running) {
        running = true;
        if (!started) { started = true; buildWalls(); spawn(); }
        Runner.run(runner, engine);
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(sync);
      } else if (!revealed && running) {
        running = false;
        Runner.stop(runner);
        cancelAnimationFrame(raf);
      }
    };
    window.addEventListener('scroll', check, { passive: true });
    check();

    if (import.meta.env.DEV) window.__plexoPlay = { engine, Engine, bodies: () => bodies, start: () => { if (!started) { started = true; buildWalls(); spawn(); } } };

    const ro = new ResizeObserver(() => { if (started) buildWalls(); });
    ro.observe(box);

    return () => {
      window.removeEventListener('scroll', check);
      ro.disconnect();
      Runner.stop(runner);
      cancelAnimationFrame(raf);
      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        el.removeEventListener('pointerdown', handlers[i].down);
        el.removeEventListener('pointermove', onMove);
        el.removeEventListener('pointerup', handlers[i].up);
        el.removeEventListener('pointercancel', handlers[i].up);
      });
      Composite.clear(engine.world, false);
      Engine.clear(engine);
    };
    }
  }, []);

  return (
    <div ref={boxRef} className="relative flex-1 min-h-[160px] overflow-hidden select-none">
      {SHAPES.map((sh, i) => (
        <div
          key={i}
          ref={(el) => (itemRefs.current[i] = el)}
          className="absolute left-0 top-0 opacity-0 cursor-grab touch-none will-change-transform"
          style={{ transformOrigin: 'center center', ...shapeStyle(sh, k) }}
        >
          <ShapeArt kind={sh.kind} color={sh.color} />
        </div>
      ))}
    </div>
  );
}
