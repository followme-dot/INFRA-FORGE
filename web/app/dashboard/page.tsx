'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import WelcomeDashboard from '@/components/dashboard/WelcomeDashboard'
import { AuthAPI, TokenManager } from '@/lib/api'

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)

  useEffect(() => {
    // Verificar autenticación
    if (!AuthAPI.isAuthenticated()) {
      router.push('/login')
      return
    }

    // Obtener datos del usuario
    const userData = TokenManager.getUser()
    if (userData) {
      setUser({
        name: userData.name,
        role: userData.role,
        projects: 8, // Mock por ahora
        lastLogin: 'Today at ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      })
    }
  }, [router])

  if (!user) {
    return (
      <div className="min-h-screen bg-forge-bg-dark flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-forge-cyan border-t-transparent rounded-full mx-auto mb-4" />
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  return <WelcomeDashboard user={user} />
}
