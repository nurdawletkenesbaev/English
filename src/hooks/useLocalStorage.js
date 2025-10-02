// src/hooks/useLocalStorage.js
import { useState, useEffect } from 'react'
import { initialWords } from '../data/initialWords'

export default function useLocalStorage(key) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.localStorage.getItem(key)
      if (item) return JSON.parse(item)

      // Agar localStorage bo'sh bo'lsa, initialWords ni saqlaymiz
      window.localStorage.setItem(key, JSON.stringify(initialWords))
      return initialWords
    } catch {
      return initialWords
    }
  })

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(stored))
  }, [key, stored])

  return [stored, setStored]
}
