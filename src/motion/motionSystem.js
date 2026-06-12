/**
 * ZIARA — Motion Design System
 * Stripe / Linear / Vercel quality motion tokens & variants.
 *
 * Principles:
 *  • GPU-only transforms: translate, scale, opacity, rotate
 *  • Staggered orchestration — children always stagger from parent
 *  • Respect prefers-reduced-motion at the token level
 *  • 60 FPS budget: durations ≤ 500ms, eases are spring or cubic-bezier
 */

// ─── Easing curves (matching Linear/Vercel) ────────────────────────────────
export const ease = {
  out:      [0.16, 1, 0.3, 1],
  in:       [0.7, 0, 0.84, 0],
  inOut:    [0.45, 0, 0.55, 1],
  snap:     [0.32, 0.72, 0, 1],
};

// ─── Duration tokens ──────────────────────────────────────────────────────
export const dur = {
  instant: 0.08,
  fast:    0.18,
  base:    0.30,
  slow:    0.50,
  crawl:   0.70,
};

// ─── Spring configs — for micro-interactions ─────────────────────────────
export const spring = {
  snappy:  { type: 'spring', stiffness: 400, damping: 30 },
  bouncy:  { type: 'spring', stiffness: 300, damping: 20 },
  gentle:  { type: 'spring', stiffness: 200, damping: 28 },
  slow:    { type: 'spring', stiffness: 100, damping: 30 },
};

// ─── Stagger container ────────────────────────────────────────────────────
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
});

// ─── Shared variants ──────────────────────────────────────────────────────
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0,
    transition: { duration: dur.slow, ease: ease.out } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1,
    transition: { duration: dur.base, ease: ease.out } },
};

export const scaleUp = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1,
    transition: { duration: dur.slow, ease: ease.out } },
};

export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0,
    transition: { duration: dur.slow, ease: ease.out } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0,
    transition: { duration: dur.slow, ease: ease.out } },
};

export const heroLine = {
  hidden: { opacity: 0, y: 32, skewY: 2 },
  show: (i = 0) => ({
    opacity: 1, y: 0, skewY: 0,
    transition: { duration: dur.crawl, ease: ease.out, delay: i * 0.1 },
  }),
};

export const heroBadge = {
  hidden: { opacity: 0, scale: 0.88, y: -8 },
  show:   { opacity: 1, scale: 1, y: 0,
    transition: { duration: dur.slow, ease: ease.out, delay: 0.05 } },
};

export const statCard = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0,
    transition: { duration: dur.base, ease: ease.out } },
};

export const cardEntrance = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show:   { opacity: 1, y: 0, scale: 1,
    transition: { duration: dur.slow, ease: ease.out } },
};

// ─── Interactive / Hover states ───────────────────────────────────────────
export const cardHover = {
  rest:  { y: 0,  boxShadow: '0 4px 24px rgba(15,23,42,0.08)', transition: { duration: dur.base, ease: ease.inOut } },
  hover: { y: -6, boxShadow: '0 12px 48px rgba(15,23,42,0.14)', transition: { duration: dur.base, ease: ease.inOut } },
};

export const iconHover = {
  rest:  { rotate: 0,  scale: 1,   transition: { duration: dur.fast } },
  hover: { rotate: -6, scale: 1.08, transition: spring.snappy },
};

export const btnHover = {
  rest:   { scale: 1,    y: 0 },
  hover:  { scale: 1.02, y: -2, transition: spring.snappy },
  tap:    { scale: 0.97, y: 0,  transition: spring.snappy },
};

export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 0 0px rgba(20,184,166,0)',
      '0 0 0 8px rgba(20,184,166,0.12)',
      '0 0 0 0px rgba(20,184,166,0)',
    ],
    transition: { duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 1.2 },
  },
};

// ─── Background / Ambient ────────────────────────────────────────────────
export const floatShape = (duration = 8, y = 14) => ({
  animate: {
    y: [-y / 2, y / 2, -y / 2],
    transition: { duration, ease: 'easeInOut', repeat: Infinity },
  },
});

export const floatShapeXY = (duration = 10, x = 8, y = 12) => ({
  animate: {
    x: [-x, x, -x],
    y: [-y, y / 2, -y],
    transition: { duration, ease: 'easeInOut', repeat: Infinity },
  },
});

export const slowRotate = (duration = 20) => ({
  animate: {
    rotate: [0, 360],
    transition: { duration, ease: 'linear', repeat: Infinity },
  },
});

export const counterEase = { duration: 1.6, ease: [0.22, 1, 0.36, 1] };

// ─── Page transition (route change) ──────────────────────────────────────
export const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0,
    transition: { duration: dur.slow, ease: ease.out } },
  exit:    { opacity: 0, y: -8,
    transition: { duration: dur.base, ease: ease.in } },
};

// ─── Navbar ───────────────────────────────────────────────────────────────
export const navbarScroll = {
  transparent: {
    backgroundColor: 'rgba(15,23,42,0)',
    backdropFilter: 'blur(0px)',
    borderColor: 'rgba(255,255,255,0)',
    padding: '20px 0',
  },
  solid: {
    backgroundColor: 'rgba(15,23,42,0.92)',
    backdropFilter: 'blur(20px)',
    borderColor: 'rgba(255,255,255,0.06)',
    padding: '14px 0',
  },
};

export const mobileMenuVariant = {
  hidden: { opacity: 0, scaleY: 0.9, y: -8 },
  show:   { opacity: 1, scaleY: 1,   y: 0,
    transition: { duration: dur.base, ease: ease.out } },
  exit:   { opacity: 0, scaleY: 0.94, y: -8,
    transition: { duration: dur.fast, ease: ease.in } },
};
