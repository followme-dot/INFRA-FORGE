'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, Paperclip, Code, Shield, Rocket, Sparkles, Bot, User, Copy, Check } from 'lucide-react'
import { MonacoEditor } from '../editor/MonacoEditor'
import { copyToClipboard } from '@/lib/utils'
import { ChatAPI } from '@/lib/api'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  codeBlocks?: CodeBlock[]
  securityReport?: SecurityReport
}

interface CodeBlock {
  language: string
  code: string
  filename?: string
}

interface SecurityReport {
  score: number
  issues: { severity: 'high' | 'medium' | 'low'; message: string }[]
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [copiedCode, setCopiedCode] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleCopy = async (code: string, filename: string) => {
    await copyToClipboard(code)
    setCopiedCode(filename)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const extractCodeBlocks = (content: string): { content: string; codeBlocks: CodeBlock[] } => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const blocks: CodeBlock[] = []
    let cleanContent = content

    let match
    let blockIndex = 0
    while ((match = codeBlockRegex.exec(content)) !== null) {
      const language = match[1] || 'text'
      const code = match[2].trim()
      const filename = language === 'solidity' ? `Contract${blockIndex + 1}.sol` : `code${blockIndex + 1}.${language}`

      blocks.push({ language, code, filename })
      cleanContent = cleanContent.replace(match[0], `[Code Block: ${filename}]`)
      blockIndex++
    }

    return { content: cleanContent, codeBlocks: blocks }
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    try {
      // Llamada REAL a la API con Claude
      const allMessages = [...messages, userMessage].map(m => ({
        role: m.role,
        content: m.content
      }))

      const response = await ChatAPI.sendMessage(allMessages)

      // Extraer bloques de código del contenido
      const { content, codeBlocks } = extractCodeBlocks(response.message.content)

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: content,
        timestamp: new Date(response.timestamp),
        codeBlocks: codeBlocks.length > 0 ? codeBlocks : undefined
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error al enviar mensaje:', error)

      // Mensaje de error amigable
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Lo siento, hubo un error al procesar tu solicitud. Por favor, verifica que el backend esté corriendo y que la API key de Anthropic esté configurada correctamente.',
        timestamp: new Date(),
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-forge-accent-cyan/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-forge-accent-cyan/20 to-forge-accent-purple/20 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-forge-accent-cyan" />
          </div>
          <div>
            <h2 className="font-semibold text-forge-text-primary">FORGE AI</h2>
            <p className="text-xs text-forge-text-muted">Powered by Claude</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2">
          {[
            { icon: Code, label: 'New Contract' },
            { icon: Shield, label: 'Audit' },
            { icon: Rocket, label: 'Deploy' },
          ].map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-forge-bg-tertiary/50 text-forge-text-secondary hover:text-forge-text-primary hover:bg-forge-bg-tertiary transition-all text-sm"
            >
              <action.icon className="w-4 h-4" />
              <span className="hidden md:inline">{action.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <motion.div
            className="flex flex-col items-center justify-center h-full text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-forge-accent-cyan/20 to-forge-accent-purple/20 flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-forge-accent-cyan" />
            </div>
            <h3 className="text-xl font-semibold text-forge-text-primary mb-2">
              Start Forging
            </h3>
            <p className="text-forge-text-secondary max-w-md">
              Describe the smart contract you need. I'll create it with security best practices,
              audit it, and help you deploy it to any chain.
            </p>

            {/* Suggestion Chips */}
            <div className="flex flex-wrap gap-2 mt-6 justify-center max-w-2xl">
              {[
                'Create an ERC-20 token with vesting',
                'NFT collection with royalties',
                'Staking contract for INFRA',
                'Multi-sig wallet',
              ].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => setInput(suggestion)}
                  className="px-4 py-2 rounded-full bg-forge-bg-tertiary/50 text-forge-text-secondary hover:text-forge-text-primary hover:bg-forge-bg-tertiary border border-forge-accent-cyan/10 hover:border-forge-accent-cyan/30 transition-all text-sm"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </motion.div>
        )}

        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'justify-end' : ''}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forge-accent-cyan to-forge-accent-purple flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}

              <div className={`max-w-[80%] ${message.role === 'user' ? 'order-first' : ''}`}>
                <div
                  className={`rounded-2xl px-4 py-3 ${
                    message.role === 'user'
                      ? 'bg-gradient-to-r from-forge-accent-cyan/20 to-forge-accent-purple/20 border border-forge-accent-cyan/20'
                      : 'glass-card'
                  }`}
                >
                  <p className="text-forge-text-primary whitespace-pre-wrap">{message.content}</p>
                </div>

                {/* Code Blocks */}
                {message.codeBlocks?.map((block, i) => (
                  <div key={i} className="mt-3 rounded-xl overflow-hidden border border-forge-accent-cyan/20">
                    <div className="flex items-center justify-between px-4 py-2 bg-forge-bg-tertiary/50">
                      <span className="text-sm text-forge-text-secondary font-mono">{block.filename}</span>
                      <button
                        onClick={() => handleCopy(block.code, block.filename || '')}
                        className="flex items-center gap-2 text-xs text-forge-accent-cyan hover:text-forge-accent-cyan/80 transition-colors"
                      >
                        {copiedCode === block.filename ? (
                          <>
                            <Check className="w-4 h-4" />
                            Copied!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Copy
                          </>
                        )}
                      </button>
                    </div>
                    <MonacoEditor
                      value={block.code}
                      language={block.language}
                      height="300px"
                      readOnly
                    />
                  </div>
                ))}

                {/* Security Report */}
                {message.securityReport && (
                  <div className="mt-3 glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-medium text-forge-text-primary flex items-center gap-2">
                        <Shield className="w-4 h-4 text-forge-accent-emerald" />
                        Security Analysis
                      </span>
                      <div className="flex items-center gap-2">
                        <span className={`text-2xl font-bold ${
                          message.securityReport.score >= 90 ? 'text-forge-accent-emerald' :
                          message.securityReport.score >= 70 ? 'text-forge-accent-gold' :
                          'text-forge-accent-danger'
                        }`}>
                          {message.securityReport.score}
                        </span>
                        <span className="text-forge-text-muted text-sm">/100</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {message.securityReport.issues.map((issue, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-2 text-sm py-2 px-3 rounded-lg ${
                            issue.severity === 'high' ? 'bg-red-500/10 text-red-400' :
                            issue.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-blue-500/10 text-blue-400'
                          }`}
                        >
                          <span className="capitalize font-medium">[{issue.severity}]</span>
                          <span className="flex-1">{issue.message}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {message.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-forge-bg-tertiary flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-forge-text-secondary" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-forge-accent-cyan to-forge-accent-purple flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="glass-card rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-forge-accent-cyan"
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-forge-accent-cyan/10">
        <div className="flex gap-3 items-end">
          <button className="p-3 rounded-xl bg-forge-bg-tertiary/50 text-forge-text-secondary hover:text-forge-text-primary hover:bg-forge-bg-tertiary transition-all">
            <Paperclip className="w-5 h-5" />
          </button>

          <div className="flex-1 relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Describe what you want to build..."
              className="w-full px-4 py-3 rounded-xl bg-forge-bg-tertiary/50 border border-forge-accent-cyan/10 focus:border-forge-accent-cyan/30 focus:outline-none resize-none text-forge-text-primary placeholder-forge-text-muted"
              rows={1}
            />
          </div>

          <motion.button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-3 rounded-xl bg-gradient-to-r from-forge-accent-cyan to-forge-accent-purple text-white disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
        <p className="mt-2 text-xs text-forge-text-muted text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
