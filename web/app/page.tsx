'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SplashScreen from '@/components/ui/SplashScreen'

export default function HomePage() {
  const [showSplash, setShowSplash] = useState(true)
  const router = useRouter()

  const handleSplashComplete = () => {
    setShowSplash(false)
    // Redirect to login
    setTimeout(() => {
      router.push('/login')
    }, 300)
  }

  return (
    <>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
    </>
  )
}
