import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'

export function BlurRevealText({
  words,
  interval = 1750,
}: {
  words: string[]
  interval?: number
}) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, interval)
    return () => clearInterval(id)
  }, [words.length, interval])

  return (
    <span className="relative inline-flex overflow-hidden align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -20, filter: 'blur(8px)' }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
