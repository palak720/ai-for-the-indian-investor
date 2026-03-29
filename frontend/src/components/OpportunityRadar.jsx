import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

function OpportunityRadar({ apiBase }) {
  const [alerts, setAlerts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAlerts()
  }, [])

  const fetchAlerts = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${apiBase}/opportunity-radar`)
      setAlerts(response.data.alerts)
    } catch (error) {
      console.error('Error fetching alerts:', error)
      setError('Failed to load opportunity alerts. Please try again.')
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
        <p className="text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto px-2">
          AI-powered alerts for missed opportunities from corporate filings, deals, and trades.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/20 border border-red-300/50 text-red-100 rounded-lg sm:rounded-xl p-3 sm:p-4 text-center text-sm sm:text-base"
        >
          {error}
          <button
            onClick={fetchAlerts}
            className="ml-2 sm:ml-4 px-3 sm:px-4 py-1 sm:py-2 bg-red-500/30 hover:bg-red-500/50 rounded-lg transition-colors text-xs sm:text-sm"
          >
            Retry
          </button>
        </motion.div>
      )}

      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="flex flex-col items-center justify-center py-16"
        >
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mb-4"></div>
          <p className="text-slate-300">Scanning market opportunities...</p>
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2">
          {alerts.length === 0 ? (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="md:col-span-2 bg-gradient-to-r from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-2xl p-8 text-center border border-white/10"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No New Opportunities</h3>
              <p className="text-slate-300">All clear! We'll notify you when new opportunities arise.</p>
            </motion.div>
          ) : (
            alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="group bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      alert.type === 'bulk_deal' ? 'bg-green-500/20' :
                      alert.type === 'insider_trade' ? 'bg-yellow-500/20' :
                      'bg-blue-500/20'
                    }`}>
                      <span className="text-2xl">
                        {alert.type === 'bulk_deal' ? '💰' :
                         alert.type === 'insider_trade' ? '👥' : '📊'}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{alert.stock}</h3>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        alert.type === 'bulk_deal' ? 'bg-green-500/20 text-green-300 border border-green-400/30' :
                        alert.type === 'insider_trade' ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30' :
                        'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                      }`}>
                        {alert.type.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <motion.div
                    whileHover={{ rotate: 15 }}
                    className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity"
                  >
                    ⚡
                  </motion.div>
                </div>

                <p className="text-slate-200 leading-relaxed">{alert.message}</p>

                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex items-center justify-between text-sm text-slate-400">
                    <span>Real-time Alert</span>
                    <span className="flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      Live
                    </span>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      )}
    </motion.div>
  )
}

export default OpportunityRadar