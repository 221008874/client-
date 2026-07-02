import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ease, dur } from "../motion/motionSystem";
import "./SplashScreen.css";

const overlayVar = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: dur.slow, ease: ease.out } },
  exit: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(8px)",
    transition: { duration: dur.slow, ease: ease.out },
  },
};

const iconVar = {
  hidden: { opacity: 0, scale: 0.8, filter: "blur(10px)" },
  show: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: dur.crawl, ease: ease.out, delay: 0.1 },
  },
};

const brandVar = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: dur.slow, ease: ease.out, delay: 0.35 },
  },
};

const taglineVar = {
  hidden: { opacity: 0, y: 14, filter: "blur(4px)" },
  show: {
    opacity: 0.55,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: dur.base, ease: ease.smooth, delay: 0.55 },
  },
};

const dotsVar = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { delay: 0.8 } },
};

export default function SplashScreen({ onFinish }) {
  const [exit, setExit] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setExit(true), 2400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onFinish}>
      {!exit && (
        <motion.div
          className="splash-overlay"
          variants={overlayVar}
          initial="hidden"
          animate="show"
          exit="exit"
        >
          <div className="splash-bg" />

          <div className="splash-content">
            <motion.div className="splash-icon-wrap" variants={iconVar}>
              <div className="splash-icon-ring" />
              <svg className="splash-icon" viewBox="0 0 256 256" fill="none">
                <defs>
                  <linearGradient id="splashShield" x1="50%" y1="0%" x2="50%" y2="100%">
                    <stop offset="0%" stopColor="#00b8d4" />
                    <stop offset="100%" stopColor="#007085" />
                  </linearGradient>
                </defs>
                <path d="M128 16L32 64v64c0 53 38.5 101.5 96 112 57.5-10.5 96-59 96-112V64L128 16z" fill="url(#splashShield)" />
                <path d="M108 96l16-24 16 24v32h-32V96z" fill="#ffffff" opacity="0.9" />
                <circle cx="128" cy="112" r="12" fill="#ffffff" opacity="0.15" />
                <path d="M112 144h32v16h-32z" fill="#00b8d4" opacity="0.5" />
              </svg>
            </motion.div>

            <motion.h1 className="splash-brand" variants={brandVar}>
              Zeyara
            </motion.h1>

            <motion.p className="splash-tagline" variants={taglineVar}>
              ذكي لإدارة العيادات
            </motion.p>

            <motion.div className="splash-dots" variants={dotsVar}>
              <span className="splash-dot" style={{ animationDelay: "0s" }} />
              <span className="splash-dot" style={{ animationDelay: "0.15s" }} />
              <span className="splash-dot" style={{ animationDelay: "0.3s" }} />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
