import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence, useReducedMotion } from 'framer-motion'

// ——————————————————————————————————————————
//   Deux certificats • thème bleu/ardoise
//   Style cohérent avec About/Formation/Expérience/Projets
// ——————————————————————————————————————————
const certificates = [
  {
    id: 'pix',
    title: 'Certification PIX – Compétences numériques',
    issuer: 'PIX France',
    date: '2024',
    credentialId: 'PIX-2024',
    skills: ['Compétences numériques', 'Cybersécurité', 'Bureautique'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Logo_Pix.svg',
    pdf: '', // ajoute l’URL du PDF si dispo
  },
  {
    id: 'labview',
    title: 'NI LabVIEW – Core 1',
    issuer: 'National Instruments (NI)',
    date: '2024',
    credentialId: 'NI-LABVIEW-01',
    skills: ['LabVIEW', 'Acquisition de données', 'Instrumentation'],
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5b/National_Instruments_logo.svg',
    pdf: '',
  },
]

const container = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.12, delayChildren: 0.12 } },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

function CertModal({ cert, onClose }) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (!cert) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [cert, onClose])

  return (
    <AnimatePresence>
      {cert && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal
          onClick={onClose}
        >
          <motion.div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <motion.div
            className="relative z-[121] w-full max-w-4xl overflow-hidden rounded-2xl border border-sky-200 bg-white/95 shadow-2xl backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 12 }}
            transition={{ duration: prefersReduced ? 0 : 0.2 }}
          >
            {/* Header */}
            <div className="flex items-center gap-4 border-b border-slate-200/60 p-4 dark:border-slate-700">
              <img src={cert.logo} alt={`${cert.issuer} logo`} className="h-10 w-10 object-contain" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">{cert.title}</h3>
                <p className="text-sm text-gray-600 dark:text-slate-400">{cert.issuer} • {cert.date}</p>
              </div>
              <button
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-xl bg-white text-gray-900 shadow hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-sky-300 dark:bg-slate-800 dark:text-slate-100"
                aria-label="Fermer"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="grid max-h-[75vh] grid-cols-1 overflow-y-auto md:grid-cols-2">
              <div className="border-b border-slate-200/60 p-4 md:border-b-0 md:border-r dark:border-slate-700">
                {cert.pdf ? (
                  <iframe title={`${cert.title} PDF`} src={cert.pdf} className="h-[60vh] w-full rounded-lg" />
                ) : (
                  <div className="flex h-[60vh] items-center justify-center rounded-lg border border-dashed border-slate-300 dark:border-slate-700">
                    <p className="text-sm text-gray-500 dark:text-slate-400">PDF non disponible</p>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 p-6">
                <p className="text-sm text-gray-700 dark:text-slate-200"><span className="font-medium">Identifiant :</span> {cert.credentialId || '—'}</p>

                {cert.skills?.length ? (
                  <div>
                    <h4 className="mb-2 text-sm font-semibold text-gray-900 dark:text-slate-100">Compétences associées</h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((s, i) => (
                        <span key={i} className="rounded-full border border-sky-200 bg-sky-50/70 px-2 py-1 text-[11px] font-medium text-sky-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-sky-300">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}

                {cert.pdf && (
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    <a
                      href={cert.pdf}
                      download
                      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow transition hover:-translate-y-0.5 hover:shadow-blue-500/40"
                    >
                      Télécharger le PDF
                    </a>
                    <a
                      href={cert.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-xl border border-sky-300 px-4 py-2 text-sm font-semibold text-sky-700 transition hover:-translate-y-0.5 dark:border-slate-600 dark:text-sky-300"
                    >
                      Ouvrir dans un onglet
                    </a>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function CertificateCard({ cert, onOpen }) {
  return (
    <motion.div
      variants={item}
      whileHover={{ y: -4 }}
      className="cursor-pointer rounded-2xl border border-blue-100 bg-white/90 p-6 shadow-lg backdrop-blur-md transition-shadow duration-300 hover:shadow-blue-300/40 dark:border-slate-700 dark:bg-slate-900/70"
      onClick={() => onOpen(cert)}
    >
      <div className="flex items-start gap-5">
        <img src={cert.logo} alt={`${cert.issuer} logo`} className="h-14 w-14 flex-shrink-0 rounded-lg object-contain" />
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-slate-100">{cert.title}</h3>
              <p className="font-medium text-sky-700 dark:text-sky-300">{cert.issuer}</p>
            </div>
            <div className="select-none rounded-full bg-sky-50 px-3 py-1 text-xs text-sky-700 dark:bg-slate-800 dark:text-sky-300">
              {cert.date}
            </div>
          </div>

          {cert.skills?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {cert.skills.map((skill, idx) => (
                <span key={idx} className="rounded-full border border-sky-200 bg-sky-50/70 px-3 py-1 text-xs font-semibold text-sky-700 dark:border-slate-700 dark:bg-slate-800/60 dark:text-sky-300">
                  {skill}
                </span>
              ))}
            </div>
          ) : null}

          <p className="mt-4 border-t border-slate-200 pt-3 text-sm text-gray-600 dark:border-slate-700 dark:text-slate-400">
            <span className="font-medium">ID :</span> {cert.credentialId || '—'}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Certificates() {
  const ref = useRef(null)
  const isInView = useInView(ref, { threshold: 0.15, once: true })
  const [selected, setSelected] = useState(null)

  return (
    <section
      id="certificates"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-b from-white via-blue-50 to-sky-100 py-24 px-6 text-gray-900 dark:from-slate-900 dark:via-slate-900/40 dark:to-slate-900 sm:px-12 lg:px-20"
    >
      {/* Halos / voile cohérents */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 select-none">
        <div className="absolute -top-16 left-1/3 h-96 w-96 rounded-full bg-gradient-to-tr from-blue-300 via-sky-400 to-indigo-500 opacity-30 blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 h-[28rem] w-[28rem] rounded-full bg-gradient-to-bl from-indigo-400 via-sky-300 to-blue-400 opacity-30 blur-3xl" />
      </div>

      <motion.div className="mx-auto max-w-5xl" initial="hidden" animate={isInView ? 'visible' : 'hidden'} variants={container}>
        <motion.header variants={item} className="mb-12 text-center">
          <h2 className="bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 bg-clip-text text-4xl font-extrabold text-transparent">
            Certifications
          </h2>
          <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-blue-400 via-sky-500 to-indigo-600" />
        </motion.header>

        <div className="grid gap-8 sm:grid-cols-2">
          {certificates.map((cert) => (
            <CertificateCard key={cert.id} cert={cert} onOpen={setSelected} />
          ))}
        </div>
      </motion.div>

      <CertModal cert={selected} onClose={() => setSelected(null)} />

      {/* Accessibilité: réduit les animations si préférence système */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </section>
  )
}
