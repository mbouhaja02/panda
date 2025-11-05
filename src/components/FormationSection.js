import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

// Logos / images
import univ_logo from '../assets/logo_univ.png'
import univ_bordeaux from '../assets/og-default.jpg' // Remplacer plus tard
import uca_banner from '../assets/og-default.jpg'

import logo_cle from '../assets/clermont_logo.jpg';
import univ_cle from '../assets/clermont_univ.jpg';

import bac_logo from '../assets/bac_maroc.jpg';
import lycee from '../assets/lycee_logo.jpg';

const formations = [
  {
    id: 1,
    logo: univ_logo,
    banner: univ_bordeaux,
    institution: 'Université de Bordeaux',
    diplome: 'Master 1 – Ingénierie des Systèmes Complexes',
    mention: 'Parcours Systèmes Électroniques',
    periode: '2025 – 2026',
    competences:
      'Électronique avancée, systèmes embarqués, automatisation, VHDL, MATLAB, Python, instrumentation, systèmes complexes',
  },
  {
    id: 2,
    logo: logo_cle,
    banner: univ_cle,
    institution: 'Université Clermont Auvergne',
    diplome: 'Licence Sciences pour l’Ingénieur',
    mention: 'Électronique, Électrotechnique et Automatique',
    periode: '2024 – 2025',
    competences:
      'Électronique analogique et numérique, LTSpice, LabVIEW, Arduino, systèmes automatisés, traitement du signal',
  },
  {
    id: 3,
    logo: bac_logo,
    banner: lycee,
    institution: 'Lycée – Maroc',
    diplome: 'Baccalauréat – Sciences et Technologies Électriques',
    mention: 'Mention Très Bien',
    periode: '2021 – 2022',
    competences:
      'Circuits électriques, automatisation industrielle, mathématiques, physique, logistique scientifique',
  },
]

export default function FormationSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })
  const prefersReduced = useReducedMotion()

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
  }

  const item = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  }

  const timeline = {
    hidden: { scaleY: 0 },
    visible: { scaleY: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="formations"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-sky-100 text-gray-900 dark:from-slate-900 dark:via-slate-900/40 dark:to-slate-900 py-24 px-6 sm:px-10 lg:px-20"
    >
      {/* Halos / voile cohérents avec AboutMe */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 select-none">
        <div className="absolute top-[-4rem] left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-300 via-sky-400 to-indigo-500 opacity-30 blur-3xl" />
        <div className="absolute bottom-[-6rem] right-1/4 h-[28rem] w-[28rem] rounded-full bg-gradient-to-bl from-indigo-400 via-sky-300 to-blue-400 opacity-30 blur-3xl" />
      </div>

      <motion.div
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={container}
        className="relative z-10 mx-auto max-w-5xl"
      >
        {/* Header */}
        <motion.div variants={item} className="mb-20 text-center">
          <h2 className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-5xl font-extrabold text-transparent">
            Parcours académique
          </h2>
          <div className="mx-auto mt-3 h-1.5 w-32 rounded-full bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-600" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          <motion.div
            variants={timeline}
            className="absolute left-6 top-0 h-full w-1 origin-top rounded-full bg-gradient-to-b from-blue-400 via-sky-400 to-indigo-400"
          />

          <div className="space-y-12">
            {formations.map((formation, idx) => (
              <motion.article key={formation.id} variants={item} className="relative pl-16">
                {/* Point timeline */}
                <div className="absolute left-0 top-12 -translate-x-1/2 transform">
                  <div className="h-6 w-6 rounded-full border-4 border-white bg-gradient-to-tr from-blue-600 via-sky-500 to-indigo-500 shadow-md dark:border-slate-900" />
                </div>

                {/* Card */}
                <div className="overflow-hidden rounded-3xl border border-blue-200 bg-white/90 shadow-xl backdrop-blur-lg transition-all duration-300 hover:shadow-blue-300/40 dark:border-slate-700 dark:bg-slate-900/70">
                  {/* Banner */}
                  <div className="relative h-48 w-full overflow-hidden sm:h-56">
                    <img
                      src={formation.banner}
                      alt={`Bannière ${formation.institution}`}
                      className={`h-full w-full object-cover ${!prefersReduced ? 'transition-transform duration-700 hover:scale-105' : ''}`}
                      loading="lazy"
                      decoding="async"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-6 p-8 sm:flex-row">
                    <div className="-mt-16 flex-shrink-0 sm:mt-0">
                      <img
                        src={formation.logo}
                        alt={`Logo ${formation.institution}`}
                        className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-lg shadow-blue-400/40 dark:border-slate-900"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-slate-100">
                        {formation.institution}
                      </h3>
                      <p className="font-medium text-sky-700 dark:text-sky-300">{formation.diplome}</p>
                      <p className="text-sm text-gray-600 dark:text-slate-400">{formation.mention}</p>
                      <p className="mt-1 text-sm text-gray-600 dark:text-slate-400">{formation.periode}</p>

                      <div className="mt-4 border-t border-blue-200 pt-4 dark:border-slate-700">
                        <p className="leading-relaxed text-gray-700 dark:text-slate-200">
                          <span className="font-semibold text-blue-600 dark:text-sky-300">Compétences : </span>
                          {formation.competences}
                        </p>
                      </div>

                      {/* Badges cohérents (optionnel) */}
                      <div className="mt-3 flex flex-wrap gap-2">
                        {formation.competences
                          .split(',')
                          .slice(0, 6)
                          .map((c, i) => (
                            <span
                              key={i}
                              className="rounded-full border border-sky-200 bg-sky-50/70 px-3 py-1 text-xs font-medium text-sky-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-sky-300"
                            >
                              {c.trim()}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
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
