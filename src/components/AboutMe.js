import React, { useMemo, useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import pdp from '../assets/ghita_pdp.jpg'
import panda from '../assets/panda.png'

// ——————————————————————————————————————————
//  AboutMe — section avec fond animé (pandas),
//  animations accessibles, palette bleu/ardoise cohérente
// ——————————————————————————————————————————

const PANDA_COUNT = 8 // un peu moins pour éviter la surcharge visuelle

export default function AboutMe() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' })
  const prefersReduced = useReducedMotion()

  // Génération unique (pas à chaque render)
  const pandas = useMemo(() =>
    Array.from({ length: PANDA_COUNT }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 90 + 3}%`,
      left: `${Math.random() * 90 + 3}%`,
      size: Math.round(Math.random() * 40 + 60), // 60 → 100 px base
      delay: Math.random() * 1.8,
      duration: Math.random() * 4 + 5, // 5 → 9 s
    })),
  [])

  // Variants
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.08 },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 32 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  }

  const image = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9, ease: 'easeOut' },
    },
  }

  // Contenus — plus robustes (tableau d'éléments)
  const paragraphs = [
    [
      'Étudiante en ',
      ['Master 1 Ingénierie des Systèmes Complexes'],
      ' – parcours ',
      ['Systèmes Électroniques à l’Université de Bordeaux'],
      ', je suis passionnée par l’',
      ['électronique embarquée, l’automatisation, et les systèmes intelligents'],
      '. Je recherche un ',
      ['stage ou alternance en électronique / systèmes embarqués'],
      ' afin de développer mes compétences au sein d’une équipe innovante.',
    ],
    [
      'Mes compétences techniques couvrent l’',
      ['électronique analogique et numérique'],
      ', la ',
      ['programmation (Python, MATLAB, C)'],
      ', les ',
      ['systèmes embarqués, VHDL, et simulation électronique (LTSpice, Quartus, Psim, LabVIEW)'],
      '. Je m\'intéresse à la conception et la validation de systèmes électroniques.',
    ],
    [
      'J’ai réalisé plusieurs projets académiques tels que la ',
      ['conception d’un robot autonome Arduino'],
      ', la ',
      ['simulation d’amplificateurs à contre-réaction (LTSpice)'],
      ' ainsi qu’un ',
      ['système de gestion de feu tricolore numérique'],
      '.',
    ],
    [
      'Curieuse, rigoureuse et motivée, je souhaite intégrer une entreprise où je pourrai ',
      ['contribuer à des projets concrets'],
      ' tout en renforçant mes compétences d’ingénieure en électronique.',
    ],
  ]

  return (
    <section
      id="about"
      className="relative overflow-hidden py-24 sm:py-32 md:py-40 bg-gradient-to-b from-white via-blue-50 to-sky-100 text-gray-900 dark:from-slate-900 dark:via-slate-900/40 dark:to-slate-900"
    >
      {/* — Fond décoratif (pandas) — */}
      <div className="absolute inset-0 -z-10 pointer-events-none select-none">
        {/* voile dégradé doux */}
        <div className="absolute inset-0 opacity-30 dark:opacity-20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-300/30 via-sky-300/25 to-indigo-300/30" />
        </div>

        {/* pandas animés (désactivés si reduced motion) */}
        {!prefersReduced && (
          <>
            {pandas.map((p) => (
              <motion.img
                key={p.id}
                src={panda}
                alt=""
                loading="lazy"
                decoding="async"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: 0.25,
                  scale: 1,
                  y: [0, -12, 0],
                  rotate: [0, 4, -4, 0],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'easeInOut',
                }}
                style={{
                  position: 'absolute',
                  top: p.top,
                  left: p.left,
                  width: p.size * 1.6,
                  height: p.size * 1.6,
                  filter: 'grayscale(0.15)',
                }}
              />
            ))}
          </>
        )}

        {/* halos flous pour enrichir sans bruit visuel */}
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300/30 blur-3xl" />
      </div>

      {/* — Contenu — */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={container}
        className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-4 sm:px-8 lg:px-16"
      >
        {/* Titre */}
        <motion.div variants={item} className="mb-20 w-full text-center">
          <h2 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600">
            À propos de moi
          </h2>
          <div className="mx-auto mt-4 h-2 w-56 rounded-full bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-600" />
        </motion.div>

        <div className="flex w-full flex-col items-center justify-center gap-x-20 gap-y-16 lg:flex-row">
          {/* Photo */}
          <motion.figure
            variants={image}
            className="relative h-[280px] w-[280px] overflow-hidden rounded-2xl bg-white shadow-2xl ring-4 ring-blue-300/40 sm:h-[340px] sm:w-[340px] lg:h-[380px] lg:w-[380px] dark:bg-slate-900"
          >
            <img
              src={pdp}
              alt="Portrait de Ghita Idrissi"
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover object-center"
            />
            {/* liseré dégradé léger */}
            <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/50 dark:ring-white/10" />
          </motion.figure>

          {/* Paragraphes */}
          <div className="flex max-w-3xl flex-grow flex-col items-center gap-y-6 text-center md:items-start md:text-left">
            {paragraphs.map((parts, idx) => (
              <motion.div
                key={idx}
                variants={item}
                className="rounded-2xl border border-blue-100 bg-white/90 p-6 leading-relaxed text-gray-800 shadow-md backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-100"
              >
                <p className="text-lg md:text-xl">
                  {parts.map((seg, i) =>
                    Array.isArray(seg) ? (
                      <strong key={i} className="text-sky-700 dark:text-sky-300 font-semibold">
                        {seg[0]}
                      </strong>
                    ) : (
                      <span key={i}>{seg}</span>
                    )
                  )}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div variants={item} className="mt-16 flex w-full justify-center">
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 px-8 py-4 text-lg font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-blue-500/40"
          >
            Me contacter
            <ArrowRight className="ml-1 h-6 w-6 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </motion.div>

      {/* Accessibilité: réduit/stoppe les animations si l’utilisateur préfère réduire */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </section>
  )
}
