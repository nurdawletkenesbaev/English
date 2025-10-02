import React from 'react'
import { getTodayISO } from '../utils/spacedRepetition'
import Flashcard from '../components/FlashCard'

export default function DailyReview({ words, setWords }) {
  const today = getTodayISO()
  const reviewWords = words.filter((w) => w.nextReviewDate === today)

  if (reviewWords.length === 0) {
    return (
      <p className='text-center mt-10'>🎉 Bugun takrorlash uchun so'z yo'q!</p>
    )
  }

  return <Flashcard words={reviewWords} setWords={setWords} />
}
