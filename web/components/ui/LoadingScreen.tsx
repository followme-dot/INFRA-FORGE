'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  delay: number
}

export function LoadingScreen({ onComplete }: { onComplete?: () => void }) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'particles' | 'forge' | 'reveal'>('particles')
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 2,
    }))
    setParticles(newParticles)

    // Progress simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + Math.random() * 3
      })
    }, 50)

    // Phase transitions
    setTimeout(() => setPhase('forge'), 1500)
    setTimeout(() => setPhase('reveal'), 3000)
    setTimeout(() => onComplete?.(), 4000)

    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-forge-bg-primary"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Ambient Background */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Gradient Orbs */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%)',
              left: '20%',
              top: '30%',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute w-[500px] h-[500px] rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
              right: '20%',
              bottom: '30%',
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          />
        </div>

        {/* Particles converging to center */}
        {phase === 'particles' && particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full bg-forge-accent-cyan"
            style={{
              width: particle.size,
              height: particle.size,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              x: `calc(50vw - ${particle.x}vw)`,
              y: `calc(50vh - ${particle.y}vh)`,
            }}
            transition={{
              duration: 2,
              delay: particle.delay,
              ease: 'easeInOut',
            }}
          />
        ))}

        {/* Forge Logo Animation */}
        <motion.div
          className="relative z-10 flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{
            opacity: phase !== 'particles' ? 1 : 0,
            scale: phase !== 'particles' ? 1 : 0.5
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          {/* Logo SVG */}
          <div className="relative">
            {/* Glow Effect */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 212, 255, 0.4) 0%, rgba(124, 58, 237, 0.4) 100%)',
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.1, 0.8],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Main Logo */}
            <svg
              width="120"
              height="120"
              viewBox="0 0 120 120"
              className="relative z-10"
            >
              {/* Anvil/Forge shape */}
              <motion.path
                d="M60 10 L90 40 L90 80 L60 110 L30 80 L30 40 Z"
                fill="none"
                stroke="url(#gradient)"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.path
                d="M45 50 L60 35 L75 50 L75 70 L60 85 L45 70 Z"
                fill="url(#gradient)"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00d4ff" />
                  <stop offset="50%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
            </svg>

            {/* Sparks */}
            {phase === 'forge' && Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-forge-accent-gold rounded-full"
                style={{
                  left: '50%',
                  top: '50%',
                  boxShadow: '0 0 8px rgba(245, 158, 11, 0.8)',
                }}
                initial={{ opacity: 1, scale: 1 }}
                animate={{
                  opacity: 0,
                  scale: 0,
                  x: Math.cos((i * Math.PI * 2) / 8) * 100,
                  y: Math.sin((i * Math.PI * 2) / 8) * 100,
                }}
                transition={{
                  duration: 1,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                }}
              />
            ))}
          </div>

          {/* Brand Name */}
          <motion.div
            className="mt-8 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <h1 className="text-4xl font-bold tracking-wider">
              <span className="text-gradient">INFRA</span>
              <span className="text-forge-text-primary ml-2">FORGE</span>
            </h1>
            <p className="mt-2 text-forge-text-secondary text-sm tracking-widest">
              WHERE SMART CONTRACTS ARE BORN
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            className="mt-8 w-64 h-1 bg-forge-bg-tertiary rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #00d4ff 0%, #7c3aed 50%, #00d4ff 100%)',
                backgroundSize: '200% 100%',
              }}
              initial={{ width: '0%' }}
              animate={{
                width: `${Math.min(progress, 100)}%`,
                backgroundPosition: ['0% 0%', '100% 0%'],
              }}
              transition={{
                width: { duration: 0.3 },
                backgroundPosition: { duration: 2, repeat: Infinity },
              }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            className="mt-4 text-forge-text-muted text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {progress < 30 && 'Initializing forge...'}
            {progress >= 30 && progress < 60 && 'Loading security modules...'}
            {progress >= 60 && progress < 90 && 'Connecting to networks...'}
            {progress >= 90 && 'Ready to forge...'}
          </motion.p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
