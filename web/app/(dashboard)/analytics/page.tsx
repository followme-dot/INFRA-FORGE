'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Activity,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react'

interface LiveMetric {
  label: string
  value: string | number
  change: number
  trend: 'up' | 'down' | 'neutral'
  icon: any
  color: string
}

interface LiveTrade {
  id: string
  bot_name: string
  pair: string
  type: 'buy' | 'sell'
  price: number
  amount: number
  profit: number
  timestamp: string
}

export default function AnalyticsPage() {
  const [metrics, setMetrics] = useState<LiveMetric[]>([
    {
      label: 'Total Profit (24h)',
      value: '$0.00',
      change: 0,
      trend: 'neutral',
      icon: DollarSign,
      color: 'text-green-400'
    },
    {
      label: 'Active Trades',
      value: 0,
      change: 0,
      trend: 'neutral',
      icon: Activity,
      color: 'text-forge-cyan'
    },
    {
      label: 'Win Rate',
      value: '0%',
      change: 0,
      trend: 'neutral',
      icon: TrendingUp,
      color: 'text-forge-purple'
    },
    {
      label: 'Total Volume',
      value: '$0',
      change: 0,
      trend: 'neutral',
      icon: Zap,
      color: 'text-forge-gold'
    }
  ])

  const [liveTrades, setLiveTrades] = useState<LiveTrade[]>([])
  const [wsStatus, setWsStatus] = useState<'connecting' | 'connected' | 'disconnected'>('connecting')

  useEffect(() => {
    // Simular conexión WebSocket
    // En producción: const ws = new WebSocket('ws://localhost:8000/ws/analytics')

    setWsStatus('connected')

    // Simular actualizaciones en tiempo real
    const interval = setInterval(() => {
      // Actualizar métricas
      setMetrics(prev => prev.map(metric => {
        const randomChange = (Math.random() - 0.5) * 10
        const newValue =
          metric.label.includes('Profit') ? `$${(Math.random() * 5000).toFixed(2)}` :
          metric.label.includes('Rate') ? `${(60 + Math.random() * 20).toFixed(1)}%` :
          metric.label.includes('Volume') ? `$${(Math.random() * 50000).toFixed(0)}` :
          Math.floor(Math.random() * 20)

        return {
          ...metric,
          value: newValue,
          change: randomChange,
          trend: randomChange > 0 ? 'up' : randomChange < 0 ? 'down' : 'neutral'
        }
      }))

      // Agregar nuevo trade simulado
      if (Math.random() > 0.7) {
        const newTrade: LiveTrade = {
          id: Date.now().toString(),
          bot_name: ['BTC Grid Bot', 'ETH DCA Bot', 'ARB Bot #1'][Math.floor(Math.random() * 3)],
          pair: ['BTC/USDT', 'ETH/USDT', 'BNB/USDT'][Math.floor(Math.random() * 3)],
          type: Math.random() > 0.5 ? 'buy' : 'sell',
          price: 40000 + Math.random() * 10000,
          amount: Math.random() * 0.1,
          profit: (Math.random() - 0.5) * 100,
          timestamp: new Date().toISOString()
        }

        setLiveTrades(prev => [newTrade, ...prev.slice(0, 19)]) // Keep last 20 trades
      }
    }, 3000) // Update every 3 seconds

    return () => {
      clearInterval(interval)
      // ws.close()
    }
  }, [])

  return (
    <div className="min-h-screen bg-forge-bg-dark p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2 flex items-center gap-3">
            <Activity className="text-forge-cyan" />
            <span className="bg-gradient-to-r from-forge-cyan to-forge-purple bg-clip-text text-transparent">
              Live Analytics
            </span>
          </h1>
          <p className="text-gray-400">Real-time trading performance monitoring</p>
        </div>

        {/* WebSocket Status */}
        <div className="flex items-center gap-2 px-4 py-2 bg-forge-bg-medium border border-forge-border rounded-xl">
          <div className={`w-2 h-2 rounded-full ${
            wsStatus === 'connected' ? 'bg-green-400 animate-pulse' :
            wsStatus === 'connecting' ? 'bg-yellow-400 animate-pulse' :
            'bg-red-400'
          }`} />
          <span className="text-sm text-gray-400">
            {wsStatus === 'connected' ? 'Live' : wsStatus === 'connecting' ? 'Connecting...' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Live Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-forge-bg-medium border border-forge-border rounded-xl relative overflow-hidden"
          >
            {/* Animated background */}
            <motion.div
              className={`absolute inset-0 ${
                metric.trend === 'up' ? 'bg-green-500/5' :
                metric.trend === 'down' ? 'bg-red-500/5' : 'bg-gray-500/5'
              }`}
              animate={{ opacity: [0.5, 0.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={metric.color} size={24} />
                {metric.trend !== 'neutral' && (
                  <div className={`flex items-center gap-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    <span>{Math.abs(metric.change).toFixed(1)}%</span>
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-400 mb-2">{metric.label}</p>
              <p className="text-3xl font-bold">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Live Trading Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Trades */}
        <div className="lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold">Live Trade Feed</h2>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock size={16} />
              <span>Last update: {new Date().toLocaleTimeString()}</span>
            </div>
          </div>

          <div className="bg-forge-bg-medium border border-forge-border rounded-xl overflow-hidden">
            <div className="max-h-[600px] overflow-y-auto">
              {liveTrades.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  <Activity size={48} className="mx-auto mb-4 opacity-20" />
                  <p>Waiting for live trades...</p>
                </div>
              ) : (
                <div className="divide-y divide-forge-border">
                  {liveTrades.map((trade) => (
                    <motion.div
                      key={trade.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 hover:bg-forge-bg-light transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className={`w-2 h-2 rounded-full ${
                            trade.type === 'buy' ? 'bg-green-400' : 'bg-red-400'
                          }`} />

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{trade.pair}</span>
                              <span className={`px-2 py-0.5 rounded text-xs ${
                                trade.type === 'buy'
                                  ? 'bg-green-500/20 text-green-400'
                                  : 'bg-red-500/20 text-red-400'
                              }`}>
                                {trade.type.toUpperCase()}
                              </span>
                            </div>
                            <p className="text-xs text-gray-500">{trade.bot_name}</p>
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-mono">${trade.price.toFixed(2)}</p>
                          <p className={`text-xs ${
                            trade.profit >= 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {trade.profit >= 0 ? '+' : ''}{trade.profit.toFixed(2)} USDT
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Status */}
        <div>
          <h2 className="text-2xl font-bold mb-4">System Status</h2>

          <div className="space-y-4">
            {/* API Status */}
            <div className="p-4 bg-forge-bg-medium border border-forge-border rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">API Server</span>
                <CheckCircle className="text-green-400" size={20} />
              </div>
              <p className="text-xs text-gray-500">Response time: 45ms</p>
            </div>

            {/* WebSocket Status */}
            <div className="p-4 bg-forge-bg-medium border border-forge-border rounded-xl">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">WebSocket</span>
                <CheckCircle className="text-green-400" size={20} />
              </div>
              <p className="text-xs text-gray-500">Connected • {liveTrades.length} events</p>
            </div>

            {/* Exchange Connections */}
            <div className="p-4 bg-forge-bg-medium border border-forge-border rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Exchange Connections</span>
                <span className="text-xs text-gray-500">3 active</span>
              </div>

              <div className="space-y-2">
                {['Binance', 'Bybit', 'OKX'].map((exchange) => (
                  <div key={exchange} className="flex items-center justify-between text-xs">
                    <span className="text-gray-400">{exchange}</span>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full" />
                      <span className="text-green-400">Online</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Active Bots */}
            <div className="p-4 bg-forge-bg-medium border border-forge-border rounded-xl">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold">Active Bots</span>
                <span className="text-xs text-forge-cyan">2 running</span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">BTC Grid Bot</span>
                  <span className="text-green-400">+$45.20</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-400">ETH DCA Bot</span>
                  <span className="text-green-400">+$23.10</span>
                </div>
              </div>
            </div>

            {/* Alerts */}
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-xl">
              <div className="flex items-start gap-3">
                <AlertCircle className="text-yellow-400 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-sm font-semibold text-yellow-400 mb-1">Market Volatility</p>
                  <p className="text-xs text-gray-400">
                    BTC showing high volatility. Grid bot adjusted ranges.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
