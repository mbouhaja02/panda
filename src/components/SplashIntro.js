// =============================
// src/components/SplashIntro.jsx
// Écran d’accueil 3s : "Welcome to my portfolio, Ghita" + stickers panda aléatoires
// Barre de chargement VERTE + compte à rebours (3 → 0) qui diminue en temps réel
// Pandas qui se déplacent aléatoirement (x/y) en boucle
// =============================
import React, { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from "framer-motion";

export default function SplashIntro({ show, onDone }) {
  // Random stickers config (positions + animations uniques)
  const stickers = useMemo(() => {
    const count = 26;
    const arr = [];
    for (let i = 0; i < count; i++) {
      const top = Math.random() * 100; // vh
      const left = Math.random() * 100; // vw
      const rotate = Math.random() * 40 - 20; // -20..20°
      const scale = 0.8 + Math.random() * 0.6; // 0.8..1.4
      const delay = Math.random() * 0.6; // entrée légère
      // amplitude/durée aléatoires pour mouvement
      const dx = (Math.random() * 40 - 20) | 0; // -20..20 px
      const dy = (Math.random() * 40 - 20) | 0; // -20..20 px
      const dur = 2 + Math.random() * 2.5; // 2..4.5s
      arr.push({ id: i, top, left, rotate, scale, delay, dx, dy, dur });
    }
    return arr;
  }, []);

  // Progression 0→1 sur 3s avec framer-motion + texte restant (3→0)
  const progress = useMotionValue(0);
  const width = useTransform(progress, [0, 1], ["0%", "100%"]);
  const [remaining, setRemaining] = useState(3);

  useEffect(() => {
    if (!show) return;
    const controls = animate(progress, 1, {
      duration: 3,
      ease: "linear",
      onUpdate: (v) => {
        const left = Math.max(0, 3 - v * 3);
        // Affiche 3, 2, 1, 0 (arrondi supérieur léger pour éviter 3.0..)
        setRemaining(Math.ceil(left - 0.0001));
      },
      onComplete: () => onDone?.(),
    });
    return () => controls.stop();
  }, [show, onDone, progress]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden bg-gradient-to-br from-sky-50 via-white to-blue-100"
          aria-label="Écran d'introduction"
        >
          {/* arrière-plan aurora + grille subtile */}
          <div aria-hidden className="absolute inset-0 pointer-events-none">
            <div className="absolute -top-40 -left-24 h-[28rem] w-[28rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.sky.400),transparent)] opacity-40" />
            <div className="absolute -bottom-40 -right-24 h-[30rem] w-[30rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.indigo.500),transparent)] opacity-40" />
            <div className="absolute inset-0 bg-[radial-gradient(theme(colors.slate.300)_1px,transparent_1px)] [background-size:18px_18px] opacity-15" />
          </div>

          {/* Stickers panda qui bougent aléatoirement */}
          {stickers.map((s) => (
            <motion.span
              key={s.id}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: [10, -6, 0], opacity: 0.85 }}
              transition={{ duration: 0.7, delay: s.delay, ease: "easeOut" }}
              style={{ top: `${s.top}vh`, left: `${s.left}vw`, rotate: s.rotate, scale: s.scale }}
              className="absolute select-none text-[28px] sm:text-[34px] lg:text-[40px]"
            >
              {/* Mouvement perpetuel x/y aléatoire */}
              <motion.span
                animate={{ x: [0, s.dx, -s.dx, 0], y: [0, s.dy, -s.dy, 0] }}
                transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut" }}
                className="inline-block"
              >
                🐼
              </motion.span>
            </motion.span>
          ))}

          {/* Contenu central */}
          <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative text-center"
          >
            <motion.div className="inline-block rounded-3xl border border-sky-200/70 bg-white/70 backdrop-blur px-6 py-3 shadow-lg">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
                Welcome to my portfolio, <span className="text-sky-700">Ghita</span>
              </h1>
            </motion.div>

            {/* Barre de chargement */}
            <div className="mx-auto mt-5 w-[72vw] max-w-xl rounded-xl bg-slate-200/70 shadow-inner h-3 overflow-hidden" aria-label="Chargement">
              <motion.div style={{ width }} className="h-full bg-gradient-to-r from-emerald-500 via-emerald-400 to-emerald-500" />
            </div>
            <p className="mt-3 text-sky-800/80 text-sm">Loading… {remaining}s</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


