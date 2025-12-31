'use client'

import { motion } from 'framer-motion'
import { Rocket } from 'lucide-react'

export default function DeploymentsPage() {
  return (
    <div className="h-full p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-forge-text-primary">
            Deployments
          </h1>
          <p className="text-forge-text-secondary text-sm mt-1">
            Manage your deployed contracts across chains
          </p>
        </div>

        <motion.div
          className="flex flex-col items-center justify-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-forge-accent-cyan/20 to-forge-accent-purple/20 flex items-center justify-center mb-4">
            <Rocket className="w-10 h-10 text-forge-accent-cyan" />
          </div>
          <h3 className="text-xl font-semibold text-forge-text-primary mb-2">
            No deployments yet
          </h3>
          <p className="text-forge-text-secondary max-w-md text-center">
            Deploy your contracts to Ethereum, BSC, Polygon, and more
          </p>
        </motion.div>
      </div>
    </div>
  )
}
