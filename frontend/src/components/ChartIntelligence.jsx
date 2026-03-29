import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'

function ChartIntelligence({ apiBase }) {
  const [symbol, setSymbol] = useState('RELIANCE')
  const [patterns, setPatterns] = useState([])
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState([])
  const [error, setError] = useState('')

  const analyzeStock = async () => {
    if (!symbol.trim()) {
      setError('Please enter a stock symbol (e.g., RELIANCE, TCS, HDFC)')
      return
    }
    
    setLoading(true)
    setError('')
    try {
      const response = await axios.post(`${apiBase}/chart-pattern`, { symbol })
      setPatterns(response.data.patterns)

      const data = Array.from({ length: 30 }, (_, i) => ({
        date: `Day ${i + 1}`,
        price: 100 + Math.random() * 20 - 10
      }))
      setChartData(data)
    } catch (error) {
      console.error('Error analyzing stock:', error)
      let errorMsg = 'Chart analysis failed. Please try again.'
      
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.data && error.response.data.detail) {
          errorMsg = error.response.data.detail
        } else if (error.response.status === 404) {
          errorMsg = `Stock symbol "${symbol}" not found. Please check and try again.`
        } else if (error.response.status === 422) {
          errorMsg = error.response.data.detail || 'Invalid input. Please check the stock symbol.'
        } else if (error.response.status >= 500) {
          errorMsg = 'Server error. Please try again later.'
        }
      } else if (error instanceof Error) {
        errorMsg = error.message
      }
      
      setError(errorMsg)
      setPatterns([])
      setChartData([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center">
        <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
          Real-time technical pattern detection with historical success rates and AI insights.
        </p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl"
      >
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value)}
            placeholder="Enter stock symbol (e.g., RELIANCE)"
            className="flex-1 px-6 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
          />
          <motion.button
            onClick={analyzeStock}
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 transition-all duration-300 text-lg"
          >
            {loading ? (
              <div className="flex items-center space-x-2">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Analyzing...</span>
              </div>
            ) : (
              'Analyze Patterns'
            )}
          </motion.button>
        </div>

        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-500/20 border border-red-300/50 text-red-100 rounded-xl p-4 mb-6"
          >
            {error}
          </motion.div>
        )}

        {chartData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 h-80 bg-gradient-to-br from-slate-900/50 to-slate-800/50 rounded-xl p-6 border border-white/10"
          >
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} tick={{ fill: '#9ca3af' }} />
                <YAxis stroke="#9ca3af" fontSize={12} tick={{ fill: '#9ca3af' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  fill="url(#colorPrice)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>
        )}

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold text-white">AI-Detected Patterns</h3>
            <div className="flex items-center space-x-4 text-sm text-slate-400">
              <span className="flex items-center">
                <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                High Success
              </span>
              <span className="flex items-center">
                <div className="w-3 h-3 bg-yellow-400 rounded-full mr-2"></div>
                Medium Success
              </span>
            </div>
          </div>

          {patterns.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">📈</span>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">Ready for Analysis</h4>
              <p className="text-slate-300">Enter a stock symbol and click "Analyze Patterns" to detect technical patterns.</p>
            </motion.div>
          ) : (
            patterns.map((pattern, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, x: 5 }}
                className="group bg-gradient-to-br from-green-500/10 via-blue-500/5 to-purple-500/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-14 h-14 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl flex items-center justify-center">
                      <span className="text-2xl">
                        {pattern.pattern.toLowerCase().includes('bull') ? '🐂' :
                         pattern.pattern.toLowerCase().includes('bear') ? '🐻' : '📊'}
                      </span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1 capitalize">{pattern.pattern}</h4>
                      <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                        parseFloat(pattern.success_rate) > 70 ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                        parseFloat(pattern.success_rate) > 50 ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                        'bg-red-500/20 text-red-300 border border-red-400/30'
                      }`}>
                        {pattern.success_rate} Success Rate
                      </span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="text-3xl opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    {parseFloat(pattern.success_rate) > 70 ? '🎯' : '⚡'}
                  </motion.div>
                </div>

                <p className="text-slate-200 leading-relaxed text-lg">{pattern.explanation}</p>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>AI Confidence: High</span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Pattern Active
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default ChartIntelligence