import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

function VideoEngine({ apiBase }) {
  const [videoData, setVideoData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchVideoData()
  }, [])

  const fetchVideoData = async () => {
    setLoading(true)
    setError('')
    try {
      const response = await axios.get(`${apiBase}/market-video-data`)
      setVideoData(response.data)
    } catch (error) {
      console.error('Error fetching video data:', error)
      setError('Failed to load market video data. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const generateVideo = () => {
    // In a real implementation, this would trigger video generation
    alert('Video generation would start here. This would create a 30-90 second video with the data below.')
  }

  if (loading) {
    return (
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="flex flex-col items-center justify-center py-16"
      >
        <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full mb-4"></div>
        <p className="text-slate-300">Loading market video data...</p>
      </motion.div>
    )
  }

  const chartData = videoData ? [
    { name: 'FII Flow', value: videoData.fii_dii_flow.FII, color: '#3B82F6' },
    { name: 'DII Flow', value: videoData.fii_dii_flow.DII, color: '#10B981' }
  ] : []

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="text-center">
        <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
          Auto-generate professional market update videos from real-time data and AI insights.
        </p>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-500/20 border border-red-300/50 text-red-100 rounded-xl p-4 text-center"
        >
          {error}
          <button
            onClick={fetchVideoData}
            className="ml-4 px-4 py-2 bg-red-500/30 hover:bg-red-500/50 rounded-lg transition-colors"
          >
            Retry
          </button>
        </motion.div>
      )}

      <motion.button
        onClick={generateVideo}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="w-full px-8 py-6 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl font-bold hover:shadow-lg hover:shadow-pink-500/25 transition-all duration-300 text-xl shadow-xl"
      >
        <div className="flex items-center justify-center space-x-3">
          <span className="text-2xl">🎥</span>
          <span>Generate AI Market Video</span>
        </div>
      </motion.button>

      {videoData && (
        <div className="space-y-8">
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-cyan-500/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl flex items-center justify-center">
                <span className="text-3xl">📊</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Market Summary</h3>
                <p className="text-slate-400">AI-generated market overview</p>
              </div>
            </div>
            <p className="text-slate-200 leading-relaxed text-lg">{videoData.market_summary}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="bg-gradient-to-br from-green-500/10 via-emerald-500/5 to-teal-500/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                <span className="text-3xl">📈</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Top Gainers</h3>
                <p className="text-slate-400">Stocks leading the market</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4">
              {videoData.top_gainers.map((stock, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 text-green-300 rounded-xl font-semibold border border-green-400/30 shadow-lg hover:shadow-green-500/25 transition-all duration-300"
                >
                  {stock}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="bg-gradient-to-br from-slate-700/50 to-slate-600/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-slate-500/20 to-gray-500/20 rounded-xl flex items-center justify-center">
                <span className="text-3xl">🏢</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">Sector Rotation</h3>
                <p className="text-slate-400">Market sector performance</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(videoData.sector_rotation).map(([sector, direction], index) => (
                <motion.div
                  key={sector}
                  initial={{ opacity: 0, x: -20, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.4 }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-6 rounded-xl border shadow-lg transition-all duration-300 ${
                    direction === 'up'
                      ? 'bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-400/30 text-green-300 hover:shadow-green-500/25'
                      : 'bg-gradient-to-r from-red-500/10 to-pink-500/10 border-red-400/30 text-red-300 hover:shadow-red-500/25'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold text-lg">{sector}</div>
                      <div className="text-sm opacity-75 flex items-center mt-1">
                        {direction === 'up' ? (
                          <>
                            <span className="mr-2">↗️</span>
                            Rising
                          </>
                        ) : (
                          <>
                            <span className="mr-2">↘️</span>
                            Falling
                          </>
                        )}
                      </div>
                    </div>
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      direction === 'up' ? 'bg-green-500/20' : 'bg-red-500/20'
                    }`}>
                      <span className="text-2xl">
                        {direction === 'up' ? '📈' : '📉'}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.95 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-2xl p-8 border border-white/10 shadow-xl"
          >
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-14 h-14 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                <span className="text-3xl">💰</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">FII/DII Flow</h3>
                <p className="text-slate-400">Institutional investor activity</p>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <defs>
                    <linearGradient id="fiiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.2}/>
                    </linearGradient>
                    <linearGradient id="diiGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.2}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis
                    dataKey="name"
                    stroke="#9ca3af"
                    fontSize={14}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e293b',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#f1f5f9'
                    }}
                  />
                  <Bar
                    dataKey="value"
                    fill="url(#fiiGradient)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  )
}

export default VideoEngine