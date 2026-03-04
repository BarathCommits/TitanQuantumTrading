"use client"

import Link from "next/link"
import { Globe, Mail, Shield, TrendingUp, Twitter, Linkedin, Facebook, Instagram } from "lucide-react"

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Strategies", href: "/strategies" },
    { label: "Performance", href: "/performance" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Risk Disclosure", href: "#" },
  ],
  support: [
    { label: "Help Center", href: "#" },
    { label: "Contact Us", href: "#" },
    { label: "API Documentation", href: "#" },
  ],
}

const principles = [
  "Dominate volatility.",
  "Protect capital.",
  "Compound intelligently.",
]

export function Footer() {
  return (
    <footer className="border-t border-themed bg-secondary">
      {/* Top section with stats */}
      <div className="border-b border-themed">
        <div className="mx-auto grid max-w-screen-2xl gap-6 px-6 py-8 md:grid-cols-4 md:px-8">
          <div className="text-center md:text-left">
            <div className="text-sm uppercase tracking-[0.14em] text-muted">Coverage</div>
            <div className="mt-2 text-xl font-bold text-accent">Global Markets</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm uppercase tracking-[0.14em] text-muted">Execution</div>
            <div className="mt-2 text-xl font-bold text-accent">Quantitative</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm uppercase tracking-[0.14em] text-muted">Risk</div>
            <div className="mt-2 text-xl font-bold text-accent">Disciplined</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-sm uppercase tracking-[0.14em] text-muted">Mandate</div>
            <div className="mt-2 text-xl font-bold text-accent">Long-Term Alpha</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-screen-2xl px-6 py-14 md:px-8">
        <div className="grid gap-10 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3">
              <div className="flex size-11 items-center justify-center rounded-lg bg-gradient-to-br from-accent-primary to-accent-secondary text-base font-bold text-white">
                <TrendingUp size={20} />
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

            <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
              Titan Quantum Trading engineers alpha through precision, data, and disciplined execution
              across global markets.
            </p>

            <div className="mt-8 space-y-3 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Globe size={16} className="text-accent" />
                <span>Dublin, Ireland</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <span>mail2mebarath@gmail.com</span>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-8 flex gap-4">
              {[Twitter, Linkedin, Facebook, Instagram].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-themed bg-bg-tertiary text-text-secondary transition-all hover:border-accent hover:text-accent"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">Company</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">Support</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">Legal</h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="footer-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.16em] text-text-secondary">Mission</h4>
            <ul className="mt-4 space-y-3">
              {principles.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-muted">
                  <TrendingUp size={14} className="text-accent" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>


          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-themed pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Shield size={15} className="text-accent" />
            <span>Past performance does not guarantee future results. Trading involves risk.</span>
          </div>
          <span>© 2026 Titan Quantum Trading. All rights reserved.</span>
        </div>
      </div>
    </footer>
  )
}
