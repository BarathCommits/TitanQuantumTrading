"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, TrendingUp, Users, Shield, Award } from "lucide-react"
import { useState } from "react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/strategies", label: "Strategies" },
  { href: "/performance", label: "Performance" },
]

const stats = [
  { icon: TrendingUp, value: "$2.4B+", label: "Traded Volume" },
  { icon: Users, value: "12K+", label: "Active Users" },
  { icon: Shield, value: "99.9%", label: "Uptime" },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-themed bg-primary/95 backdrop-blur-xl">
      {/* Top bar with stats */}
      <div className="hidden border-b border-themed bg-secondary/50 py-2 lg:block">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-center gap-12 px-6">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center gap-2">
              <stat.icon size={14} className="text-accent" />
              <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                {stat.value}
              </span>
              <span className="text-xs text-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-6 py-4 md:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="group flex items-center gap-3">
            <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary text-base font-bold text-white shadow-lg">
              <Award size={20} />
            </div>
            <div>
              <span className="block text-sm font-bold tracking-[0.12em] text-text-primary leading-tight">
                TITAN
              </span>
              <span className="block text-sm font-bold tracking-[0.12em] text-text-primary leading-tight">
                QUANTUM
              </span>
              <span className="block text-sm font-bold tracking-[0.12em] text-text-primary leading-tight">
                TRADING
              </span>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link ${pathname === item.href ? "active" : ""}`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/about" className="btn-primary">
              Get Started
            </Link>
          </div>

          <button
            className="rounded-md border border-themed p-2 text-text-primary lg:hidden"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-themed bg-primary lg:hidden">
          <div className="mx-auto max-w-screen-2xl space-y-2 px-6 py-5 md:px-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`block py-3 text-sm font-semibold uppercase tracking-[0.12em] ${
                  pathname === item.href ? "text-accent" : "text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="btn-primary w-full justify-center"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
