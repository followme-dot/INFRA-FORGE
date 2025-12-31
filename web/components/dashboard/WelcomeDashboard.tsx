'use client'

import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import {
  Zap,
  Bot,
  FileCode,
  Shield,
  Rocket,
  Users,
  TrendingUp,
  Lock,
  Wallet,
  Activity
} from 'lucide-react'
import { useState } from 'react'

interface WelcomeDashboardProps {
  user: {
    name: string
    role: 'admin' | 'developer' | 'analyst'
    avatar?: string
    projects: number
    lastLogin?: string
  }
}

export default function WelcomeDashboard({ user }: WelcomeDashboardProps) {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState<string | null>(null)

  const quickActions = [
    {
      icon: FileCode,
      title: 'Smart Contracts',
      description: 'Create ERC-20, ERC-721, DeFi protocols',
      color: 'from-forge-cyan to-blue-500',
      action: '/contracts',
      badge: 'AI Powered'
    },
    {
      icon: Bot,
      title: 'Trading Bots',
      description: 'Deploy automated trading strategies',
      color: 'from-forge-purple to-purple-500',
      action: '/bots',
      badge: 'New'
    },
    {
      icon: Shield,
      title: 'Security Audit',
      description: 'AI-powered smart contract analysis',
      color: 'from-forge-gold to-yellow-500',
      action: '/audits',
      badge: 'Essential'
    },
    {
      icon: Rocket,
      title: 'Deploy',
      description: 'Multi-chain deployment in seconds',
      color: 'from-forge-emerald to-green-500',
      action: '/deployments'
    }
  ]

  const ecosystemProjects = [
    {
      name: 'INFRA VAULT',
      description: 'Decentralized Asset Management',
      status: 'active',
      icon: Lock,
      color: 'bg-blue-500/20 text-blue-400'
    },
    {
      name: 'NARDIUM',
      description: 'DApp Ecosystem Platform',
      status: 'active',
      icon: Wallet,
      color: 'bg-purple-500/20 text-purple-400'
    },
    {
      name: 'Custom Projects',
      description: 'Client-specific solutions',
      status: 'development',
      icon: Activity,
      color: 'bg-cyan-500/20 text-cyan-400'
    }
  ]

  const recentActivity = [
    { action: 'Deployed', target: 'ERC-20 Token', time: '2 hours ago', status: 'success' },
    { action: 'Created', target: 'Grid Trading Bot', time: '5 hours ago', status: 'success' },
    { action: 'Audited', target: 'Staking Contract', time: '1 day ago', status: 'warning' }
  ]

  return (
    <div className="min-h-screen bg-forge-bg-dark p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome back, <span className="bg-gradient-to-r from-forge-cyan to-forge-purple bg-clip-text text-transparent">{user.name}</span>
            </h1>
            <p className="text-gray-400">
              {user.role === 'admin' ? 'Administrator' : user.role === 'developer' ? 'Developer' : 'Analyst'} • {user.projects} active projects
            </p>
          </div>

          {/* User badge */}
          <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-forge-cyan/10 to-forge-purple/10 border border-forge-cyan/20 rounded-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-forge-cyan to-forge-purple rounded-full flex items-center justify-center text-xl font-bold">
              {user.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs text-gray-500">Last login: {user.lastLogin || 'Just now'}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Quick Actions Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <Zap className="text-forge-cyan" />
          Quick Actions
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push(action.action)}
              className="group relative p-6 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-cyan-500/50 transition-all overflow-hidden cursor-pointer"
            >
              {/* Gradient background on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${action.color} opacity-0 group-hover:opacity-10 transition-opacity`} />

              {/* Badge */}
              {action.badge && (
                <div className="absolute top-4 right-4 px-2 py-1 bg-forge-cyan/20 text-forge-cyan text-xs font-semibold rounded-full">
                  {action.badge}
                </div>
              )}

              {/* Icon */}
              <div className={`w-14 h-14 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <action.icon className="text-white" size={28} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-semibold mb-2 text-left">{action.title}</h3>
              <p className="text-sm text-gray-400 text-left">{action.description}</p>

              {/* Arrow icon */}
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <svg className="w-5 h-5 text-forge-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Ecosystem Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Users className="text-forge-purple" />
            Ecosystem Projects
          </h2>

          <div className="space-y-4">
            {ecosystemProjects.map((project, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.02 }}
                onClick={() => router.push('/projects?name=' + encodeURIComponent(project.name))}
                className="p-6 bg-gray-800/50 border border-gray-700 rounded-xl hover:border-purple-500/50 transition-all cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 ${project.color} rounded-xl flex items-center justify-center`}>
                      <project.icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{project.name}</h3>
                      <p className="text-sm text-gray-400">{project.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      project.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {project.status}
                    </span>
                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <TrendingUp className="text-forge-gold" />
            Recent Activity
          </h2>

          <div className="p-6 bg-forge-bg-medium border border-forge-border rounded-xl">
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 pb-4 border-b border-forge-border last:border-0 last:pb-0">
                  <div className={`w-2 h-2 mt-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-400' : 'bg-yellow-400'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-semibold">{activity.action}</span> {activity.target}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => router.push('/analytics')}
              className="w-full mt-4 py-2 text-sm text-forge-cyan hover:text-forge-cyan/80 transition-colors"
            >
              View all activity →
            </button>
          </div>
        </motion.div>
      </div>

      {/* Stats Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {[
          { label: 'Smart Contracts', value: '12', change: '+3 this week', color: 'text-forge-cyan' },
          { label: 'Active Bots', value: '5', change: '+2 deployed', color: 'text-forge-purple' },
          { label: 'Security Scans', value: '28', change: 'All passed', color: 'text-forge-gold' },
          { label: 'Deployments', value: '45', change: '8 networks', color: 'text-forge-emerald' }
        ].map((stat, index) => (
          <div key={index} className="p-6 bg-forge-bg-medium border border-forge-border rounded-xl">
            <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color} mb-1`}>{stat.value}</p>
            <p className="text-xs text-gray-500">{stat.change}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
