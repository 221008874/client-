import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion, useInView, useMotionValue, useSpring, useTransform, animate, useScroll } from "motion/react";
import { fadeUp, dur, ease, staggerContainer, fadeDown, fadeIn, scaleUp } from "./motionSystem";

/* ─────────────────────────────────────────────
   SCROLL REVEAL — Enhanced with direction support
   ───────────────────────────────────────────── */
export function ScrollReveal({
  children,
  variant = fadeUp,
  delay = 0,
  className = "",
  once = true,
  threshold = 0.12,
  direction,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -50px 0px", amount: threshold });
  const prefersReduced = useReducedMotion();

  const directionMap = {
    up: fadeUp,
    down: fadeDown || fadeUp,
    left: { hidden: { opacity: 0, x: -40 }, show: { opacity: 1, x: 0, transition: { duration: dur.base, ease: ease.out, delay } } },
    right: { hidden: { opacity: 0, x: 40 }, show: { opacity: 1, x: 0, transition: { duration: dur.base, ease: ease.out, delay } } },
    none: { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: dur.base, delay } } },
  };

  const safeVariant = prefersReduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: dur.base } } }
    : (direction ? directionMap[direction] : variant);

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={safeVariant}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      custom={delay}
      style={{ willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STAGGER PARENT — Enhanced with axis control
   ───────────────────────────────────────────── */
export function StaggerParent({
  children,
  stagger = 0.08,
  delay = 0,
  className = "",
  once = true,
  staggerAxis,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -30px 0px" });
  const prefersReduced = useReducedMotion();

  const baseContainer = staggerContainer(prefersReduced ? 0 : stagger, delay);

  if (staggerAxis === "x") {
    baseContainer.show.transition.staggerDirection = 1;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={baseContainer}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED COUNTER — Premium number rolling
   ───────────────────────────────────────────── */
export function AnimatedCounter({
  target,
  suffix = "",
  prefix = "",
  decimals = 0,
  duration = 2,
  separator = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const prefersReduced = useReducedMotion();

  const formatNumber = useCallback((num) => {
    const fixed = num.toFixed(decimals);
    if (!separator || decimals > 0) return fixed;
    return Number(fixed).toLocaleString("en-US");
  }, [decimals, separator]);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    if (prefersReduced) {
      setDisplay(target);
      setHasAnimated(true);
      return;
    }

    setHasAnimated(true);
    const controls = animate(0, target, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(parseFloat(v.toFixed(decimals))),
    });

    return controls.stop;
  }, [isInView, target, duration, decimals, prefersReduced, hasAnimated]);

  return (
    <span ref={ref} style={{ display: "inline-block", fontVariantNumeric: "tabular-nums" }}>
      {prefix}{formatNumber(display)}{suffix}
    </span>
  );
}

/* ─────────────────────────────────────────────
   MOTION CARD — Premium hover with glow
   ───────────────────────────────────────────── */
export function MotionCard({
  children,
  className = "",
  hoverLift = 8,
  glowColor = "rgba(6, 182, 212, 0.08)",
  glowSize = 40,
  borderColor = "rgba(6, 182, 212, 0.15)",
}) {
  const prefersReduced = useReducedMotion();
  const cardRef = useRef(null);

  const handleMouse = useCallback((e) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    cardRef.current.style.setProperty("--mouse-x", `${x}px`);
    cardRef.current.style.setProperty("--mouse-y", `${y}px`);
  }, [prefersReduced]);

  return (
    <motion.div
      ref={cardRef}
      className={className}
      onMouseMove={handleMouse}
      whileHover={
        prefersReduced
          ? {}
          : {
              y: -hoverLift,
              transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] },
            }
      }
      whileTap={prefersReduced ? {} : { scale: 0.985, transition: { duration: 0.15 } }}
      style={{
        willChange: "transform",
        "--glow-color": glowColor,
        "--glow-size": `${glowSize}px`,
        "--glow-border": borderColor,
        position: "relative",
      }}
    >
      {/* Spotlight glow layer */}
      {!prefersReduced && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            opacity: 0,
            transition: "opacity 0.4s ease",
            background: `radial-gradient(${glowSize}px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${glowColor}, transparent 70%)`,
            pointerEvents: "none",
            zIndex: 1,
          }}
          className="card-glow-layer"
        />
      )}
      {/* Border glow layer */}
      {!prefersReduced && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            opacity: 0,
            transition: "opacity 0.4s ease",
            boxShadow: `0 0 0 1px ${borderColor}`,
            pointerEvents: "none",
            zIndex: 2,
          }}
          className="card-border-glow"
        />
      )}
      <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   PARALLAX FLOAT — Subtle depth on scroll
   ───────────────────────────────────────────── */
export function ParallaxFloat({ children, speed = 0.3, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const prefersReduced = useReducedMotion();
  const y = useTransform(scrollYProgress, [0, 1], [speed * 40, speed * -40]);
  const smoothY = useSpring(y, { stiffness: 80, damping: 20, mass: 0.8 });

  if (prefersReduced) return <div className={className}>{children}</div>;

  return (
    <motion.div ref={ref} className={className} style={{ y: smoothY }}>
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAGNETIC HOVER — Premium button attraction
   ───────────────────────────────────────────── */
export function MagneticHover({ children, strength = 0.25, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });
  const prefersReduced = useReducedMotion();

  const handleMouse = useCallback((e) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  }, [strength, x, y, prefersReduced]);

  const handleLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   GLOW ORB — Background decoration element
   ───────────────────────────────────────────── */
export function GlowOrb({
  size = 400,
  color = "rgba(6, 182, 212, 0.07)",
  position = "top",
  className = "",
  blur = 80,
}) {
  const prefersReduced = useReducedMotion();
  const positionStyles = {
    top: { top: "-10%", left: "50%", transform: "translateX(-50%)" },
    topLeft: { top: "-5%", left: "-5%" },
    topRight: { top: "-5%", right: "-5%" },
    bottom: { bottom: "-10%", left: "50%", transform: "translateX(-50%)" },
    bottomLeft: { bottom: "-5%", left: "-5%" },
    bottomRight: { bottom: "-5%", right: "-5%" },
    center: { top: "50%", left: "50%", transform: "translate(-50%, -50%)" },
  };

  return (
    <motion.div
      className={className}
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: color,
        filter: `blur(${blur}px)`,
        pointerEvents: "none",
        ...positionStyles[position],
      }}
      animate={
        prefersReduced
          ? {}
          : {
              scale: [1, 1.15, 1],
              opacity: [0.7, 1, 0.7],
            }
      }
      transition={{
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   TEXT REVEAL — Character/word stagger reveal
   ───────────────────────────────────────────── */
export function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  as: Tag = "span",
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReduced = useReducedMotion();
  const words = text.split(" ");

  if (prefersReduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: stagger, delayChildren: delay },
    },
  };

  const wordVar = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
    },
  };

  return (
    <motion.div ref={ref} className={className} variants={container} initial="hidden" animate={isInView ? "show" : "hidden"}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          variants={wordVar}
          style={{ display: "inline-block", marginRight: "0.3em" }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION DIVIDER — Elegant gradient separator
   ───────────────────────────────────────────── */
export function SectionDivider({ variant = "gradient", className = "" }) {
  const styles = {
    gradient: {
      height: 1,
      background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.2), rgba(6,182,212,0.08), transparent)",
    },
    subtle: {
      height: 1,
      background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
    },
    glow: {
      height: 2,
      background: "linear-gradient(90deg, transparent, rgba(6,182,212,0.3), transparent)",
      boxShadow: "0 0 20px rgba(6,182,212,0.1)",
    },
  };

  return (
    <div
      className={className}
      style={{
        width: "100%",
        maxWidth: "800px",
        margin: "0 auto",
        ...styles[variant],
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   FLOATING PARTICLES — Minimal ambient effect
   ───────────────────────────────────────────── */
export function FloatingParticles({ count = 6, className = "" }) {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) return null;

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    size: Math.random() * 3 + 1.5,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 12 + 10,
    delay: Math.random() * 5,
    opacity: Math.random() * 0.3 + 0.1,
  }));

  return (
    <div className={className} style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          style={{
            position: "absolute",
            width: p.size,
            height: p.size,
            borderRadius: "50%",
            background: "rgba(6, 182, 212, 0.6)",
            left: `${p.x}%`,
            top: `${p.y}%`,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, -30, 10, -20, 0],
            x: [0, 15, -10, 8, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity * 0.7, p.opacity * 1.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}