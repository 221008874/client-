import Navbar from "./components/Navbar";
import Hero from "./pages/Hero";
import Features from "./pages/Features";
import About from "./pages/About";
import Trust from "./pages/Trust";
import Pricing from "./pages/Pricing";
import Download from "./pages/Download";
import Footer from "./pages/Footer";
import { useScrollAnimation } from "./animation/Usescrollanimation";

export default function App() {
  useScrollAnimation();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <About />
        <Trust />
        <Pricing />
        <Download />
      </main>
      <Footer />
    </>
  );
}
