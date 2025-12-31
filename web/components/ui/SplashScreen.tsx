'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SplashScreen({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing INFRA FORGE...')

  useEffect(() => {
    const texts = [
      'Initializing INFRA FORGE...',
      'Loading Smart Contract Engine...',
      'Connecting to Blockchain Networks...',
      'Initializing AI Assistant...',
      'Loading Trading Bot Systems...',
      'Preparing Security Modules...',
      'Establishing Multi-Chain Connections...',
      'Ready to forge your vision...'
    ]

    let currentTextIndex = 0
    const textInterval = setInterval(() => {
      if (currentTextIndex < texts.length - 1) {
        currentTextIndex++
        setLoadingText(texts[currentTextIndex])
      }
    }, 1250) // Cambiado de 800ms a 1250ms para 10 segundos

    // 10 segundos = 10000ms
    // 100 pasos = 100ms por paso
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(textInterval)
          setTimeout(onComplete, 500)
          return 100
        }
        return prev + 1 // Cambiado de +2 a +1 para hacer más lento
      })
    }, 100) // Cambiado de 40ms a 100ms (10 segundos total)

    return () => {
      clearInterval(progressInterval)
      clearInterval(textInterval)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-forge-bg-dark via-forge-bg-medium to-forge-bg-light overflow-hidden"
      >
        {/* Animated particles background */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => {
            // Usar valores seguros para SSR (no depender de window)
            const randomX = Math.random() * 1920 // Max viewport width
            const randomY = Math.random() * 1080 // Max viewport height
            const randomEndY = Math.random() * 1080

            return (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-forge-cyan rounded-full"
                initial={{
                  x: randomX,
                  y: randomY,
                  opacity: 0
                }}
                animate={{
                  y: [null, -100, randomEndY],
                  opacity: [0, 1, 0]
                }}
                transition={{
                  duration: 3 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
              />
            )
          })}
        </div>

        {/* Main content */}
        <div className="relative z-10 text-center px-8">
          {/* Logo animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 20,
              duration: 1
            }}
            className="mb-8"
          >
            <div className="relative">
              {/* Outer glow ring */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
                className="absolute inset-0 bg-gradient-to-r from-forge-cyan via-forge-purple to-forge-gold rounded-full blur-3xl"
              />

              {/* Logo icon */}
              <div className="relative w-32 h-32 mx-auto bg-gradient-to-br from-forge-cyan to-forge-purple rounded-2xl shadow-2xl shadow-forge-cyan/50 flex items-center justify-center">
                <svg
                  className="w-20 h-20 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <motion.path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                  />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-forge-cyan via-forge-purple to-forge-gold bg-clip-text text-transparent">
              INFRA FORGE
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-400 mb-12"
          >
            Smart Contract & Bot Development Platform
          </motion.p>

          {/* Loading bar */}
          <div className="w-80 mx-auto">
            <div className="relative h-2 bg-forge-bg-medium rounded-full overflow-hidden mb-4">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-forge-cyan via-forge-purple to-forge-gold"
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />

              {/* Shine effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                animate={{
                  x: ['-100%', '200%']
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: 'linear'
                }}
              />
            </div>

            {/* Progress text */}
            <motion.p
              key={loadingText}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-sm text-forge-cyan font-mono"
            >
              {loadingText}
            </motion.p>

            {/* Progress percentage */}
            <p className="text-xs text-gray-500 mt-2 font-mono">
              {progress}%
            </p>
          </div>

          {/* Company info */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-16 text-xs text-gray-600"
          >
            <p>Powered by INFRA Group & Nardiha Holdings</p>
          </motion.div>
        </div>

        {/* Corner decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-gradient-to-br from-forge-cyan/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-gradient-to-tl from-forge-purple/10 to-transparent rounded-full blur-3xl" />
      </motion.div>
    </AnimatePresence>
  )
}
