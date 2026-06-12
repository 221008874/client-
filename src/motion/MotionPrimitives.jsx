import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion,
         useInView, animate, AnimatePresence } from "motion/react";
import {
  ease, dur, spring as springCfg,
  fadeUp, fadeIn, cardEntrance, btnHover, glowPulse,
  staggerContainer,
} from "./motionSystem.js";

export function ScrollReveal({
  children,
  variant = fadeUp,
  delay = 0,
  className = "",
  once = true,
  threshold = 0.12,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -60px 0px", amount: threshold });
  const prefersReduced = useReducedMotion();

  const safeVariant = prefersReduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: dur.base } } }
    : variant;

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

export function StaggerParent({
  children,
  stagger = 0.08,
  delay = 0,
  className = "",
  once = true,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: "0px 0px -40px 0px" });
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer(prefersReduced ? 0 : stagger, delay)}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCounter({ target, suffix = "", decimals = 0, duration = 1.6 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (prefersReduced) { setDisplay(target); return; }

    const controls = animate(0, target, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: v => setDisplay(parseFloat(v.toFixed(decimals))),
    });
    return controls.stop;
  }, [isInView, target, duration, decimals, prefersReduced]);

  return <span ref={ref}>{display}{suffix}</span>;
}

export function MagneticButton({ children, className = "", strength = 0.35, ...props }) {
  const ref = useRef(null);
  const prefersReduced = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 260, damping: 24 });
  const sy = useSpring(my, { stiffness: 260, damping: 24 });

  const onMouseMove = useCallback((e) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mx.set((e.clientX - cx) * strength);
    my.set((e.clientY - cy) * strength);
  }, [mx, my, strength, prefersReduced]);

  const onMouseLeave = useCallback(() => { mx.set(0); my.set(0); }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: sx, y: sy, display: "inline-block" }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      whileTap={prefersReduced ? {} : { scale: 0.97 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function MotionCard({ children, className = "", hoverLift = 6 }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      whileHover={prefersReduced ? {} : {
        y: -hoverLift,
        boxShadow: "0 16px 48px rgba(15,23,42,0.13)",
        transition: { duration: dur.base, ease: ease.inOut },
      }}
      whileTap={prefersReduced ? {} : { scale: 0.99 }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}

export function GlowButton({ children, className = "", tag: Tag = "a", ...props }) {
  const prefersReduced = useReducedMotion();
  const pulseAnim = prefersReduced ? {} : glowPulse;

  return (
    <motion.div
      style={{ display: "inline-block" }}
      variants={btnHover}
      initial="rest"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.span
        style={{ display: "inline-block", borderRadius: 50 }}
        animate={pulseAnim.animate}
      >
        <Tag className={className} {...props}>
          {children}
        </Tag>
      </motion.span>
    </motion.div>
  );
}

export function FloatingOrb({ size = 400, color = "rgba(20,184,166,0.07)", x = 0, y = 0, blur = 80, duration = 10, delay = 0 }) {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size,
        height: size,
        borderRadius: "50%",
        background: "radial-gradient(circle, " + color + " 0%, transparent 70%)",
        filter: "blur(" + blur + "px)",
        left: x,
        top: y,
        pointerEvents: "none",
        zIndex: 0,
      }}
      animate={prefersReduced ? {} : {
        y: [0, -20, 0],
        x: [0, 10, 0],
        scale: [1, 1.04, 1],
      }}
      transition={{
        duration,
        delay,
        ease: "easeInOut",
        repeat: Infinity,
      }}
    />
  );
}

export function GeometricShape({ size = 40, color = "rgba(20,184,166,0.12)", borderRadius = 8, x = 0, y = 0, duration = 7, delay = 0, rotate = 0 }) {
  const prefersReduced = useReducedMotion();
  return (
    <motion.div
      aria-hidden="true"
      style={{
        position: "absolute",
        width: size, height: size,
        background: color,
        borderRadius,
        border: "1px solid " + color.replace("0.12", "0.25"),
        left: x, top: y,
        pointerEvents: "none",
        zIndex: 0,
        rotate,
      }}
      animate={prefersReduced ? {} : {
        y: [0, -14, 0],
        rotate: [rotate, rotate + 10, rotate],
        opacity: [0.7, 1, 0.7],
      }}
      transition={{ duration, delay, ease: "easeInOut", repeat: Infinity }}
    />
  );
}
