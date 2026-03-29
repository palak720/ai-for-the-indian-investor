import { useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

function MarketChat({ apiBase }) {
  const [message, setMessage] = useState('')
  const [portfolio, setPortfolio] = useState('')
  const [conversation, setConversation] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const sendMessage = async () => {
    if (!message.trim()) return

    setError('')
    const userMessage = { role: 'user', content: message }
    setConversation(prev => [...prev, userMessage])
    setLoading(true)

    try {
      const portfolioList = portfolio.split(',').map(s => s.trim()).filter(s => s)
      const response = await axios.post(`${apiBase}/market-chat`, {
        message,
        portfolio: portfolioList
      })

      const aiMessage = {
        role: 'assistant',
        content: response.data.response,
        sources: response.data.sources
      }
      setConversation(prev => [...prev, aiMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      let userFriendly = 'Sorry, I encountered an error. Please try again.'
      if (axios.isAxiosError(error) && error.response && error.response.data) {
        userFriendly = error.response.data.detail || userFriendly
      }
      setError(userFriendly)
      const errorMessage = { role: 'assistant', content: userFriendly }
      setConversation(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
      setMessage('')
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
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
          Conversational AI with portfolio-aware market insights and personalized recommendations.
        </p>
      </div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-gradient-to-br from-slate-800/50 to-slate-700/50 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 border border-white/10 shadow-xl h-96 sm:h-[500px] md:h-[600px] flex flex-col"
      >
        <div className="mb-4 sm:mb-6">
          <label className="block text-xs sm:text-sm font-medium text-slate-300 mb-2">
            Your Portfolio (Optional)
          </label>
          <input
            type="text"
            value={portfolio}
            onChange={(e) => setPortfolio(e.target.value)}
            placeholder="Enter stocks: RELIANCE, TCS, HDFC"
            className="w-full px-4 sm:px-6 py-2 sm:py-3 md:py-4 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base md:text-lg"
          />
        </div>

        <div className="flex-1 overflow-y-auto mb-4 sm:mb-6 space-y-4 sm:space-y-6 p-2">
          {conversation.length === 0 && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center text-slate-400 py-8 sm:py-12"
            >
              <div className="w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl sm:rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-3xl sm:text-4xl">🤖</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">AI Market Assistant</h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-md mx-auto">
                Ask about stocks, market trends, or investment strategies!
              </p>
            </motion.div>
          )}

          {conversation.map((msg, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-xs sm:max-w-sm md:max-w-lg px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-2xl shadow-lg text-sm sm:text-base ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                  : 'bg-gradient-to-r from-slate-700/50 to-slate-600/50 text-slate-200 border border-white/20 backdrop-blur-sm'
              }`}>
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className={`w-6 sm:w-8 h-6 sm:h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-sm sm:text-lg ${
                    msg.role === 'user'
                      ? 'bg-white/20'
                      : 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20'
                  }`}>
                    <span>
                      {msg.role === 'user' ? '👤' : '🤖'}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="leading-relaxed break-words">{msg.content}</p>
                    {msg.sources && msg.sources.length > 0 && (
                      <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-white/10">
                        <p className="text-xs text-slate-400 mb-1">Data:</p>
                        <div className="flex flex-wrap gap-1">
                          {msg.sources.map((source, idx) => (
                            <span key={idx} className="px-2 py-1 bg-white/10 rounded text-xs text-slate-300">
                              {source}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          {loading && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex justify-start"
            >
              <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 border border-white/20 backdrop-blur-sm px-4 sm:px-6 py-3 sm:py-4 rounded-lg sm:rounded-2xl shadow-lg">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-6 sm:w-8 h-6 sm:h-8 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <span className="text-sm sm:text-lg">🤖</span>
                  </div>
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-cyan-400 border-t-transparent rounded-full"
                    />
                    <span className="text-slate-300 text-sm sm:text-base">Analyzing...</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="flex gap-2 sm:gap-4">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask about stocks..."
            className="flex-1 px-4 sm:px-6 py-2 sm:py-3 md:py-4 bg-white/10 border border-white/20 rounded-lg sm:rounded-xl text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent text-sm sm:text-base md:text-lg"
            disabled={loading}
          />
          <motion.button
            onClick={sendMessage}
            disabled={loading || !message.trim()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg sm:rounded-xl font-semibold hover:shadow-lg hover:shadow-cyan-500/25 disabled:opacity-50 transition-all duration-300 text-xs sm:text-sm md:text-base whitespace-nowrap"
          >
            {loading ? 'Sending...' : 'Send'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default MarketChat