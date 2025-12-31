'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Settings as SettingsIcon, User, Key, Bell, Palette, LogOut, X, Save } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AuthAPI, TokenManager } from '@/lib/api'

export default function SettingsPage() {
  const router = useRouter()
  const [selectedSetting, setSelectedSetting] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState({
    name: 'Admin User',
    email: 'admin@infragroup.com',
    role: 'Administrator'
  })

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      AuthAPI.logout()
      router.push('/login')
    }
  }

  const handleSettingClick = (title: string) => {
    setSelectedSetting(title)
  }

  const handleSaveProfile = () => {
    // Save profile changes (would connect to API)
    alert('Profile settings saved successfully!')
    setSelectedSetting(null)
  }

  const settingsItems = [
    { icon: User, title: 'Profile', description: 'Manage your account information' },
    { icon: Key, title: 'API Keys', description: 'Manage blockchain RPC keys' },
    { icon: Bell, title: 'Notifications', description: 'Configure notification preferences' },
    { icon: Palette, title: 'Appearance', description: 'Customize the interface' },
  ]

  return (
    <div className="h-full p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-forge-text-primary">
              Settings
            </h1>
            <p className="text-forge-text-secondary text-sm mt-1">
              Manage your account and preferences
            </p>
          </div>

          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 hover:bg-red-500/20 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </motion.button>
        </div>

        <div className="space-y-4">
          {settingsItems.map((item, index) => (
            <motion.div
              key={item.title}
              onClick={() => handleSettingClick(item.title)}
              className="glass-card p-6 hover:border-forge-accent-cyan/30 transition-all cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 4 }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-forge-accent-cyan/20 to-forge-accent-purple/20 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-forge-accent-cyan" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-forge-text-primary">{item.title}</h3>
                  <p className="text-sm text-forge-text-secondary">{item.description}</p>
                </div>
                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Settings Modal */}
      <AnimatePresence>
        {selectedSetting && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-gray-800 border border-gray-700 rounded-2xl p-8 max-w-2xl w-full mx-4"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">{selectedSetting}</h2>
                <button
                  onClick={() => setSelectedSetting(null)}
                  className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {selectedSetting === 'Profile' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      value={userProfile.name}
                      onChange={(e) => setUserProfile({...userProfile, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      value={userProfile.email}
                      onChange={(e) => setUserProfile({...userProfile, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20 outline-none transition-all text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Role</label>
                    <input
                      type="text"
                      value={userProfile.role}
                      disabled
                      className="w-full px-4 py-3 bg-gray-900/80 border border-gray-700 rounded-xl text-gray-400"
                    />
                  </div>
                  <motion.button
                    onClick={handleSaveProfile}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-cyan-500/50 transition-all flex items-center justify-center gap-2"
                  >
                    <Save size={20} />
                    Save Changes
                  </motion.button>
                </div>
              )}

              {selectedSetting !== 'Profile' && (
                <div className="text-center py-8">
                  <p className="text-gray-400 mb-4">
                    {selectedSetting} settings coming soon...
                  </p>
                  <motion.button
                    onClick={() => setSelectedSetting(null)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-6 py-2 bg-gray-700 text-white rounded-xl hover:bg-gray-600 transition-colors"
                  >
                    Close
                  </motion.button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
