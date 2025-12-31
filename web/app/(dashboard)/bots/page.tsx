'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Bot,
  TrendingUp,
  BarChart3,
  Settings,
  Play,
  Pause,
  Trash2,
  Plus,
  DollarSign,
  Activity,
  Zap,
  Target
} from 'lucide-react'

interface TradingBot {
  id: string
  name: string
  type: 'grid' | 'dca' | 'arbitrage' | 'market-making'
  status: 'active' | 'paused' | 'stopped'
  profit: number
  trades: number
  created: string
  exchange: string
}

export default function BotsPage() {
  const [bots, setBots] = useState<TradingBot[]>([
    {
      id: '1',
      name: 'BTC Grid Bot',
      type: 'grid',
      status: 'active',
      profit: 1250.50,
      trades: 142,
      created: '2024-01-15',
      exchange: 'Binance'
    },
    {
      id: '2',
      name: 'ETH DCA Strategy',
      type: 'dca',
      status: 'active',
      profit: 850.30,
      trades: 89,
      created: '2024-01-10',
      exchange: 'Bybit'
    }
  ])

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showSettingsModal, setShowSettingsModal] = useState<string | null>(null)

  const handleToggleBotStatus = (botId: string) => {
    setBots(bots.map(bot => {
      if (bot.id === botId) {
        const newStatus = bot.status === 'active' ? 'paused' : 'active'
        return { ...bot, status: newStatus }
      }
      return bot
    }))
  }

  const handleDeleteBot = (botId: string) => {
    if (confirm('¿Estás seguro de eliminar este bot?')) {
      setBots(bots.filter(bot => bot.id !== botId))
    }
  }

  const handleOpenSettings = (botId: string) => {
    setShowSettingsModal(botId)
  }

  const botTypes = [
    {
      type: 'grid',
      name: 'Grid Trading',
      description: 'Buy low, sell high in a range',
      icon: BarChart3,
      color: 'from-blue-500 to-cyan-500',
      recommended: true
    },
    {
      type: 'dca',
      name: 'DCA (Dollar Cost Average)',
      description: 'Systematic buying at intervals',
      icon: TrendingUp,
      color: 'from-green-500 to-emerald-500'
    },
    {
      type: 'arbitrage',
      name: 'Arbitrage',
      description: 'Profit from price differences',
      icon: Zap,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      type: 'market-making',
      name: 'Market Making',
      description: 'Provide liquidity and earn spreads',
      icon: Target,
      color: 'from-purple-500 to-pink-500'
    }
  ]

  const getStatusColor = (status: TradingBot['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400'
      case 'paused':
        return 'bg-yellow-500/20 text-yellow-400'
      case 'stopped':
        return 'bg-red-500/20 text-red-400'
    }
  }

  return (
    <div className="min-h-screen bg-forge-bg-dark p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Bot className="text-forge-purple" />
            <span className="bg-gradient-to-r from-forge-cyan to-forge-purple bg-clip-text text-transparent">
              Trading Bots
            </span>
          </h1>
          <p className="text-gray-400">Automated trading strategies powered by AI</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCreateModal(true)}
          className="px-6 py-3 bg-gradient-to-r from-forge-cyan to-forge-purple text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-forge-cyan/50 transition-all flex items-center gap-2"
        >
          <Plus size={20} />
          Create New Bot
        </motion.button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="p-6 bg-forge-bg-medium border border-forge-border rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <Activity className="text-green-400" size={20} />
            </div>
            <p className="text-sm text-gray-400">Active Bots</p>
          </div>
          <p className="text-3xl font-bold text-green-400">{bots.filter(b => b.status === 'active').length}</p>
        </div>

        <div className="p-6 bg-forge-bg-medium border border-forge-border rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-forge-cyan/20 rounded-lg flex items-center justify-center">
              <DollarSign className="text-forge-cyan" size={20} />
            </div>
            <p className="text-sm text-gray-400">Total Profit</p>
          </div>
          <p className="text-3xl font-bold text-forge-cyan">
            ${bots.reduce((sum, bot) => sum + bot.profit, 0).toFixed(2)}
          </p>
        </div>

        <div className="p-6 bg-forge-bg-medium border border-forge-border rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-forge-purple/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-forge-purple" size={20} />
            </div>
            <p className="text-sm text-gray-400">Total Trades</p>
          </div>
          <p className="text-3xl font-bold text-forge-purple">
            {bots.reduce((sum, bot) => sum + bot.trades, 0)}
          </p>
        </div>

        <div className="p-6 bg-forge-bg-medium border border-forge-border rounded-xl">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-forge-gold/20 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-forge-gold" size={20} />
            </div>
            <p className="text-sm text-gray-400">Win Rate</p>
          </div>
          <p className="text-3xl font-bold text-forge-gold">67.8%</p>
        </div>
      </div>

      {/* Active Bots List */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-6">Your Bots</h2>
        <div className="space-y-4">
          {bots.map((bot) => (
            <motion.div
              key={bot.id}
              whileHover={{ scale: 1.01 }}
              className="p-6 bg-forge-bg-medium border border-forge-border rounded-xl hover:border-forge-cyan/50 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-forge-cyan to-forge-purple rounded-xl flex items-center justify-center">
                    <Bot className="text-white" size={28} />
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-lg font-semibold">{bot.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bot.status)}`}>
                        {bot.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400">
                      {bot.type.toUpperCase()} • {bot.exchange} • Created {bot.created}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Profit</p>
                    <p className={`text-xl font-bold ${bot.profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      ${bot.profit.toFixed(2)}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-400">Trades</p>
                    <p className="text-xl font-bold text-white">{bot.trades}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <motion.button
                      onClick={() => handleToggleBotStatus(bot.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-forge-bg-dark border border-forge-border rounded-lg hover:border-forge-cyan/50 transition-all"
                      title={bot.status === 'active' ? 'Pause Bot' : 'Start Bot'}
                    >
                      {bot.status === 'active' ? (
                        <Pause size={20} className="text-yellow-400" />
                      ) : (
                        <Play size={20} className="text-green-400" />
                      )}
                    </motion.button>
                    <motion.button
                      onClick={() => handleOpenSettings(bot.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-forge-bg-dark border border-forge-border rounded-lg hover:border-forge-purple/50 transition-all"
                      title="Bot Settings"
                    >
                      <Settings size={20} className="text-gray-400" />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDeleteBot(bot.id)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-2 bg-forge-bg-dark border border-forge-border rounded-lg hover:border-red-500/50 transition-all"
                      title="Delete Bot"
                    >
                      <Trash2 size={20} className="text-gray-400 hover:text-red-400" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bot Types Gallery */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Available Bot Types</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {botTypes.map((botType, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCreateModal(true)}
              className="group relative p-6 bg-forge-bg-medium border border-forge-border rounded-xl hover:border-forge-cyan/50 transition-all overflow-hidden text-left"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${botType.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              {/* Recommended badge */}
              {botType.recommended && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-forge-gold/20 text-forge-gold text-xs font-semibold rounded-full">
                  Recommended
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${botType.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <botType.icon className="text-white" size={28} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2">{botType.name}</h3>
              <p className="text-sm text-gray-400">{botType.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Create Bot Modal (placeholder) */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-forge-bg-medium border border-forge-border rounded-2xl p-8 max-w-2xl w-full mx-4"
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-bold">Create New Trading Bot</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-gray-400 mb-6">
              Configure your automated trading strategy. Claude AI will help optimize your parameters.
            </p>
            <button
              onClick={() => setShowCreateModal(false)}
              className="px-6 py-3 bg-gradient-to-r from-forge-cyan to-forge-purple text-white font-semibold rounded-xl"
            >
              Coming Soon - AI-Powered Bot Builder
            </button>
          </motion.div>
        </div>
      )}

      {/* Bot Settings Modal */}
      {showSettingsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-forge-bg-medium border border-forge-border rounded-2xl p-8 max-w-2xl w-full mx-4"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold">Bot Settings</h2>
              <button
                onClick={() => setShowSettingsModal(null)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {(() => {
              const bot = bots.find(b => b.id === showSettingsModal)
              if (!bot) return null

              return (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Bot Name</label>
                    <input
                      type="text"
                      value={bot.name}
                      disabled
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-400"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Type</label>
                      <input
                        type="text"
                        value={bot.type.toUpperCase()}
                        disabled
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Exchange</label>
                      <input
                        type="text"
                        value={bot.exchange}
                        disabled
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Total Profit</label>
                      <input
                        type="text"
                        value={`$${bot.profit.toFixed(2)}`}
                        disabled
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-green-400 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Total Trades</label>
                      <input
                        type="text"
                        value={bot.trades}
                        disabled
                        className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-400"
                      />
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-sm text-gray-400 mb-4">
                      Advanced configuration coming soon. For now, you can start/pause or delete this bot.
                    </p>
                    <motion.button
                      onClick={() => setShowSettingsModal(null)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-4 py-3 bg-gray-700 text-white font-semibold rounded-xl hover:bg-gray-600 transition-colors"
                    >
                      Close
                    </motion.button>
                  </div>
                </div>
              )
            })()}
          </motion.div>
        </div>
      )}
    </div>
  )
}
