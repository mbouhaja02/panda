// =============================
// src/App.js (MÀJ)
// =============================
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence as AP } from "framer-motion";
import Head from "./components/Head";
import ProfileHeader from "./components/ProfileHeader";
import AboutMe from "./components/AboutMe";
import Formation from "./components/FormationSection";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Certificates from "./components/Certificates";
import Projects from "./components/Projects";
import SplashIntro from "./components/SplashIntro";

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Verrouille le scroll durant le splash
  useEffect(() => {
    if (showSplash) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => (document.body.style.overflow = "");
  }, [showSplash]);

  return (
    <div className="App min-h-screen bg-gradient-to-b from-blue-50 via-white to-sky-200 text-gray-900">
      {/* Splash (1s) */}
      <SplashIntro show={showSplash} onDone={() => setShowSplash(false)} />

      {/* Navigation */}
      <Head />

      <AP mode="wait">
        {/* Header animé */}
        <motion.div key="header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <ProfileHeader />
        </motion.div>

        {/* About Me */}
        <motion.div key="about" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <AboutMe />
        </motion.div>

        {/* Formation */}
        <motion.div key="formation" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Formation />
        </motion.div>

        {/* Experience */}
        <motion.div key="Experience" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Experience />
        </motion.div>

        {/* Projects */}
        <motion.div key="Projects" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Projects />
        </motion.div>

        {/* Skills */}
        <motion.div key="Skills" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Skills />
        </motion.div>

        {/* Certificates */}
        <motion.div key="Certificates" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}>
          <Certificates />
        </motion.div>
      </AP>

      {/* Footer */}
      <footer className="text-center py-10 text-sm text-blue-700/80">
        © {new Date().getFullYear()} Portfolio Ghita Idrissi – Ingénierie Électronique | React & Tailwind
      </footer>
    </div>
  );
}
