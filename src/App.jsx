import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import { useScrollAnimation } from "./animation/Usescrollanimation";

function MainPage() {
  useScrollAnimation();
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

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/guide" element={<Guide />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}