import { useEffect, useState } from 'react'

const CHARS = 'abcdefghijklmnopqrstuvwxyz'

function randomChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export function ScrambleText({
  words,
  interval = 2000,
  scrambleDuration = 200,
}: {
  words: string[]
  interval?: number
  scrambleDuration?: number
}) {
  const [display, setDisplay] = useState(words[0])

  useEffect(() => {
    let wordIndex = 0
    let frameId: number
    let timeout: ReturnType<typeof setTimeout>

    function scrambleTo(next: string) {
      const start = performance.now()
      const len = next.length

      function tick() {
        const elapsed = performance.now() - start
        const progress = Math.min(elapsed / scrambleDuration, 1)
        // Number of characters revealed from center outward
        const revealed = Math.floor(progress * Math.ceil(len / 2))
        const mid = Math.floor(len / 2)

        let result = ''
        for (let i = 0; i < len; i++) {
          const distFromCenter = Math.abs(i - mid)
          result += distFromCenter < revealed ? next[i] : randomChar()
        }
        setDisplay(result)

        if (progress < 1) {
          frameId = requestAnimationFrame(tick)
        } else {
          setDisplay(next)
          schedule()
        }
      }

      frameId = requestAnimationFrame(tick)
    }

    function schedule() {
      timeout = setTimeout(() => {
        wordIndex = (wordIndex + 1) % words.length
        scrambleTo(words[wordIndex])
      }, interval)
    }

    schedule()

    return () => {
      cancelAnimationFrame(frameId)
      clearTimeout(timeout)
    }
  }, [words, interval, scrambleDuration])

  return (
    <span
      className="inline-block transition-[width] duration-300"
      style={{ width: `${display.length}ch` }}
    >
      {display}
    </span>
  )
}
