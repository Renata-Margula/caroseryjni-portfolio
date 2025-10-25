import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Header from "./components/Header.jsx";
import AnimatedLightEffect from "./components/AnimatedLightEffect.jsx";

import Home from "./pages/Home.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showIntroLogo, setShowIntroLogo] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowIntroLogo(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <AnimatedLightEffect />
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <AnimatePresence>
        {showIntroLogo && (
          <motion.div
            className="fixed inset-0 bg-black flex items-center justify-center z-50"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.img
              src="/images/caroseryjni_logo_bl_wh.png"
              alt="Logo"
              initial={{ scale: 3 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-32 h-32 object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}
