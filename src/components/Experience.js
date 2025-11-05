import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// Image générique – à remplacer si besoin
import projectLab from '../assets/panda.png'

const experiences = [
  {
    id: 1,
    title: 'Stage en électrotechnique & automatisation',
    date: 'Juil. – Août 2024',
    institution: 'SC KAGREKOS INSTALL SRL',
    location: 'Roumanie',
    imageUrl: projectLab,
    summary:
      "Participation aux travaux d’installation et de maintenance de systèmes électriques et automatisés en milieu industriel.",
    tasks: [
      'Analyse et suivi des systèmes électriques industriels',
      'Intervention sur installations électriques basse tension',
      'Suivi des procédures industrielles et normes de sécurité',
      'Collaboration avec des ingénieurs en automatisation',
    ],
    skills: ['Électrotechnique', 'Automatisation', 'Sécurité industrielle', 'Travail en équipe'],
  },
  {
    id: 2,
    title: 'Projet – Amplificateurs à contre-réaction',
    date: '2024',
    institution: 'Université Clermont Auvergne',
    location: 'France',
    imageUrl: projectLab,
    summary:
      "Étude et simulation d'amplificateurs à contre-réaction en technologies bipolaires, FET et amplificateurs opérationnels.",
    tasks: [
      'Conception et simulation sous LTSpice',
      'Analyse comparative des architectures (BJT, FET, AOP)',
      'Optimisation des performances et rapport analytique',
      'Présentation technique',
    ],
    skills: ['LTSpice', 'Électronique analogique', 'AOP', 'Analyse de circuits'],
  },
  {
    id: 3,
    title: 'Robot autonome Arduino – Mini labyrinthe',
    date: '2023',
    institution: 'Université',
    location: 'France',
    imageUrl: projectLab,
    summary:
      'Développement d’un robot autonome capable de naviguer dans un mini-labyrinthe à l’aide de capteurs.',
    tasks: [
      'Pilotage Arduino et capteurs distance',
      'Programmation en C',
      'Implémentation d’un algorithme de navigation',
      'Tests et validation',
    ],
    skills: ['Arduino', 'C', 'Systèmes embarqués', 'Capteurs', 'Robotique'],
  },
  {
    id: 4,
    title: 'Système de gestion de feu tricolore',
    date: '2023',
    institution: 'Université',
    location: 'France',
    imageUrl: projectLab,
    summary: 'Conception d’un système logique de commande pour un feu tricolore synchronisé.',
    tasks: [
      'Conception logique combinatoire',
      'Simulation et tests',
      'Synchronisation des cycles lumineux',
      'Documentation technique',
    ],
    skills: ['Logique combinatoire', 'Simulation', 'Électronique numérique'],
  },
]

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })
  const prefersReduced = useReducedMotion()

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
  }

  const item = {
    hidden: { opacity: 0, y: 32 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  const columnGrow = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="experience"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-sky-100 text-gray-900 dark:from-slate-900 dark:via-slate-900/40 dark:to-slate-900 py-24 px-4 sm:px-8 lg:px-24"
    >
      {/* Halos / voile cohérents avec les autres sections */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none">
        <div className="absolute -top-20 left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-300 via-sky-400 to-indigo-500 opacity-30 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-[28rem] w-[28rem] rounded-full bg-gradient-to-bl from-indigo-400 via-sky-300 to-blue-400 opacity-30 blur-3xl" />
      </div>

      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={container} className="mx-auto max-w-5xl">
        {/* Header */}
        <motion.div variants={item} className="mb-16 text-center">
          <h2 className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-4xl sm:text-5xl font-extrabold text-transparent">
            Expériences & Projets
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-28 rounded-full bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-600" />
        </motion.div>

        <div className="relative">
          {/* Timeline verticale */}
          <motion.div
            variants={columnGrow}
            className="absolute left-8 top-0 h-full w-1 origin-top rounded-full bg-gradient-to-b from-blue-400 via-sky-400 to-indigo-500"
          />

          <div className="space-y-16">
            {experiences.map((exp, idx) => (
              <motion.article key={exp.id} variants={item} className="relative pl-20 sm:pl-24">
                {/* Point timeline */}
                <div className="absolute left-8 top-6 -translate-x-1/2 transform">
                  <div className="h-7 w-7 rounded-full border-4 border-white bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-500 shadow-lg dark:border-slate-900">
                    <div className="m-auto mt-[0.30rem] h-2.5 w-2.5 rounded-full bg-white/95" />
                  </div>
                </div>

                {/* Card */}
                <motion.div
                  whileHover={!prefersReduced ? { y: -4 } : {}}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden rounded-2xl border border-blue-200 bg-white/90 p-6 shadow-xl backdrop-blur-lg transition-all hover:shadow-blue-300/40 dark:border-slate-700 dark:bg-slate-900/70 sm:p-8"
                >
                  <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                    <img
                      src={exp.imageUrl}
                      alt={exp.institution}
                      className="h-28 w-28 rounded-full border-4 border-white object-contain shadow-md dark:border-slate-900 sm:h-32 sm:w-32"
                      loading="lazy"
                      decoding="async"
                    />

                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">{exp.title}</h3>
                          <p className="font-semibold text-sky-700 dark:text-sky-300">{exp.institution}</p>
                          <p className="text-sm text-gray-600 dark:text-slate-400">{exp.location}</p>
                        </div>
                        <p className="mt-2 font-medium text-gray-600 dark:text-slate-400 sm:mt-0">{exp.date}</p>
                      </div>

                      <p className="mt-4 rounded-lg border border-blue-100 bg-blue-50/70 p-4 text-base text-gray-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200">
                        {exp.summary}
                      </p>

                      {/* Tâches */}
                      <div className="mt-6">
                        <h4 className="mb-3 text-lg font-semibold text-gray-900 dark:text-slate-100">Responsabilités :</h4>
                        <ul className="grid grid-cols-1 gap-3 md:grid-cols-2">
                          {exp.tasks.map((task, i) => (
                            <motion.li
                              key={i}
                              whileHover={!prefersReduced ? { x: 4 } : {}}
                              className="flex items-start gap-3 rounded-lg border border-blue-100 bg-white p-3 text-sm text-gray-700 shadow-sm dark:border-slate-700 dark:bg-slate-900/60 dark:text-slate-200"
                            >
                              <div className="mt-1 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-blue-600 text-[10px] font-bold text-white">✓</div>
                              <p>{task}</p>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {/* Compétences */}
                      <div className="mt-6">
                        <h4 className="mb-2 text-lg font-semibold text-gray-900 dark:text-slate-100">Compétences :</h4>
                        <div className="flex flex-wrap gap-2">
                          {exp.skills.map((skill, i) => (
                            <span
                              key={i}
                              className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-sky-700 shadow-sm dark:bg-slate-800/60 dark:text-sky-300"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Accessibilité: réduit les animations si préférence système */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </section>
  )
}
