'use client'

import { motion } from 'framer-motion'

import { AgentTerminal } from './agent-terminal'

export function Hero() {
  return (
    <motion.div
      className="flex min-h-0 flex-1 flex-col"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <AgentTerminal />
    </motion.div>
  )
}
