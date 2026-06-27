import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { pageTransition } from "./motion/motionSystem";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Features from "./pages/Features";
import About from "./pages/About";
import Trust from "./pages/Trust";
import Pricing from "./pages/Pricing";
import VideoSection from "./pages/VideoSection";
import Download from "./pages/Download";
import Footer from "./pages/Footer";
import Guide from "./pages/Guide";

/* ─────────────────────────────────────────────
   SCROLL RESTORATION — Clean top-reset on nav
   ───────────────────────────────────────────── */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }, [pathname]);

  return null;
}

/* ─────────────────────────────────────────────
   SCROLL PROGRESS — Thin top progress bar
   ───────────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: 'linear-gradient(90deg, #06b6d4, #22d3ee, #06b6d4)',
        transformOrigin: '0%',
        scaleX,
        zIndex: 1001,
        opacity: 0.6,
      }}
    />
  );
}

/* ─────────────────────────────────────────────
   MAIN PAGE — All landing sections in order
   ───────────────────────────────────────────── */
function MainPage() {
  return (
    <main>
      <Hero />
      <Features />
      <About />
      <Trust />
      <Pricing />
      <VideoSection />
      <Download />
    </main>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED ROUTES — Smooth page transitions
   ───────────────────────────────────────────── */
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
        style={{ willChange: 'transform, opacity' }}
      >
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

/* ─────────────────────────────────────────────
   APP ROOT — Layout shell
   ───────────────────────────────────────────── */
export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <ScrollProgress />
      <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  );
}