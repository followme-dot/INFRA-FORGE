'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { FileCode, Plus, Search } from 'lucide-react'

export default function ContractsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="h-full p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-forge-text-primary">
              My Contracts
            </h1>
            <p className="text-forge-text-secondary text-sm mt-1">
              Manage and deploy your smart contracts
            </p>
          </div>

          <motion.button
            onClick={() => router.push('/chat?action=create-contract')}
            className="btn-forge-solid flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Plus className="w-5 h-5" />
            New Contract
          </motion.button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-forge-text-muted" />
          <input
            type="text"
            placeholder="Search contracts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl bg-forge-bg-tertiary/50 border border-forge-accent-cyan/10 focus:border-forge-accent-cyan/30 focus:outline-none text-forge-text-primary placeholder-forge-text-muted"
          />
        </div>

        {/* Empty State */}
        <motion.div
          className="flex flex-col items-center justify-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-forge-accent-cyan/20 to-forge-accent-purple/20 flex items-center justify-center mb-4">
            <FileCode className="w-10 h-10 text-forge-accent-cyan" />
          </div>
          <h3 className="text-xl font-semibold text-forge-text-primary mb-2">
            No contracts yet
          </h3>
          <p className="text-forge-text-secondary max-w-md text-center mb-6">
            Create your first smart contract using our AI assistant or choose from our template library.
          </p>
          <div className="flex gap-3">
            <motion.button
              onClick={() => router.push('/chat?action=create-contract&mode=ai')}
              className="btn-forge-solid"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start with AI
            </motion.button>
            <motion.button
              onClick={() => router.push('/templates')}
              className="btn-forge"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Templates
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
