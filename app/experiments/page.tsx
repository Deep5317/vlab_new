"use client"

import { experiments } from "@/lib/data"
import { ExperimentCard } from "@/components/experiment-card"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function ExperimentsPage() {
  const [isMounted, setIsMounted] = useState(false)

  // Handle hydration issues by waiting for client-side mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="bg-[#efeeee] min-h-screen py-8 rounded-lg px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Experiments</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our collection of interactive applied physics virtual experiments designed to enhance your understanding of
            fundamental concepts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiments.map((experiment, index) => (
            <motion.div
              key={experiment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.5, 
                delay: 0.1 * index,
                ease: "easeOut"
              }}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.2 } 
              }}
            >
              <ExperimentCard experiment={experiment} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

