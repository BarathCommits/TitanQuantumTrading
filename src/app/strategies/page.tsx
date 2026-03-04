"use client"

import { motion } from "framer-motion"
import { TrendingUp, Activity, BarChart3, Zap, ArrowRight, Shield, Globe, Clock } from "lucide-react"
import Link from "next/link"

const strategies = [
  {
    id: "stat-arb",
    title: "Statistical Arbitrage",
    tagline: "Exploiting market inefficiencies with mathematical precision",
    description: "Our statistical arbitrage strategy identifies and exploits pricing inefficiencies across correlated instruments. Using proprietary machine learning models, we detect mispricings in milliseconds and execute trades with sub-microsecond latency.",
    detailedFeatures: [
      "Multi-factor mean-reversion models",
      "Cross-asset correlation analysis",
      "Real-time risk monitoring",
      "Dynamic position sizing",
    ],
    metrics: [
      { label: "Annual Return", value: "28.4%", positive: true },
      { label: "Sharpe Ratio", value: "2.8", positive: true },
      { label: "Max Drawdown", value: "-4.2%", positive: false },
      { label: "Win Rate", value: "62%", positive: true },
    ],
    details: {
      capacity: "$500M",
      instruments: "Equities, Options, Futures",
      holdingPeriod: "Milliseconds to Days",
      volatility: "Medium",
    },
    color: "accent",
  },
  {
    id: "market-making",
    title: "Market Making",
    tagline: "Providing liquidity with adaptive quoting strategies",
    description: "Our market making strategy provides liquidity to equity options markets while maintaining a delta-neutral portfolio. Our proprietary models optimize quoting behavior to capture the spread while managing inventory risk across multiple expiration cycles.",
    detailedFeatures: [
      "Vol surface modeling",
      "Delta-gamma hedging",
      "Inventory optimization",
      "Dynamic quoting algorithms",
    ],
    metrics: [
      { label: "Annual Return", value: "31.2%", positive: true },
      { label: "Sharpe Ratio", value: "3.4", positive: true },
      { label: "Max Drawdown", value: "-2.1%", positive: false },
      { label: "Win Rate", value: "71%", positive: true },
    ],
    details: {
      capacity: "$200M",
      instruments: "Equity Options",
      holdingPeriod: "Intra-day",
      volatility: "Low",
    },
    color: "accent",
  },
  {
    id: "global-macro",
    title: "Global Macro",
    tagline: "Capturing directional opportunities across global markets",
    description: "Our global macro strategy combines fundamental research with quantitative timing signals to identify directional opportunities in rates, FX, and commodities markets. We use a multi-factor approach that blends economic data, technical analysis, and sentiment indicators.",
    detailedFeatures: [
      "Multi-factor signal generation",
      "Regime detection",
      "Tail risk management",
      "Currency hedging",
    ],
    metrics: [
      { label: "Annual Return", value: "19.8%", positive: true },
      { label: "Sharpe Ratio", value: "1.9", positive: true },
      { label: "Max Drawdown", value: "-8.7%", positive: false },
      { label: "Win Rate", value: "58%", positive: true },
    ],
    details: {
      capacity: "$1B+",
      instruments: "Rates, FX, Commodities",
      holdingPeriod: "Days to Weeks",
      volatility: "Medium-High",
    },
    color: "accent",
  },
]

const process = [
  { step: "01", title: "Research", description: "Rigorous quantitative research using historical data and forward testing." },
  { step: "02", title: "Development", description: "Strategy implementation with robust risk controls and execution logic." },
  { step: "03", title: "Testing", description: "Extensive backtesting, paper trading, and stress testing." },
  { step: "04", title: "Deployment", description: "Careful capital allocation with continuous monitoring and optimization." },
]

export default function Strategies() {
  return (
    <div className="min-h-screen pt-36 pb-24">
      <div className="container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 badge badge-success mb-6">
            <BarChart3 size={14} />
            <span>Our Strategies</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
            Systematic <span className="gradient-text">Alpha</span> Strategies
          </h1>

          <p className="text-xl text-muted max-w-3xl leading-relaxed mb-16">
            Three distinct approaches. One unified mandate: asymmetric returns with institutional-grade risk management. Each strategy is designed to deliver consistent performance across varying market conditions.
          </p>
        </motion.div>

        {/* Strategy Cards */}
        <div className="space-y-8">
          {strategies.map((strategy, index) => (
            <motion.div
              key={strategy.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              className="card overflow-hidden"
            >
              <div className="grid lg:grid-cols-3">
                {/* Left: Main Content */}
                <div className="lg:col-span-2 p-8 md:p-10">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-3xl font-bold text-text-primary">{strategy.title}</h3>
                      <p className="text-accent mt-2 font-medium">{strategy.tagline}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2 text-sm text-muted">
                      <Zap size={16} />
                      <span>Active</span>
                    </div>
                  </div>

                  <p className="text-muted leading-relaxed mb-8">
                    {strategy.description}
                  </p>

                  {/* Features */}
                  <div className="mb-8">
                    <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-4">Key Features</h4>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {strategy.detailedFeatures.map((feature) => (
                        <div key={feature} className="flex items-center gap-3 text-muted">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Strategy Details */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-bg-tertiary rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted mb-1">
                        <Globe size={14} />
                        <span className="text-xs">Capacity</span>
                      </div>
                      <div className="text-text-primary font-semibold">{strategy.details.capacity}</div>
                    </div>
                    <div className="bg-bg-tertiary rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted mb-1">
                        <Activity size={14} />
                        <span className="text-xs">Instruments</span>
                      </div>
                      <div className="text-text-primary font-semibold text-sm">{strategy.details.instruments}</div>
                    </div>
                    <div className="bg-bg-tertiary rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted mb-1">
                        <Clock size={14} />
                        <span className="text-xs">Holding Period</span>
                      </div>
                      <div className="text-text-primary font-semibold text-sm">{strategy.details.holdingPeriod}</div>
                    </div>
                    <div className="bg-bg-tertiary rounded-lg p-4">
                      <div className="flex items-center gap-2 text-muted mb-1">
                        <TrendingUp size={14} />
                        <span className="text-xs">Volatility</span>
                      </div>
                      <div className="text-text-primary font-semibold">{strategy.details.volatility}</div>
                    </div>
                  </div>
                </div>

                {/* Right: Metrics */}
                <div className="bg-bg-tertiary p-8 md:p-10 border-t lg:border-t-0 lg:border-l border-themed">
                  <h4 className="text-sm font-semibold text-text-primary uppercase tracking-wider mb-6">Performance</h4>
                  
                  <div className="space-y-4">
                    {strategy.metrics.map((metric) => (
                      <div key={metric.label} className="flex items-center justify-between">
                        <span className="text-muted text-sm">{metric.label}</span>
                        <span className={`font-bold text-lg ${metric.positive ? 'text-positive' : 'text-negative'}`}>
                          {metric.value}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-8 border-t border-themed">
                    <Link 
                      href="/performance" 
                      className="btn-primary w-full justify-center"
                    >
                      View Full Metrics <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Process Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-12 text-center">
            Our <span className="gradient-text">Process</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="card p-6"
              >
                <div className="text-4xl font-bold gradient-text mb-4">{item.step}</div>
                <h3 className="text-xl font-semibold text-text-primary mb-2">{item.title}</h3>
                <p className="text-muted text-sm">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Risk Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 p-6 bg-bg-tertiary rounded-xl border border-themed"
        >
          <div className="flex items-start gap-4">
            <Shield size={24} className="text-accent flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-text-primary mb-2">Risk Disclosure</h4>
              <p className="text-muted text-sm leading-relaxed">
                Past performance is not indicative of future results. All investments involve risk, including the possible loss of principal. The strategies described above are speculative and may not be suitable for all investors. Please review our Risk Disclosure Statement for complete information.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
