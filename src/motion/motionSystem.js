/* ═══════════════════════════════════════════════
   MOTION SYSTEM — Enterprise Healthcare SaaS
   ═══════════════════════════════════════════════ */

/* ─── EASING CURVES ─── */
export const ease = {
  out:      [0.16, 1, 0.3, 1],
  in:       [0.7, 0, 0.84, 0],
  inOut:    [0.45, 0, 0.55, 1],
  snap:     [0.32, 0.72, 0, 1],
  smooth:   [0.25, 0.46, 0.45, 0.94],
  sharp:    [0.4, 0, 0.2, 1],
  expo:     [0.16, 1, 0.3, 1],
};

/* ─── DURATIONS ─── */
export const dur = {
  instant: 0.08,
  fast:    0.18,
  base:    0.30,
  slow:    0.50,
  crawl:   0.70,
  premium: 0.60,
};

/* ─── SPRING CONFIGS ─── */
export const spring = {
  snappy:  { type: 'spring', stiffness: 400, damping: 30 },
  bouncy:  { type: 'spring', stiffness: 300, damping: 20 },
  gentle:  { type: 'spring', stiffness: 200, damping: 28 },
  slow:    { type: 'spring', stiffness: 100, damping: 30 },
  precise: { type: 'spring', stiffness: 500, damping: 35 },
  soft:    { type: 'spring', stiffness: 150, damping: 25 },
  magnetic:{ type: 'spring', stiffness: 150, damping: 15 },
};

/* ─── CONTAINER VARIANTS ─── */
export const staggerContainer = (staggerChildren = 0.08, delayChildren = 0) => ({
  hidden: {},
  show:   { transition: { staggerChildren, delayChildren } },
});

export const staggerBlurContainer = (staggerChildren = 0.07, delayChildren = 0) => ({
  hidden: {},
  show:   {
    transition: {
      staggerChildren,
      delayChildren,
      staggerDirection: 1,
    },
  },
});

/* ─── FADE VARIANTS ─── */
export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
};

export const fadeDown = {
  hidden: { opacity: 0, y: -24 },
  show:   { opacity: 1, y: 0, transition: { duration: dur.slow, ease: ease.out } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: dur.base, ease: ease.out } },
};

export const fadeUpBlur = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: dur.premium, ease: ease.smooth },
  },
};

export const fadeInBlur = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  show:   {
    opacity: 1, filter: 'blur(0px)',
    transition: { duration: dur.premium, ease: ease.smooth },
  },
};

/* ─── SCALE VARIANTS ─── */
export const scaleUp = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1, transition: { duration: dur.slow, ease: ease.out } },
};

export const scaleUpBlur = {
  hidden: { opacity: 0, scale: 0.92, filter: 'blur(6px)' },
  show:   {
    opacity: 1, scale: 1, filter: 'blur(0px)',
    transition: { duration: dur.premium, ease: ease.smooth },
  },
};

export const scaleDown = {
  hidden: { opacity: 0, scale: 1.06 },
  show:   { opacity: 1, scale: 1, transition: { duration: dur.slow, ease: ease.out } },
};

/* ─── SLIDE VARIANTS ─── */
export const slideInRight = {
  hidden: { opacity: 0, x: 40 },
  show:   { opacity: 1, x: 0, transition: { duration: dur.slow, ease: ease.out } },
};

export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show:   { opacity: 1, x: 0, transition: { duration: dur.slow, ease: ease.out } },
};

export const slideInRightBlur = {
  hidden: { opacity: 0, x: 48, filter: 'blur(6px)' },
  show:   {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: dur.premium, ease: ease.smooth },
  },
};

export const slideInLeftBlur = {
  hidden: { opacity: 0, x: -48, filter: 'blur(6px)' },
  show:   {
    opacity: 1, x: 0, filter: 'blur(0px)',
    transition: { duration: dur.premium, ease: ease.smooth },
  },
};

/* ─── HERO VARIANTS ─── */
export const heroLine = {
  hidden: { opacity: 0, y: 32, skewY: 2, filter: 'blur(4px)' },
  show: (i = 0) => ({
    opacity: 1, y: 0, skewY: 0, filter: 'blur(0px)',
    transition: {
      duration: dur.crawl,
      ease: ease.out,
      delay: i * 0.1,
    },
  }),
};

export const heroBadge = {
  hidden: { opacity: 0, scale: 0.85, y: -12, filter: 'blur(6px)' },
  show:   {
    opacity: 1, scale: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: dur.slow, ease: ease.out, delay: 0.05 },
  },
};

export const heroFloat = {
  animate: {
    y: [0, -12, 0],
    transition: {
      duration: 6,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatType: 'reverse',
    },
  },
};

/* ─── CARD VARIANTS ─── */
export const statCardVar = {
  hidden: { opacity: 0, y: 16, filter: 'blur(4px)' },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: dur.base, ease: ease.smooth },
  },
};

export const cardEntrance = {
  hidden: { opacity: 0, y: 20, scale: 0.97, filter: 'blur(4px)' },
  show:   {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: { duration: dur.slow, ease: ease.smooth },
  },
};

export const cardGrid = (index = 0) => ({
  hidden: { opacity: 0, y: 24, scale: 0.96, filter: 'blur(4px)' },
  show:   {
    opacity: 1, y: 0, scale: 1, filter: 'blur(0px)',
    transition: {
      duration: dur.premium,
      ease: ease.smooth,
      delay: index * 0.08,
    },
  },
});

/* ─── BUTTON VARIANTS ─── */
export const btnHover = {
  rest:   { scale: 1,    y: 0 },
  hover:  { scale: 1.02, y: -2, transition: spring.snappy },
  tap:    { scale: 0.97, y: 0,  transition: spring.snappy },
};

export const btnGlow = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0 0px rgba(6, 182, 212, 0)',
  },
  hover: {
    scale: 1.03,
    y: -2,
    boxShadow: '0 0 24px 4px rgba(6, 182, 212, 0.2)',
    transition: spring.snappy,
  },
  tap: {
    scale: 0.97,
    y: 0,
    boxShadow: '0 0 0 0px rgba(6, 182, 212, 0)',
    transition: spring.snappy,
  },
};

/* ─── GLOW / PULSE VARIANTS ─── */
export const glowPulse = {
  animate: {
    boxShadow: [
      '0 0 0 0px rgba(6, 182, 212, 0)',
      '0 0 0 8px rgba(6, 182, 212, 0.12)',
      '0 0 0 16px rgba(6, 182, 212, 0)',
    ],
    transition: {
      duration: 2.4,
      ease: 'easeInOut',
      repeat: Infinity,
      repeatDelay: 1.2,
    },
  },
};

export const subtlePulse = {
  animate: {
    opacity: [0.6, 1, 0.6],
    scale: [0.98, 1.02, 0.98],
    transition: {
      duration: 4,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

export const breathe = {
  animate: {
    scale: [1, 1.04, 1],
    transition: {
      duration: 5,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/* ─── PAGE TRANSITION — Frosted glass swap ─── */
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 12,
    filter: 'blur(6px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
  exit: {
    opacity: 0,
    y: -8,
    filter: 'blur(4px)',
    transition: { duration: 0.3, ease: [0.4, 0, 1, 1] },
  },
};

/* ─── NAVBAR SCROLL STATES ─── */
export const navbarScroll = {
  transparent: {
    backgroundColor: 'rgba(8, 15, 30, 0)',
    backdropFilter: 'blur(0px)',
    borderColor: 'rgba(255, 255, 255, 0)',
  },
  solid: {
    backgroundColor: 'rgba(8, 15, 30, 0.88)',
    backdropFilter: 'blur(24px) saturate(1.4)',
    borderColor: 'rgba(255, 255, 255, 0.08)',
    transition: { duration: 0.4, ease: ease.smooth },
  },
};

/* ─── ACCORDION / FAQ ─── */
export const accordionContent = {
  hidden: {
    height: 0,
    opacity: 0,
    filter: 'blur(4px)',
    transition: {
      height: { duration: 0.35, ease: [0.32, 0.72, 0, 1] },
      opacity: { duration: 0.25, delay: 0.05 },
      filter: { duration: 0.3, delay: 0.05 },
    },
  },
  show: {
    height: 'auto',
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      height: { duration: 0.4, ease: [0.32, 0.72, 0, 1] },
      opacity: { duration: 0.3, delay: 0.1 },
      filter: { duration: 0.35, delay: 0.1 },
    },
  },
};

export const accordionIcon = {
  closed: { rotate: 0, scale: 1 },
  open:   { rotate: 45, scale: 1.1, transition: spring.snappy },
};

/* ─── CAROUSEL / TESTIMONIAL ─── */
export const carouselSlide = {
  enter: (direction) => ({
    x: direction > 0 ? 200 : -200,
    opacity: 0,
    filter: 'blur(4px)',
    scale: 0.95,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.5, ease: ease.smooth },
  },
  exit: (direction) => ({
    x: direction > 0 ? -200 : 200,
    opacity: 0,
    filter: 'blur(4px)',
    scale: 0.95,
    transition: { duration: 0.35, ease: ease.sharp },
  }),
};

/* ─── PRICING CARD ─── */
export const pricingHighlight = {
  rest:   { y: 0, boxShadow: '0 0 0 0px rgba(6, 182, 212, 0)' },
  popular: {
    y: -8,
    boxShadow: '0 0 0 2px rgba(6, 182, 212, 0.25), 0 20px 60px rgba(6, 182, 212, 0.1)',
    transition: spring.gentle,
  },
};

/* ─── DASHBOARD FLOAT ─── */
export const dashboardFloat = {
  animate: {
    y: [0, -16, -6, -20, 0],
    rotateX: [0, 1, 0, -1, 0],
    rotateY: [0, -0.5, 0.5, 0, 0],
    transition: {
      duration: 12,
      ease: 'easeInOut',
      repeat: Infinity,
    },
  },
};

/* ─── STAGGER ITEM (for use inside staggerContainer) ─── */
export const staggerItem = (index = 0) => ({
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: {
      duration: dur.premium,
      ease: ease.smooth,
      delay: index * 0.08,
    },
  },
});

/* ─── NUMBER ROLL (for stat counters) ─── */
export const numberRoll = {
  hidden: { opacity: 0, y: 16, filter: 'blur(6px)' },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: dur.slow, ease: ease.smooth },
  },
};

/* ─── SECTION REVEAL (subtle, for large sections) ─── */
export const sectionReveal = {
  hidden: { opacity: 0, y: 40, filter: 'blur(2px)' },
  show:   {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.8, ease: ease.smooth },
  },
};