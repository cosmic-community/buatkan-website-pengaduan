'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

const navItems = [
  { href: '/', label: 'Beranda' },
  { href: '/bidang-layanan', label: 'Bidang Layanan' },
  { href: '/advokat', label: 'Advokat' },
  { href: '/pengaduan', label: 'Pengaduan' },
  { href: '/kontak', label: 'Kontak' },
]

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 bg-navy-900 shadow-md">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="text-gold-400 text-2xl">⚖️</span>
            LBH Mahaka
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive =
                item.href === '/'
                  ? pathname === '/'
                  : pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-gold-400'
                      : 'text-navy-100 hover:text-gold-300'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <Link
            href="/kontak#form"
            className="hidden md:inline-flex items-center justify-center px-5 py-2 rounded-md bg-gold-500 text-navy-900 text-sm font-semibold hover:bg-gold-600 transition-colors"
          >
            Ajukan Pengaduan
          </Link>

          <button
            type="button"
            aria-label="Buka menu"
            className="md:hidden text-white text-2xl"
            onClick={() => setIsOpen((prev) => !prev)}
          >
            {isOpen ? '✕' : '☰'}
          </button>
        </div>

        {isOpen && (
          <nav className="md:hidden pb-4 flex flex-col gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="text-navy-100 hover:text-gold-300 py-2 text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/kontak#form"
              onClick={() => setIsOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-5 py-2 rounded-md bg-gold-500 text-navy-900 text-sm font-semibold"
            >
              Ajukan Pengaduan
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}