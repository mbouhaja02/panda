import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FaLinkedin, FaGithub, FaFilePdf } from 'react-icons/fa'
import { HiOutlineMail } from 'react-icons/hi'
import avatar from '../assets/ghita_pdp.jpg'
import cvFile from '../assets/ghita_pdp.jpg' // TODO: remplace par le vrai CV

const NAME = 'Ghita IDRISSI'
const TAGLINE =
  'Master 1 – Ingénierie des Systèmes Complexes • Systèmes Électroniques • Électronique • Automatisation'

const LINKS = {
  linkedin: '#',
  github: '#',
  email: 'mailto:ghitaidrissi007@gmail.com',
}

// Variants (uniquement apparitions douces, sans déformation)
const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
}

export default function ProfileHeader() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-15% 0px -15% 0px' })
  const prefersReduced = useReducedMotion()

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Arrière-plan aurora (statique, pas de scaling) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="pointer-events-none absolute -top-40 -left-28 h-[28rem] w-[28rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.sky.400),transparent)] opacity-45 dark:opacity-35"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.05 }}
          className="pointer-events-none absolute -bottom-48 -right-32 h-[32rem] w-[32rem] rounded-full blur-3xl bg-[radial-gradient(closest-side,theme(colors.indigo.500),transparent)] opacity-35 dark:opacity-25"
        />
        <div className="absolute inset-0 opacity-[0.15] [background:radial-gradient(theme(colors.slate.300)_1px,transparent_1px)] [background-size:16px_16px] dark:opacity-10" />
      </div>

      <motion.div initial="hidden" animate={inView ? 'show' : 'hidden'} variants={container} className="mx-auto max-w-6xl px-4 py-16 sm:px-8 lg:px-12 lg:py-24">
        {/* Carte principale — AUCUNE rotation/tilt/scale */}
        <motion.div
          variants={fadeUp}
          className="relative isolate grid items-center gap-10 rounded-[28px] border border-sky-100 bg-white/70 p-8 shadow-[0_20px_60px_-20px_rgba(2,132,199,0.30)] backdrop-blur-2xl lg:grid-cols-[1.1fr_0.9fr] lg:gap-14 lg:p-12 dark:border-slate-700 dark:bg-slate-900/60"
        >
          {/* bord lumineux discret (statique) */}
          <span className="pointer-events-none absolute inset-0 -z-10 rounded-[28px] before:absolute before:inset-[-2px] before:rounded-[inherit] before:[mask:linear-gradient(#000,transparent_40%)] before:bg-[conic-gradient(from_120deg,theme(colors.sky.400),theme(colors.blue.600),theme(colors.indigo.600),theme(colors.sky.400))] before:opacity-60 before:blur-[14px] before:content-['']" />
          <span className="pointer-events-none absolute inset-0 rounded-[28px] shadow-inner" />

          {/* Colonne texte */}
          <motion.div variants={container}>
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 rounded-full border border-sky-200/70 bg-white/85 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm dark:border-slate-600 dark:bg-slate-900/70 dark:text-sky-300">
              <span className="h-2.5 w-2.5 rounded-full bg-sky-500" /> Disponible pour un stage de 3 mois
            </motion.div>

            <motion.h1 variants={fadeUp} className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-slate-100">
              {NAME}
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-4 max-w-2xl leading-relaxed text-sky-900/80 dark:text-slate-300">
              {TAGLINE}
            </motion.p>

            <motion.ul variants={fadeUp} className="mt-6 flex flex-wrap gap-2.5">
              {['FPGA', 'STM32', 'C/Embedded', 'Python', 'MATLAB', 'Altium', 'Automatisation'].map((tag) => (
                <li key={tag} className="rounded-full border border-sky-200/70 bg-sky-50/80 px-3.5 py-1.5 text-xs text-sky-700 shadow-sm dark:border-slate-600 dark:bg-slate-800/60 dark:text-sky-300">
                  {tag}
                </li>
              ))}
            </motion.ul>

            {/* Actions & Socials — aucune translation au hover */}
            <motion.div variants={fadeUp} className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-4">
              <a href={cvFile} download="CV_Ghita_Idrissi.pdf" aria-label="Télécharger le CV (PDF)">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-gradient-to-tr from-sky-600 via-blue-600 to-indigo-600 px-6 font-semibold text-white shadow-lg shadow-sky-500/40 [text-shadow:0_1px_0_rgba(0,0,0,0.15)]">
                  <FaFilePdf />
                  <span>Télécharger CV</span>
                </button>
              </a>

              <a href={LINKS.email} aria-label="Envoyer un email">
                <button className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl border-2 border-sky-300 bg-white px-6 font-semibold text-sky-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100">
                  <HiOutlineMail />
                  <span>Me contacter</span>
                </button>
              </a>

              <div className="flex items-center gap-3">
                <a
                  href={LINKS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-200/70 bg-white/80 backdrop-blur dark:border-slate-600 dark:bg-slate-900"
                >
                  <FaLinkedin className="text-xl text-sky-600" />
                </a>
                <a
                  href={LINKS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-200/70 bg-white/80 backdrop-blur dark:border-slate-600 dark:bg-slate-900"
                >
                  <FaGithub className="text-xl text-sky-600" />
                </a>
              </div>
            </motion.div>
          </motion.div>

          {/* Colonne avatar — aucun tilt/hover/spotlight */}
          <motion.div variants={fadeUp} className="relative mx-auto h-[15.5rem] w-[15.5rem] sm:h-[17rem] sm:w-[17rem] lg:h-[19rem] lg:w-[19rem]">
            <div className="absolute -inset-2 rounded-[32px] bg-[conic-gradient(from_180deg,theme(colors.sky.400),theme(colors.blue.500),theme(colors.indigo.600),theme(colors.sky.400))] opacity-35 blur-xl" />
            <div className="relative size-full overflow-hidden rounded-[26px] bg-white p-[3px] dark:bg-slate-900">
              <div className="relative size-full overflow-hidden rounded-[22px]">
                <img src={avatar} alt={NAME} className="absolute inset-0 size-full object-cover" draggable="false" />
                <div className="absolute bottom-3 right-3">
                  <div className="rounded-full border border-sky-200 bg-white/85 px-3 py-1 text-[11px] font-semibold text-sky-700 shadow-sm backdrop-blur dark:border-slate-600 dark:bg-slate-900/70 dark:text-sky-300">
                    Électronique • Embarqué
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll cue (statique) */}
        <div className="mt-10 flex justify-center">
          <div className="flex items-center gap-2 text-sm text-sky-800/70 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-sky-500" />
            <span>Faites défiler pour découvrir le portfolio</span>
          </div>
        </div>
      </motion.div>

      {/* Accessibilité */}
      <style>{`
        @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; } }
      `}</style>
    </section>
  )
}
