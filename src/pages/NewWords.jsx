import React from 'react'
import WordCard from '../components/WordCard'

export default function NewWords({ words, setWords }) {
  const newWords = words.filter((w) => w.currentDay === 0 && !w.nextReviewDate)

  return (
    <div className='px-4 py-6'>
      <h2 className='text-2xl font-bold text-purple-800 mb-4'>Yangi So'zlar</h2>
      {newWords.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}
      <div className='mt-6 text-center'>
        <a
          href='/flashcard-new'
          className='bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition'
        >
          ✅ Tayyorman, flashcardga o‘tish
        </a>
      </div>
    </div>
  )
}
