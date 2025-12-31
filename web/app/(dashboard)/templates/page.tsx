'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { LayoutTemplate, Code, Shield } from 'lucide-react'

const templates = [
  {
    id: 'erc20',
    name: 'ERC-20 Token',
    description: 'Standard fungible token with mint, burn, and pause',
    category: 'Tokens',
    securityScore: 95,
  },
  {
    id: 'erc721',
    name: 'ERC-721 NFT',
    description: 'NFT collection with royalties and metadata',
    category: 'NFT',
    securityScore: 98,
  },
  {
    id: 'vesting',
    name: 'Token Vesting',
    description: 'Linear vesting with cliff period',
    category: 'DeFi',
    securityScore: 92,
  },
]

export default function TemplatesPage() {
  const router = useRouter()

  const handleUseTemplate = (templateId: string) => {
    router.push(`/chat?template=${templateId}`)
  }

  return (
    <div className="h-full p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-forge-text-primary">
            Contract Templates
          </h1>
          <p className="text-forge-text-secondary text-sm mt-1">
            Production-ready, audited smart contract templates
          </p>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {templates.map((template, index) => (
            <motion.div
              key={template.id}
              onClick={() => handleUseTemplate(template.id)}
              className="glass-card p-6 hover:border-forge-accent-cyan/30 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forge-accent-cyan/20 to-forge-accent-purple/20 flex items-center justify-center">
                  <Code className="w-6 h-6 text-forge-accent-cyan" />
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-forge-accent-emerald" />
                  <span className="text-sm font-semibold text-forge-accent-emerald">
                    {template.securityScore}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-forge-text-primary mb-2">
                {template.name}
              </h3>
              <p className="text-forge-text-secondary text-sm mb-4">
                {template.description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs px-3 py-1 rounded-full bg-forge-bg-tertiary text-forge-text-secondary">
                  {template.category}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    handleUseTemplate(template.id)
                  }}
                  className="text-sm text-forge-accent-cyan hover:text-forge-accent-cyan/80"
                >
                  Use Template →
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
