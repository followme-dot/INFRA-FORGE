'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  MessageSquare,
  FileCode,
  Shield,
  Rocket,
  LayoutTemplate,
  Settings,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react'

const navItems = [
  { href: '/chat', icon: MessageSquare, label: 'AI Chat', description: 'Forge with AI' },
  { href: '/contracts', icon: FileCode, label: 'Contracts', description: 'Your contracts' },
  { href: '/audits', icon: Shield, label: 'Security', description: 'Audit reports' },
  { href: '/deployments', icon: Rocket, label: 'Deploy', description: 'Launch contracts' },
  { href: '/templates', icon: LayoutTemplate, label: 'Templates', description: 'Pre-built contracts' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(false)

  return (
    <motion.aside
      className="relative h-screen flex flex-col glass-card border-r border-forge-accent-cyan/10"
      animate={{ width: collapsed ? 80 : 280 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forge-accent-cyan to-forge-accent-purple flex items-center justify-center">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-forge-accent-cyan to-forge-accent-purple blur-lg opacity-50" />
        </div>
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <h1 className="font-bold text-lg">
              <span className="text-gradient">INFRA</span>
              <span className="text-forge-text-primary"> FORGE</span>
            </h1>
          </motion.div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href)
          const Icon = item.icon

          return (
            <Link key={item.href} href={item.href}>
              <motion.div
                className={`
                  relative flex items-center gap-3 px-4 py-3 rounded-xl
                  transition-all duration-300 cursor-pointer group
                  ${isActive
                    ? 'bg-gradient-to-r from-forge-accent-cyan/20 to-forge-accent-purple/20 text-forge-text-primary'
                    : 'text-forge-text-secondary hover:text-forge-text-primary hover:bg-forge-bg-tertiary/50'
                  }
                `}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Active indicator */}
                {isActive && (
                  <motion.div
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-gradient-to-b from-forge-accent-cyan to-forge-accent-purple"
                    layoutId="activeIndicator"
                  />
                )}

                <Icon className={`w-5 h-5 ${isActive ? 'text-forge-accent-cyan' : ''}`} />

                {!collapsed && (
                  <motion.div
                    className="flex flex-col"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <span className="font-medium text-sm">{item.label}</span>
                    <span className="text-xs text-forge-text-muted">{item.description}</span>
                  </motion.div>
                )}

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-forge-accent-cyan/5 to-forge-accent-purple/5" />
              </motion.div>
            </Link>
          )
        })}
      </nav>

      {/* Settings & Collapse */}
      <div className="p-3 border-t border-forge-accent-cyan/10">
        <Link href="/settings">
          <motion.div
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-forge-text-secondary hover:text-forge-text-primary hover:bg-forge-bg-tertiary/50 transition-all"
            whileHover={{ x: 4 }}
          >
            <Settings className="w-5 h-5" />
            {!collapsed && <span className="font-medium text-sm">Settings</span>}
          </motion.div>
        </Link>

        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full mt-2 flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-forge-text-muted hover:text-forge-text-secondary transition-all"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </motion.aside>
  )
}
