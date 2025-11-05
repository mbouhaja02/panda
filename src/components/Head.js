import { useEffect, useState, useCallback } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import img from '../assets/ghita_pdp.jpg'

const user = {
  name: 'Ghita IDRISSI',
  email: 'ghitaidrissi007@gmail.com',
  imageUrl: img,
}

const NAV = [
  { name: 'À propos', href: '#about' },
  { name: 'Formations', href: '#formations' },
  { name: 'Expérience', href: '#experience' },
  { name: 'Projets', href: '#projects' },
  { name: 'Compétences', href: '#skills' },
  { name: 'Certifications', href: '#certificates' },
  { name: 'Contact', href: 'mailto:ghitaidrissi007@gmail.com?subject=Contact depuis portfolio' },
]

function cx(...cls) {
  return cls.filter(Boolean).join(' ')
}

export default function ModernNavigationPro() {
  const [active, setActive] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)

  // —— helpers ——
  const computeActive = useCallback(() => {
    const ids = NAV.map((n) => (n.href.startsWith('#') ? n.href.slice(1) : null)).filter(Boolean)
    for (const id of ids) {
      const el = typeof document !== 'undefined' ? document.getElementById(id) : null
      if (!el) continue
      const r = el.getBoundingClientRect()
      if (r.top <= 100 && r.bottom >= 100) {
        setActive(id)
        break
      }
    }
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      setScrolled(y > 8)
      const total = document.documentElement.scrollHeight - window.innerHeight
      const pct = total > 0 ? Math.min(100, Math.max(0, (y / total) * 100)) : 0
      setProgress(pct)
      computeActive()
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [computeActive])

  // Fermer le menu mobile lorsqu'on clique sur un lien d'ancre
  const handleMobileLinkClick = () => {
    // petit délai pour laisser le hash changer puis scroll
    setTimeout(() => computeActive(), 50)
  }

  return (
    <div className="fixed left-0 right-0 top-0 z-[60]">
      {/* Barre de progression performante (transform au lieu de width) */}
      <div className="pointer-events-none fixed left-0 right-0 top-0 h-[3px] overflow-hidden">
        <div
          className={cx(
            'h-full origin-left bg-gradient-to-r from-sky-400 via-blue-600 to-indigo-500',
            scrolled ? 'opacity-100' : 'opacity-60'
          )}
          style={{ transform: `scaleX(${progress / 100})` }}
          aria-hidden
        />
      </div>

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:rounded-lg focus:bg-sky-600 focus:px-3 focus:py-2 focus:text-white"
      >
        Aller au contenu principal
      </a>

      <Disclosure
        as="nav"
        className={cx(
          'transition-colors duration-300',
          scrolled
            ? 'border-b border-sky-100/70 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:border-slate-700 dark:bg-slate-900/75'
            : 'bg-gradient-to-b from-white/60 to-transparent dark:from-slate-900/40 dark:to-transparent'
        )}
      >
        {({ open }) => (
          <>
            <div className="mx-auto max-w-7xl px-3 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* — Logo / Brand — */}
                <a href="/" aria-label="Accueil" className="group relative flex items-center gap-2">
                  <div className="relative inline-grid size-9 place-items-center rounded-2xl border border-sky-200/60 bg-white/70 shadow-sm backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/60">
                    <span className="bg-gradient-to-r from-blue-700 via-sky-500 to-indigo-600 bg-clip-text text-base font-extrabold tracking-widest text-transparent">
                      GI
                    </span>
                    <span className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/40 dark:ring-white/5" />
                  </div>
                  <span className="hidden text-sm font-medium text-slate-700 dark:text-slate-200 sm:inline">Portfolio</span>
                </a>

                {/* — Navigation (desktop) — */}
                <div className="hidden items-center gap-1 md:flex">
                  {NAV.map((item) => {
                    const isActive = active === item.href.replace('#', '')
                    return (
                      <a
                        key={item.name}
                        href={item.href}
                        aria-current={isActive ? 'page' : undefined}
                        className={cx(
                          'group relative inline-flex items-center rounded-full px-3 py-2 text-sm font-semibold',
                          isActive ? 'text-sky-800 dark:text-sky-300' : 'text-slate-700 dark:text-slate-200'
                        )}
                      >
                        <span
                          className={cx(
                            'absolute inset-0 -z-10 rounded-full transition-colors',
                            isActive
                              ? 'bg-gradient-to-r from-sky-100 via-blue-100 to-indigo-100 ring-1 ring-sky-200/60 dark:from-sky-900/30 dark:via-blue-900/20 dark:to-indigo-900/30 dark:ring-slate-600'
                              : 'group-hover:bg-sky-50/80 dark:group-hover:bg-slate-800/40'
                          )}
                        />
                        {item.name}
                        <span
                          className={cx(
                            'absolute left-3 right-3 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-gradient-to-r from-blue-500 via-sky-500 to-indigo-600 transition-transform duration-300',
                            (isActive || scrolled) && 'scale-x-100'
                          )}
                        />
                      </a>
                    )
                  })}
                </div>

                {/* — Avatar — */}
                <div className="hidden items-center md:flex">
                  <Menu as="div" className="relative">
                    <MenuButton className="relative flex items-center rounded-full ring-2 ring-sky-300/50 transition-all hover:ring-sky-400/70 dark:ring-sky-700/40">
                      <img alt={user.name} src={user.imageUrl} className="size-9 rounded-full object-cover" />
                    </MenuButton>
                    <MenuItems className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-2xl bg-white/90 p-1 shadow-2xl ring-1 ring-sky-100/70 backdrop-blur-xl dark:bg-slate-900/90 dark:ring-slate-700">
                      <MenuItem>
                        {({ active }) => (
                          <a
                            href={`mailto:${user.email}`}
                            className={cx(
                              'block rounded-xl px-3 py-2 text-sm',
                              active ? 'bg-sky-50/80 dark:bg-slate-800/60' : '',
                              'text-slate-700 dark:text-slate-200'
                            )}
                          >
                            Me contacter
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>

                {/* — Mobile button — */}
                <div className="-mr-2 flex md:hidden">
                  <DisclosureButton className="inline-flex items-center justify-center rounded-xl p-2 text-slate-700 hover:bg-sky-50/80 hover:text-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 dark:text-slate-200 dark:hover:bg-slate-800">
                    {open ? <XMarkIcon className="size-6" /> : <Bars3Icon className="size-6" />}
                  </DisclosureButton>
                </div>
              </div>
            </div>

            {/* Mobile menu */}
            <DisclosurePanel className="md:hidden border-t border-sky-100/70 bg-white/90 backdrop-blur-xl dark:border-slate-700 dark:bg-slate-900/90">
              <div className="px-4 pb-4 pt-2">
                <div className="grid gap-1">
                  {NAV.map((item, idx) => (
                    <DisclosureButton
                      key={item.name}
                      as="a"
                      href={item.href}
                      onClick={handleMobileLinkClick}
                      className={cx(
                        'group relative block rounded-xl px-4 py-3 text-base font-medium',
                        active === item.href.replace('#', '')
                          ? 'bg-sky-50/80 text-sky-700 ring-1 ring-sky-200/60 dark:bg-slate-800/50 dark:text-sky-300 dark:ring-slate-700'
                          : 'text-slate-700 hover:bg-sky-50/70 hover:text-sky-700 dark:text-slate-200 dark:hover:bg-slate-800/60'
                      )}
                      style={{ animationDelay: `${idx * 30}ms` }}
                    >
                      {item.name}
                    </DisclosureButton>
                  ))}
                </div>

                {/* User mobile */}
                <div className="mt-3 flex items-center gap-3 rounded-xl border border-sky-100/70 bg-white/70 p-3 dark:border-slate-700 dark:bg-slate-900/60">
                  <img alt={user.name} src={user.imageUrl} className="size-10 rounded-full object-cover ring-2 ring-sky-300/40" />
                  <div>
                    <p className="font-medium text-slate-800 dark:text-slate-100">{user.name}</p>
                    <a href={`mailto:${user.email}`} className="text-sm text-slate-500 hover:text-sky-600 dark:text-slate-400 dark:hover:text-sky-300">
                      {user.email}
                    </a>
                  </div>
                </div>
              </div>
            </DisclosurePanel>
          </>
        )}
      </Disclosure>

      {/* Accessibilité: réduit les animations si préférence système */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.001ms !important; animation-iteration-count: 1 !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </div>
  )
}
