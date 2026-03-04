"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BarChart3, Globe, Shield, Target } from "lucide-react"

const markets = ["Global Equities", "Derivatives", "Digital Assets"]

const executionStack = [
  {
    icon: BarChart3,
    title: "Quantitative Intelligence",
    description: "Signal generation and portfolio construction informed by research and empirical testing.",
  },
  {
    icon: Shield,
    title: "Risk Discipline",
    description: "Every position is measured through scenario analysis, sizing controls, and downside protection.",
  },
  {
    icon: Target,
    title: "Strategic Positioning",
    description: "Execution frameworks designed to capture opportunity without compromising capital quality.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "Mandates deployed across regions and time zones to maintain a diversified opportunity set.",
  },
]

export default function About() {
  return (
    <div className="min-h-screen pb-24 pt-34">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 badge badge-success">
            <Shield size={14} />
            <span>About Titan Quantum Trading</span>
          </div>

          <h1 className="text-5xl text-text-primary md:text-6xl lg:text-7xl">
            High-Performance
            <span className="gradient-text"> Trading Discipline</span>
          </h1>

          <p className="mt-8 max-w-4xl text-lg leading-relaxed text-muted">
            Titan Quantum Trading is a high-performance trading firm operating across global equities, derivatives,
            and digital asset markets.
          </p>
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-muted">
            At our core, we are a team of disciplined thinkers, relentless learners, and calculated risk-takers who
            believe markets reward preparation, patience, and precision. We combine quantitative intelligence with
            real-world market experience to navigate complexity and uncover opportunity across any environment.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-14 grid gap-6 md:grid-cols-3"
        >
          {markets.map((market) => (
            <div key={market} className="metric-card text-center">
              <p className="text-xs uppercase tracking-[0.15em] text-muted">Market Coverage</p>
              <p className="mt-3 text-xl text-text-primary">{market}</p>
            </div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25 }}
          className="mt-16 card p-8 md:p-12"
        >
          <h2 className="text-4xl text-text-primary md:text-5xl">Mission Statement</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            Titan Quantum Trading exists to engineer alpha through precision, data, and disciplined execution across
            global markets.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted">
            We deploy quantitative intelligence, advanced risk management, and strategic market positioning to capture
            opportunity in equities, options, and digital assets worldwide.
          </p>
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.16em] text-text-secondary">
            Our mission is simple:
          </p>
          <div className="mt-4 space-y-3 text-lg text-text-primary">
            <p>Dominate volatility.</p>
            <p>Protect capital.</p>
            <p>Compound intelligently.</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-16"
        >
          <h2 className="text-center text-4xl text-text-primary md:text-5xl">
            Our Operating <span className="gradient-text">Edge</span>
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {executionStack.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 + index * 0.08 }}
                className="card p-7"
              >
                <div className="mb-5 flex size-12 items-center justify-center rounded-lg bg-accent/10">
                  <item.icon size={22} className="text-accent" />
                </div>
                <h3 className="text-2xl text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="mt-16 card p-8 text-center md:p-12"
        >
          <p className="text-xl text-text-primary">Every trade reflects research.</p>
          <p className="mt-3 text-xl text-text-primary">Every decision respects risk.</p>
          <p className="mt-3 text-xl text-text-primary">Every strategy is built for long-term performance.</p>
          <p className="mt-8 text-2xl font-semibold text-accent">
            Built on data. Driven by edge. Guided by discipline.
          </p>
          <div className="mt-10">
            <Link href="/strategies" className="btn-primary">
              Explore Strategies <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
