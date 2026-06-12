import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import { pageTransition } from "./motion/motionSystem";
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
      >
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/guide" element={<Guide />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AnimatedRoutes />
      <Footer />
    </BrowserRouter>
  );
}