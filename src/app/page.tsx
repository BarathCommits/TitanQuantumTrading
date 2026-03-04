"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, BarChart3, Globe, Shield, Target, TrendingUp, Users, Clock, ChevronRight, Star, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

const pillars = [
  {
    icon: BarChart3,
    title: "Quantitative Intelligence",
    description: "Research-first signal architecture designed for dynamic market regimes.",
  },
  {
    icon: Shield,
    title: "Advanced Risk Management",
    description: "Portfolio-level controls that prioritize capital preservation across cycles.",
  },
  {
    icon: Target,
    title: "Strategic Positioning",
    description: "Precision entries and exits across equities, options, and digital assets.",
  },
  {
    icon: Globe,
    title: "Global Market Access",
    description: "Cross-venue execution calibrated for speed, liquidity, and consistency.",
  },
]

const stats = [
  { value: "$2.4B+", label: "Total Volume Traded" },
  { value: "99.9%", label: "Uptime Reliability" },
  { value: "50+", label: "Global Markets" },
  { value: "24/7", label: "Active Trading" },
]

const testimonials = [
  { name: "Sarah M.", role: "Portfolio Manager", initials: "SM", text: "Titan Quantum's systematic approach has transformed our trading infrastructure." },
  { name: "James K.", role: "Hedge Fund Director", initials: "JK", text: "Exceptional risk management and execution quality. A true partner in alpha generation." },
  { name: "Elena R.", role: "Institutional Investor", initials: "ER", text: "The consistency of returns and transparency is what sets them apart." },
]

const tickerItems = ["AAPL", "TSLA", "GOOGL", "MSFT", "AMZN", "NVDA", "META", "SPY", "QQQ", "IWM"]
const liveMarketSymbols = ["SPY", "QQQ", "NVDA", "AAPL"]

interface TickerData {
  symbol: string
  price: string
  change: string
  changePercent: string
  positive: boolean
}

const fetchBulkTickerData = async (symbols: string[]): Promise<TickerData[]> => {
  try {
    const apiKey = process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY || "demo"
    const symbolsParam = symbols.join(",")
    const url = `https://www.alphavantage.co/query?function=REALTIME_BULK_QUOTES&symbol=${symbolsParam}&apikey=${apiKey}`
    
    console.log(`Fetching bulk data for: ${symbolsParam}`)
    
    const response = await fetch(url)
    const data = await response.json()
    
    console.log("API Response:", data)
    
    if (data["data"] && Array.isArray(data["data"])) {
      const results = data["data"].map((quote: any) => {
        const price = parseFloat(quote["price"]).toFixed(2)
        const change = parseFloat(quote["change"]).toFixed(2)
        const changePercent = quote["change_percent"]
        const positive = parseFloat(change) >= 0
        
        console.log(`✓ Fetched ${quote["symbol"]}: $${price} (${changePercent})`)
        
        return {
          symbol: quote["symbol"],
          price,
          change: `${positive ? "+" : ""}${change}`,
          changePercent: `${changePercent}%`,
          positive
        }
      })
      
      return results
    } else {
      console.warn("No data array in API response, using mock data")
    }
  } catch (error) {
    console.error("Error fetching bulk ticker data:", error)
  }
  
  // Fallback to mock data if API fails
  console.log("Using mock data for symbols:", symbols)
  return symbols.map(symbol => {
    const mockPrice = (Math.random() * 500 + 100).toFixed(2)
    const mockChange = (Math.random() * 10 - 5).toFixed(2)
    const positive = parseFloat(mockChange) >= 0
    
    return {
      symbol,
      price: mockPrice,
      change: `${positive ? "+" : ""}${mockChange}`,
      changePercent: `${positive ? "+" : ""}${(Math.random() * 5).toFixed(2)}%`,
      positive
    }
  })
}

const benefits = [
  "Institutional-grade execution",
  "Real-time risk monitoring",
  "Multi-asset coverage",
  "Transparent reporting",
  "Dedicated support team",
]

export default function Home() {
  const [tickerData, setTickerData] = useState<TickerData[]>([])
  const [liveMarketData, setLiveMarketData] = useState<TickerData[]>([])

  useEffect(() => {
    const loadTickerData = async () => {
      // Fetch all ticker data in one bulk API call
      const allData = await fetchBulkTickerData(tickerItems)
      setTickerData(allData)
      
      // Get live market data (subset of tickers)
      const liveData = allData.filter(ticker => liveMarketSymbols.includes(ticker.symbol))
      setLiveMarketData(liveData)
    }

    loadTickerData()

    // Refresh data every 30 seconds
    const interval = setInterval(loadTickerData, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen">
      {/* Ticker tape */}
      <div className="border-b border-themed bg-secondary/50 overflow-hidden py-3">
        <div className="ticker-tape flex">
          {tickerData.length > 0 ? (
            [...tickerData, ...tickerData, ...tickerData, ...tickerData].map((ticker, i) => (
              <div key={i} className="flex items-center gap-2 mx-6 whitespace-nowrap">
                <span className="text-sm font-bold text-accent">{ticker.symbol}</span>
                <span className={`text-xs ${ticker.positive ? "text-positive" : "text-negative"}`}>
                  {ticker.changePercent}
                </span>
              </div>
            ))
          ) : (
            // Fallback while data is loading
            [...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((symbol, i) => (
              <div key={i} className="flex items-center gap-2 mx-6 whitespace-nowrap">
                <span className="text-sm font-bold text-accent">{symbol}</span>
                <span className="text-xs text-positive">+{(Math.random() * 3 + 1).toFixed(2)}%</span>
              </div>
            ))
          )}
        </div>
      </div>

      <section className="relative min-h-screen overflow-hidden pb-20 pt-36">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex flex-col justify-center"
            >
              <div className="mb-6 inline-flex items-center gap-2 badge badge-success w-fit">
                <TrendingUp size={14} />
                <span>Institutional Trading Firm</span>
              </div>

              <h1 className="text-5xl font-extrabold leading-[0.98] text-text-primary md:text-6xl lg:text-7xl">
                TRADE WITH
                <br />
                <span className="gradient-text">PRECISION</span>
              </h1>

              <p className="mt-6 max-w-2xl text-xl text-text-secondary md:text-2xl">
                Where Data Meets Dominance
              </p>

              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
                Titan Quantum Trading engineers alpha through precision, data, and disciplined execution
                across global markets. Join thousands of investors who trust our systematic approach.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link href="/about" className="btn-primary">
                  Start Trading <ArrowRight size={16} />
                </Link>
                <Link href="/strategies" className="btn-secondary">
                  View Strategies
                </Link>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex items-center gap-8">
                <div className="flex -space-x-3">
                  {testimonials.map((t, i) => (
                    <div key={i} className="social-proof-avatar border-2 border-primary">
                      {t.initials}
                    </div>
                  ))}
                </div>
                <div className="social-proof-text">
                  <span className="font-semibold text-text-primary">2,400+</span> traders worldwide
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="card p-8 md:p-10"
            >
              <h2 className="text-3xl text-text-primary">Global Market Mandate</h2>
              <p className="mt-4 text-sm leading-relaxed text-muted">
                We deploy quantitative intelligence, advanced risk management, and strategic market positioning to
                capture opportunity in equities, options, and digital assets worldwide.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  { label: "Primary Markets", value: "Equities | Options | Digital Assets" },
                  { label: "Execution Model", value: "Systematic + Discretionary Overlay" },
                  { label: "Risk Framework", value: "Real-Time Multi-Layer Controls" },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl border border-themed bg-bg-tertiary p-4">
                    <p className="text-xs uppercase tracking-[0.15em] text-muted">{item.label}</p>
                    <p className="mt-2 text-sm font-semibold text-text-primary">{item.value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-themed pt-6">
                <div className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-positive" />
                  <span className="text-sm text-text-secondary">Verified Performance</span>
                </div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="stat-card"
              >
                <div className="stat-card-value">{stat.value}</div>
                <div className="stat-card-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-text-primary md:text-5xl">
              Why Choose <span className="gradient-text">Titan Quantum</span>
            </h2>
            <p className="mt-4 text-lg text-muted max-w-2xl mx-auto">
              We combine cutting-edge technology with institutional-grade risk management to deliver consistent results.
            </p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {pillars.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="feature-card"
              >
                <div className="feature-icon">
                  <item.icon size={24} className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-text-primary">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.description}</p>
                <div className="mt-6 flex items-center gap-2 text-accent">
                  <span className="text-sm font-semibold">Learn more</span>
                  <ChevronRight size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="section bg-secondary">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h2 className="text-4xl font-bold text-text-primary md:text-5xl">
                Institutional-Grade <span className="gradient-text">Trading Infrastructure</span>
              </h2>
              <p className="mt-6 text-lg text-muted">
                Our platform is built for serious traders who demand reliability, speed, and transparency.
              </p>
              <div className="mt-8 grid gap-3">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle size={18} className="text-positive" />
                    <span className="text-text-primary">{benefit}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Link href="/about" className="btn-primary">
                  Get Started Today <ArrowRight size={16} />
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="card p-8"
            >
              <h3 className="text-2xl font-bold text-text-primary mb-6">Live Market Data</h3>
              <div className="space-y-4">
                {liveMarketData.length > 0 ? (
                  liveMarketData.map((item) => (
                    <div key={item.symbol} className="flex items-center justify-between p-4 rounded-xl bg-bg-tertiary">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <TrendingUp size={18} className="text-accent" />
                        </div>
                        <div>
                          <div className="font-bold text-text-primary">{item.symbol}</div>
                          <div className="text-xs text-muted">US Stock</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-text-primary">${item.price}</div>
                        <div className={`text-xs ${item.positive ? "text-positive" : "text-negative"}`}>{item.changePercent}</div>
                      </div>
                    </div>
                  ))
                ) : (
                  // Fallback while data is loading
                  [
                    { symbol: "SPY", price: "489.23", change: "+1.24%", positive: true },
                    { symbol: "QQQ", price: "412.87", change: "+1.89%", positive: true },
                    { symbol: "NVDA", price: "892.45", change: "+2.34%", positive: true },
                    { symbol: "AAPL", price: "178.45", change: "-0.89%", positive: false },
                  ].map((item) => (
                    <div key={item.symbol} className="flex items-center justify-between p-4 rounded-xl bg-bg-tertiary">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                          <TrendingUp size={18} className="text-accent" />
                        </div>
                        <div>
                          <div className="font-bold text-text-primary">{item.symbol}</div>
                          <div className="text-xs text-muted">US Stock</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-text-primary">${item.price}</div>
                        <div className={`text-xs ${item.positive ? "text-positive" : "text-negative"}`}>{item.change}</div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <h2 className="text-4xl font-bold text-text-primary md:text-5xl">
              Trusted by <span className="gradient-text">Industry Leaders</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-3">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card p-7"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} size={14} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-text-primary leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className="social-proof-avatar">{testimonial.initials}</div>
                  <div>
                    <div className="font-semibold text-text-primary">{testimonial.name}</div>
                    <div className="text-xs text-muted">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section pb-24">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="cta-section"
          >
            <h2 className="text-4xl font-bold text-text-primary md:text-5xl relative z-10">
              Ready to <span className="gradient-text">Transform</span> Your Trading?
            </h2>
            <p className="mt-6 text-lg text-muted max-w-2xl mx-auto relative z-10">
              Join thousands of traders who have elevated their trading with Titan Quantum's institutional-grade infrastructure.
            </p>
            <div className="mt-10 flex flex-wrap gap-4 justify-center relative z-10">
              <Link href="/about" className="btn-primary">
                Get Started Now <ArrowRight size={16} />
              </Link>
              <Link href="/performance" className="btn-secondary">
                View Performance
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
