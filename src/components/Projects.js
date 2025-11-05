import React, { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'

// Optionnel: remplace par de vraies images
import projectFallback from '../assets/panda.png'

// ————————————————————————————————————————
// Données
// ————————————————————————————————————————
const allProjects = [
  {
    title: 'Robot autonome Arduino – Navigation dans labyrinthe',
    image: null, // ex: import ...
    date: '2024',
    description:
      'Conception d’un robot mobile autonome capable de détecter des obstacles et naviguer dans un mini-labyrinthe.',
    skills: ['Arduino', 'Capteurs ultrason', 'Algorithmie embarquée', 'C++', 'Système autonome'],
    theme: 'Systèmes embarqués & Robotique',
    details: {
      overview:
        "Développement d’un robot intelligent autonome avec microcontrôleur Arduino. Programmation de la logique de déplacement, gestion des capteurs et algorithmes de navigation.",
      highlights: [
        "Capteurs ultrason et infrarouges",
        "Détection d'obstacles + prise de décision autonome",
        'Contrôle moteur + algorithme de parcours',
        'Programmation embarquée en C++',
      ],
      links: { repo: '', demo: '', paper: '' },
    },
  },
  {
    title: 'Conception et simulation d’amplificateurs à contre-réaction',
    image: null,
    date: '2024',
    description:
      'Étude, modélisation et simulation d’amplificateurs (BJT, FET et amplis op) sous LTSpice.',
    skills: ['LTSpice', 'Amplificateurs', 'Analyse électronique', 'Modélisation', 'Simulation'],
    theme: 'Électronique Analogique',
    details: {
      overview:
        'Comparaison d’architectures d’amplificateurs avec contre-réaction (BJT, MOSFET et AO). Simulation SPICE + analyse des performances.',
      highlights: [
        'Analyse fréquence / gain / stabilité',
        'Topologies multi-étages',
        'Simulation LTSpice & validation théorique',
        'Optimisation bruit et distorsion',
      ],
      links: { repo: '', demo: '', paper: '' },
    },
  },
  {
    title: 'Système de feu tricolore logique — Automatisme & logique séquentielle',
    image: null,
    date: '2023',
    description:
      'Réalisation d’un système de signalisation tricolore avec logique séquentielle et timing synchronisé.',
    skills: ['Logique combinatoire', 'Électronique numérique', 'Automatisme', 'Timers & Flip-flops'],
    theme: 'Automatisation & Logique',
    details: {
      overview:
        'Implémentation d’un contrôleur logique simulant un feu tricolore. Séquençage temporel, états logiques et synchronisation.',
      highlights: [
        'Modélisation séquentielle',
        'Gestion d’états + temporisation',
        'Simulation et câblage sur breadboard',
        'Tests en conditions réelles',
      ],
      links: { repo: '', demo: '', paper: '' },
    },
  },
  {
    title: 'Application LabVIEW — Génération de N° de Sécurité Sociale',
    image: null,
    date: '2024',
    description:
      "Développement d'une application LabVIEW pour générer, analyser et valider des numéros de sécurité sociale.",
    skills: ['LabVIEW', 'Automatisation', 'Structures conditionnelles', 'Test & validation'],
    theme: 'Informatique Industrielle',
    details: {
      overview:
        'Interface graphique interactive développée sous LabVIEW. Automatisation de la génération, validation algorithmique et analyse d\'identifiants structurés.',
      highlights: [
        'Interface HMI',
        'Validation algorithmique',
        'Automatisation de tests',
        'Indicateurs numériques & logique conditionnelle',
      ],
      links: { repo: '', demo: '', paper: '' },
    },
  },
]

const themesOrder = [
  'Systèmes embarqués & Robotique',
  'Électronique Analogique',
  'Automatisation & Logique',
  'Informatique Industrielle',
]

const themedProjects = themesOrder.reduce((acc, theme) => {
  acc[theme] = allProjects.filter((p) => p.theme === theme)
  return acc
}, {})

// ————————————————————————————————————————
// Variants
// ————————————————————————————————————————
const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
}

const block = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const card = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
}

// ————————————————————————————————————————
// Modal
// ————————————————————————————————————————
function ProjectModal({ project, onClose }) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!project) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [project, onClose])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal
          role="dialog"
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            className="relative z-10 w-full max-w-3xl overflow-hidden rounded-3xl border border-blue-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
          >
            <div className="relative h-56 w-full">
              <img
                src={project.image || projectFallback}
                alt={project.title}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
              <button
                onClick={onClose}
                className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-white/90 text-xl font-bold text-gray-800 shadow-md"
                aria-label="Fermer"
              >
                ×
              </button>
              <div className="absolute bottom-4 left-4 text-white drop-shadow">
                <h3 className="text-2xl font-bold">{project.title}</h3>
                <p className="text-sm opacity-90">{project.date}</p>
              </div>
            </div>

            <div className="space-y-4 p-6">
              <p className="text-gray-700 dark:text-slate-200">{project.details.overview}</p>
              <ul className="list-inside list-disc space-y-1 text-gray-700 dark:text-slate-200">
                {project.details.highlights.map((h, i) => (
                  <li key={i}>{h}</li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2">
                {project.skills.map((s, i) => (
                  <span
                    key={i}
                    className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-sky-700 dark:bg-slate-800/60 dark:text-sky-300"
                  >
                    {s}
                  </span>
                ))}
              </div>

              {(project.details.links?.repo || project.details.links?.demo || project.details.links?.paper) && (
                <div className="pt-2">
                  <div className="flex flex-wrap gap-3">
                    {project.details.links.repo && (
                      <a
                        href={project.details.links.repo}
                        className="rounded-full border border-sky-200 bg-sky-50/70 px-4 py-1.5 text-sm font-medium text-sky-700 hover:bg-sky-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-sky-300"
                      >
                        Code
                      </a>
                    )}
                    {project.details.links.demo && (
                      <a
                        href={project.details.links.demo}
                        className="rounded-full border border-sky-200 bg-sky-50/70 px-4 py-1.5 text-sm font-medium text-sky-700 hover:bg-sky-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-sky-300"
                      >
                        Démo
                      </a>
                    )}
                    {project.details.links.paper && (
                      <a
                        href={project.details.links.paper}
                        className="rounded-full border border-sky-200 bg-sky-50/70 px-4 py-1.5 text-sm font-medium text-sky-700 hover:bg-sky-100 dark:border-slate-700 dark:bg-slate-800/60 dark:text-sky-300"
                      >
                        Rapport
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ————————————————————————————————————————
// Card
// ————————————————————————————————————————
function ProjectCard({ project, idx, setActive, onOpen }) {
  const prefersReduced = useReducedMotion()
  return (
    <motion.div
      variants={card}
      className="group relative h-48 cursor-pointer overflow-hidden rounded-2xl shadow-lg"
      onClick={() => onOpen(project)}
      onMouseEnter={() => setActive(`${project.theme}-${idx}`)}
      onMouseLeave={() => setActive(null)}
      whileHover={prefersReduced ? {} : { y: -2 }}
      transition={{ duration: 0.25 }}
    >
      <img
        src={project.image || projectFallback}
        alt={project.title}
        className={`absolute inset-0 h-full w-full object-cover ${prefersReduced ? '' : 'transition-transform duration-500 group-hover:scale-105'}`}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/80 transition group-hover:from-blue-600/45" />
      <div className="absolute bottom-3 left-3 right-3 text-white">
        <h4 className="text-md font-semibold leading-snug">{project.title}</h4>
        <p className="text-xs opacity-90">{project.date}</p>
      </div>
    </motion.div>
  )
}

// ————————————————————————————————————————
// Main
// ————————————————————————————————————————
export default function Projects() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })
  const prefersReduced = useReducedMotion()
  const [activeCard, setActiveCard] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)

  const halos = useMemo(
    () => (
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none">
        <div className="absolute -top-16 left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-300 via-sky-400 to-indigo-500 opacity-30 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-[28rem] w-[28rem] rounded-full bg-gradient-to-bl from-indigo-400 via-sky-300 to-blue-400 opacity-30 blur-3xl" />
      </div>
    ),
    []
  )

  return (
    <section id="projects" ref={ref} className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-sky-100 py-20 px-6 text-gray-900 dark:from-slate-900 dark:via-slate-900/40 dark:to-slate-900">
      {halos}

      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={container} className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div variants={block} className="mb-12 text-center">
          <h2 className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Projets académiques
          </h2>
          <div className="mx-auto mt-3 h-1.5 w-28 rounded-full bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500" />
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {themesOrder.map((theme) => (
            <motion.section
              key={theme}
              variants={block}
              className="rounded-3xl border border-blue-200 bg-white/80 p-6 shadow-lg backdrop-blur-md transition hover:shadow-blue-300/40 dark:border-slate-700 dark:bg-slate-900/70"
            >
              <h3 className="mb-6 text-center text-2xl font-bold text-sky-700 dark:text-sky-300">{theme}</h3>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {themedProjects[theme].map((p, idx) => (
                  <ProjectCard key={p.title + idx} project={p} idx={idx} setActive={setActiveCard} onOpen={setSelectedProject} />
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </motion.div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />

      {/* Accessibilité: réduit les animations si préférence système */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </section>
  )
}
