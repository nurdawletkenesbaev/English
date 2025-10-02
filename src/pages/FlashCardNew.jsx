import React, { useState, useEffect } from 'react'
import Flashcard from '../components/FlashCard'

export default function FlashcardNew({ words, setWords }) {
  const newWords = words.filter((w) => w.currentDay === 0 && !w.nextReviewDate)

  if (newWords.length === 0) {
    return <p className='text-center mt-10'>Yangi so'zlar qolmadi!</p>
  }

  return <Flashcard words={newWords} setWords={setWords} />
}
