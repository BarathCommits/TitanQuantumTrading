"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

// Hardcoded trading data - realistic portfolio growth
const chartData = [
  { date: "Jan", price: 100 },
  { date: "Feb", price: 102 },
  { date: "Mar", price: 101 },
  { date: "Apr", price: 105 },
  { date: "May", price: 108 },
  { date: "Jun", price: 107 },
  { date: "Jul", price: 112 },
  { date: "Aug", price: 115 },
  { date: "Sep", price: 114 },
  { date: "Oct", price: 118 },
  { date: "Nov", price: 122 },
  { date: "Dec", price: 125 },
  { date: "Jan", price: 128 },
  { date: "Feb", price: 132 },
  { date: "Mar", price: 135 },
  { date: "Apr", price: 138 },
  { date: "May", price: 142 },
  { date: "Jun", price: 145 },
  { date: "Jul", price: 148 },
  { date: "Aug", price: 152 },
  { date: "Sep", price: 156 },
  { date: "Oct", price: 160 },
  { date: "Nov", price: 165 },
  { date: "Dec", price: 170 },
  { date: "Jan", price: 175 },
  { date: "Feb", price: 180 },
  { date: "Mar", price: 185 },
  { date: "Apr", price: 190 },
  { date: "May", price: 195 },
  { date: "Jun", price: 200 },
  { date: "Jul", price: 208 },
  { date: "Aug", price: 215 },
  { date: "Sep", price: 220 },
  { date: "Oct", price: 228 },
  { date: "Nov", price: 235 },
  { date: "Dec", price: 242 },
  { date: "Jan", price: 250 },
  { date: "Feb", price: 258 },
  { date: "Mar", price: 265 },
  { date: "Apr", price: 272 },
  { date: "May", price: 280 },
  { date: "Jun", price: 288 },
  { date: "Jul", price: 295 },
  { date: "Aug", price: 302 },
  { date: "Sep", price: 310 },
  { date: "Oct", price: 318 },
  { date: "Nov", price: 325 },
  { date: "Dec", price: 332 },
  { date: "Jan", price: 340 },
  { date: "Feb", price: 348 },
  { date: "Mar", price: 355 },
  { date: "Apr", price: 362 },
  { date: "May", price: 370 },
  { date: "Jun", price: 378 },
  { date: "Jul", price: 385 },
  { date: "Aug", price: 392 },
  { date: "Sep", price: 400 },
  { date: "Oct", price: 408 },
  { date: "Nov", price: 415 },
  { date: "Dec", price: 422 },
]

export function TradingChart() {
  return (
    <div className="h-[400px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          {/* Subtle grid lines using border color */}
          <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
          
          {/* X-axis shows months */}
          <XAxis 
            dataKey="date" 
            stroke="var(--chart-grid)"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            tickLine={{ stroke: "var(--chart-grid)" }}
          />
          
          {/* Y-axis shows price */}
          <YAxis 
            stroke="var(--chart-grid)"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            tickLine={{ stroke: "var(--chart-grid)" }}
            domain={["auto", "auto"]}
          />
          
          {/* Tooltip shows details on hover */}
          <Tooltip 
            contentStyle={{ 
              backgroundColor: "var(--bg-secondary)", 
              border: "1px solid var(--border)",
              borderRadius: "8px",
              color: "var(--text-primary)"
            }}
            labelStyle={{ color: "var(--accent-gold)" }}
            formatter={(value) => [`$${value}`, "Portfolio"]}
          />
          
          <Legend 
            wrapperStyle={{ color: "var(--text-muted)" }}
          />
          
          {/* Main price line with dynamic color based on theme */}
          <Line
            type="monotone"
            dataKey="price"
            className="chart-line"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, fill: 'var(--chart-line)' }}
            name="Portfolio Value ($)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
