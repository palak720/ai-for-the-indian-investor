import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import axios from 'axios'
import OpportunityRadar from './components/OpportunityRadar'
import ChartIntelligence from './components/ChartIntelligence'
import MarketChat from './components/MarketChat'
import VideoEngine from './components/VideoEngine'
import './App.css'

const API_BASE = import.meta.env.VITE_API_BASE || ''

function App() {
  const [activeTab, setActiveTab] = useState('radar')

  const tabs = [
    { id: 'radar', name: 'Opportunity Radar', icon: '📊', component: OpportunityRadar, color: 'from-blue-500 to-cyan-500' },
    { id: 'chart', name: 'Chart Intelligence', icon: '📈', component: ChartIntelligence, color: 'from-purple-500 to-pink-500' },
    { id: 'chat', name: 'Market ChatGPT', icon: '🤖', component: MarketChat, color: 'from-green-500 to-teal-500' },
    { id: 'video', name: 'Video Engine', icon: '🎥', component: VideoEngine, color: 'from-orange-500 to-red-500' },
  ]

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component
  const activeTabData = tabs.find(tab => tab.id === activeTab)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <header className="relative z-10 bg-black/20 backdrop-blur-xl border-b border-white/10 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <div className="w-10 sm:w-12 h-10 sm:h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg sm:rounded-xl flex items-center justify-center mr-2 sm:mr-4 shadow-lg flex-shrink-0">
                <span className="text-xl sm:text-2xl">📈</span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
                AI for the Indian Investor
              </h1>
            </div>
            <p className="text-slate-300 text-sm sm:text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
              Transform market data into actionable decisions with cutting-edge AI technology
            </p>
          </motion.div>
        </div>
      </header>

      <nav className="relative z-10 bg-white/5 backdrop-blur-xl border-b border-white/10 shadow-xl overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center sm:justify-center space-x-1 sm:space-x-3 py-4 sm:py-6 overflow-x-auto pb-2 sm:pb-0">
            {tabs.map((tab, index) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex items-center space-x-2 px-3 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg sm:rounded-xl md:rounded-2xl font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 shadow-lg whitespace-nowrap flex-shrink-0 sm:flex-shrink ${
                  activeTab === tab.id
                    ? `bg-gradient-to-r ${tab.color} text-white shadow-2xl`
                    : 'text-slate-300 hover:text-white hover:bg-white/10 border border-white/20'
                }`}
              >
                <span className="text-lg sm:text-xl">{tab.icon}</span>
                <span className="hidden sm:inline md:inline">{tab.name}</span>
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-lg sm:rounded-xl md:rounded-2xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-7xl mx-auto py-6 sm:py-12 px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 shadow-2xl border border-white/10 min-h-[500px] sm:min-h-[600px]"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-6 sm:mb-8"
            >
              <div className="flex items-center space-x-2 sm:space-x-4 mb-4">
                <div className={`w-12 sm:w-14 md:w-16 h-12 sm:h-14 md:h-16 bg-gradient-to-r ${activeTabData?.color} rounded-lg sm:rounded-xl md:rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                  <span className="text-2xl sm:text-3xl">{activeTabData?.icon}</span>
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-1">{activeTabData?.name}</h2>
                  <div className={`h-1 w-16 sm:w-20 bg-gradient-to-r ${activeTabData?.color} rounded-full`}></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="overflow-y-auto"
            >
              {ActiveComponent && <ActiveComponent apiBase={API_BASE} />}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/10 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="text-center text-slate-400">
            <p className="text-xs sm:text-sm">© 2026 AI for the Indian Investor. Built with ❤️ for smart investing.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
