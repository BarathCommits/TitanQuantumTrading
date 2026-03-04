"use client"

import { motion } from "framer-motion"
import { TrendingUp, Shield, BarChart3, PieChart, Activity, ArrowRight, Download } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

const TradingChart = dynamic(
  () => import("@/components/TradingChart").then((module) => module.TradingChart),
  { ssr: false }
)

const performanceData = [
  { 
    label: "Cumulative Return", 
    value: "+847%", 
    subtext: "Since Inception (2018)",
    icon: TrendingUp,
  },
  { 
    label: "Annualized Return", 
    value: "24.3%", 
    subtext: "Net of All Fees",
    icon: BarChart3,
  },
  { 
    label: "Sharpe Ratio", 
    value: "2.4", 
    subtext: "Risk-Adjusted Return",
    icon: Activity,
  },
  { 
    label: "Max Drawdown", 
    value: "-6.8%", 
    subtext: "March 2020",
    icon: Activity,
  },
  { 
    label: "Win Rate", 
    value: "68%", 
    subtext: "Profitable Months",
    icon: PieChart,
  },
  { 
    label: "Assets Under Management", 
    value: "$2.4B", 
    subtext: "As of Q4 2025",
    icon: Shield,
  },
]

const monthlyReturns = [
  { month: "Jan", return: 2.1 },
  { month: "Feb", return: 1.8 },
  { month: "Mar", return: -0.5 },
  { month: "Apr", return: 3.2 },
  { month: "May", return: 2.4 },
  { month: "Jun", return: 1.5 },
  { month: "Jul", return: 2.8 },
  { month: "Aug", return: -1.2 },
  { month: "Sep", return: 1.9 },
  { month: "Oct", return: 2.5 },
  { month: "Nov", return: 1.7 },
  { month: "Dec", return: 3.1 },
]

const yearlyReturns = [
  { year: "2018", return: 12.4, benchmark: 8.2 },
  { year: "2019", return: 28.6, benchmark: 22.4 },
  { year: "2020", return: 31.2, benchmark: 18.4 },
  { year: "2021", return: 24.8, benchmark: 21.6 },
  { year: "2022", return: 18.4, benchmark: -18.2 },
  { year: "2023", return: 26.2, benchmark: 24.8 },
  { year: "2024", return: 22.8, benchmark: 21.4 },
  { year: "2025", return: 21.6, benchmark: 18.2 },
]

const riskMetrics = [
  { label: "Volatility (Annual)", value: "8.2%", description: "Annualized standard deviation of returns" },
  { label: "Beta", value: "0.42", description: "Correlation with S&P 500" },
  { label: "Sortino Ratio", value: "3.1", description: "Downside risk-adjusted return" },
  { label: "Calmar Ratio", value: "2.8", description: "Return relative to max drawdown" },
  { label: "Information Ratio", value: "1.2", description: "Alpha per unit of tracking error" },
  { label: "Treynor Ratio", value: "0.58", description: "Return per unit of systematic risk" },
]

export default function Performance() {
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
            <span>Performance</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary mb-6">
            Audited <span className="gradient-text">Results</span>
          </h1>

          <p className="text-xl text-muted max-w-3xl leading-relaxed mb-16">
            Transparent, verified performance data from an independent third-party administrator. Full track record available upon request for qualified investors.
          </p>
        </motion.div>

        {/* Main Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          {performanceData.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="card p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <item.icon size={20} className="text-accent" />
                </div>
                <span className="text-sm text-muted uppercase tracking-wider">{item.label}</span>
              </div>
              <div className="text-4xl font-bold gradient-text">{item.value}</div>
              <div className="text-sm text-muted mt-2">{item.subtext}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Performance Chart */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="card p-8 mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-semibold text-text-primary">Cumulative Performance</h3>
              <p className="text-muted text-sm mt-1">Portfolio value since inception (rebased to 100)</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-accent" />
                <span className="text-muted">Titan Quantum</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-3 h-3 rounded-full bg-muted" />
                <span className="text-muted">S&P 500</span>
              </div>
            </div>
          </div>
          <TradingChart />
        </motion.div>

        {/* Yearly Returns */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="card p-8 mb-12"
        >
          <h3 className="text-xl font-semibold text-text-primary mb-8">Annual Returns</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {yearlyReturns.map((item) => (
              <div key={item.year} className="text-center">
                <div className="text-sm text-muted mb-2">{item.year}</div>
                <div className={`text-xl font-bold ${item.return >= 0 ? 'text-positive' : 'text-negative'}`}>
                  +{item.return}%
                </div>
                <div className="text-xs text-muted mt-1">vs {item.benchmark >= 0 ? '+' : ''}{item.benchmark}%</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Returns (Last Year) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="card p-8 mb-12"
        >
          <h3 className="text-xl font-semibold text-text-primary mb-8">Monthly Returns (2025)</h3>
          <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
            {monthlyReturns.map((item) => (
              <div key={item.month} className="text-center">
                <div className="text-xs text-muted mb-2">{item.month}</div>
                <div className={`text-lg font-semibold ${item.return >= 0 ? 'text-positive' : 'text-negative'}`}>
                  {item.return >= 0 ? '+' : ''}{item.return}%
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Risk Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mb-12"
        >
          <h3 className="text-2xl font-bold text-text-primary mb-8 text-center">
            Risk <span className="gradient-text">Metrics</span>
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {riskMetrics.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="metric-card"
              >
                <div className="text-sm text-muted mb-2">{item.label}</div>
                <div className="text-3xl font-bold gradient-text">{item.value}</div>
                <div className="text-xs text-muted mt-3 leading-relaxed">{item.description}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Audit & Compliance */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="card p-8 mb-12"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Shield size={24} className="text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">Verified & Audited</h3>
              </div>
              <p className="text-muted leading-relaxed mb-6">
                All performance figures are verified by independent third-party administrators and audited by leading accounting firms. We maintain complete transparency in our reporting.
              </p>
              <ul className="space-y-3">
                {["Monthly investor reporting", "Quarterly independent audits", "Real-time investor portal access", "Full strategy-level attribution"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                    <span className="text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-bg-tertiary rounded-xl p-6">
              <h4 className="font-semibold text-text-primary mb-4">Audit Partners</h4>
              <div className="space-y-3 text-sm text-muted">
                <div className="flex justify-between py-2 border-b border-themed">
                  <span>Administrator</span>
                  <span className="text-text-primary">ABC Fund Services</span>
                </div>
                <div className="flex justify-between py-2 border-b border-themed">
                  <span>Auditor</span>
                  <span className="text-text-primary">KPMG</span>
                </div>
                <div className="flex justify-between py-2 border-b border-themed">
                  <span>Custodian</span>
                  <span className="text-text-primary">JP Morgan</span>
                </div>
                <div className="flex justify-between py-2">
                  <span>Prime Broker</span>
                  <span className="text-text-primary">Morgan Stanley</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="p-6 bg-bg-tertiary rounded-xl border border-themed"
        >
          <div className="flex items-start gap-4">
            <Shield size={20} className="text-accent flex-shrink-0 mt-1" />
            <div className="text-sm text-muted leading-relaxed">
              <strong className="text-text-primary">Important Risk Disclosure:</strong> Past performance is not indicative of future results. All investments involve risk, including the possible loss of principal. The performance data quoted represents past performance and does not guarantee future results. The investment return and principal value of an investment will fluctuate so that an investor&apos;s shares, when redeemed, may be worth more or less than their original cost. Current performance may be lower or higher than the performance data quoted. For current performance information, please contact our investor relations team.
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-muted mb-6">
            Interested in learning more about our performance?
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/about" className="btn-primary">
              Request Full Track Record <ArrowRight size={18} />
            </Link>
            <button className="btn-secondary">
              <Download size={18} className="mr-2" />
              Download Factsheet
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
