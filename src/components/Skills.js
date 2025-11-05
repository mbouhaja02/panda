import React, { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faPython,
  faJs,
  faHtml5,
  faCss3Alt,
  faGitAlt,
} from '@fortawesome/free-brands-svg-icons'
import {
  faMicrochip,
  faRobot,
  faCogs,
  faFileCode,
  faDatabase,
  faTools,
  faUsers,
  faComments,
  faBrain,
  faLightbulb,
  faClock,
} from '@fortawesome/free-solid-svg-icons'

/* --------------------------------------------------
   Skill Bar (cohérente avec le thème bleu/ardoise)
-------------------------------------------------- */
const SkillBar = ({ skill, percentage, icon, variants, colorFrom, colorTo }) => {
  const prefersReduced = useReducedMotion()
  const getLevel = (pct) => (pct >= 80 ? 'Avancé' : pct >= 60 ? 'Intermédiaire' : 'Débutant')

  return (
    <motion.div variants={variants} className="w-full p-2">
      <div className="rounded-2xl border border-blue-100 bg-white/90 p-4 shadow-sm backdrop-blur-md transition-all duration-300 hover:shadow-blue-200 dark:border-slate-700 dark:bg-slate-900/70">
        <div className="mb-3 flex items-center gap-3">
          <div className="text-lg text-sky-600 dark:text-sky-300">
            <FontAwesomeIcon icon={icon} />
          </div>
          <h4 className="text-base font-semibold text-gray-800 dark:text-slate-100">{skill}</h4>
        </div>

        <div className="mb-1.5 h-2 w-full rounded-full bg-gray-200 dark:bg-slate-800">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: prefersReduced ? 0 : 1.1, delay: prefersReduced ? 0 : 0.15, type: prefersReduced ? false : 'spring' }}
            className={`h-2 rounded-full bg-gradient-to-r ${colorFrom} ${colorTo}`}
            aria-hidden
          />
        </div>

        <div className="flex justify-between text-xs font-medium">
          <span className="text-gray-500 dark:text-slate-400">{getLevel(percentage)}</span>
          <span className="text-sky-700 dark:text-sky-300">{percentage}%</span>
        </div>
      </div>
    </motion.div>
  )
}

/* --------------------------------------------------
   Categories adaptées au profil de Ghita
-------------------------------------------------- */
const categories = [
  {
    name: 'Électronique & Systèmes embarqués',
    colorFrom: 'from-blue-400',
    colorTo: 'to-sky-500',
    skills: [
      { skill: 'Électronique analogique & numérique', percentage: 80, icon: faMicrochip },
      { skill: 'Systèmes embarqués / Arduino', percentage: 75, icon: faRobot },
      { skill: 'VHDL / FPGA (Quartus)', percentage: 65, icon: faFileCode },
      { skill: 'Simulation (LTSpice, Psim)', percentage: 80, icon: faCogs },
      { skill: 'LabVIEW', percentage: 70, icon: faTools },
    ],
  },
  {
    name: 'Programmation & Outils',
    colorFrom: 'from-sky-400',
    colorTo: 'to-indigo-500',
    skills: [
      { skill: 'Python / MATLAB', percentage: 80, icon: faPython },
      { skill: 'C / Microcontrôleurs', percentage: 70, icon: faFileCode },
      { skill: 'HTML / CSS / JavaScript', percentage: 60, icon: faHtml5 },
      { skill: 'SQL / SQLite', percentage: 65, icon: faDatabase },
      { skill: 'Git / GitHub', percentage: 75, icon: faGitAlt },
    ],
  },
  {
    name: 'Soft Skills',
    colorFrom: 'from-blue-400',
    colorTo: 'to-indigo-500',
    skills: [
      { skill: 'Travail en équipe', percentage: 85, icon: faUsers },
      { skill: 'Communication', percentage: 80, icon: faComments },
      { skill: 'Organisation & gestion du temps', percentage: 75, icon: faClock },
      { skill: 'Analyse & résolution de problèmes', percentage: 80, icon: faBrain },
      { skill: 'Esprit d’initiative & créativité', percentage: 90, icon: faLightbulb },
    ],
  },
]

/* --------------------------------------------------
   Component principal
-------------------------------------------------- */
export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-15% 0px -15% 0px' })

  const container = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
  }

  const item = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
  }

  return (
    <section
      id="skills"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-sky-100 py-20 px-4 text-gray-900 dark:from-slate-900 dark:via-slate-900/40 dark:to-slate-900 sm:px-8 lg:px-16"
    >
      {/* Halos / voile cohérents avec les autres sections */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none">
        <div className="absolute -top-16 left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-300 via-sky-400 to-indigo-500 opacity-30 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-[28rem] w-[28rem] rounded-full bg-gradient-to-bl from-indigo-400 via-sky-300 to-blue-400 opacity-30 blur-3xl" />
      </div>

      <motion.div initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={container} className="mx-auto max-w-7xl">
        {/* Header */}
        <motion.div variants={item} className="mb-14 text-center">
          <h2 className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
            Compétences Techniques & Soft Skills
          </h2>
          <div className="mx-auto h-1.5 w-24 rounded-full bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-600" />
          <p className="mx-auto mt-4 max-w-2xl text-gray-700 dark:text-slate-300">
            Compétences en électronique, systèmes embarqués, automation et outils logiciels, associées à des qualités humaines développées au sein de projets académiques et industriels.
          </p>
        </motion.div>

        <motion.div variants={container} className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-lg transition-all duration-300 hover:shadow-blue-200 backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/70"
            >
              <h3 className="mb-4 text-center text-xl font-semibold text-sky-700 dark:text-sky-300">
                {category.name}
              </h3>
              <div className="-mx-2 flex flex-wrap">
                {category.skills.map((s, i) => (
                  <SkillBar
                    key={i}
                    skill={s.skill}
                    percentage={s.percentage}
                    icon={s.icon}
                    colorFrom={category.colorFrom}
                    colorTo={category.colorTo}
                    variants={item}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
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
