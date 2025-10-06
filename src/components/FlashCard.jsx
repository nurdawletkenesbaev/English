import React, { useState, useEffect } from 'react'
import { getTodayISO, getNextReviewDay, addDays } from '../utils/spacedRepetition'

export default function Flashcard({ words, setWords, onlyNew = false }) {
  const [index, setIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const [todayWords, setTodayWords] = useState([])

  useEffect(() => {
    const today = getTodayISO()

    const filtered = onlyNew
      ? words.filter((w) => w.currentDay === 0 && !w.nextReviewDate)
      : words.filter((w) => w.nextReviewDate === today || !w.nextReviewDate)

    setTodayWords(filtered)
  }, [words, onlyNew])

  if (todayWords.length === 0) {
    return (
      <div className='text-center mt-10 text-green-700 font-semibold'>
        🎉 Bugun uchun barcha so'zlar tayyor!
      </div>
    )
  }

  const current = todayWords[index]

  function handleAnswer(success) {
    const { currentDay, nextDay } = getNextReviewDay(
      current.currentDay,
      success
    )

    const updated = {
      ...current,
      currentDay,
      nextReviewDate: addDays(getTodayISO(), nextDay),
      history: [...current.history, { date: getTodayISO(), success }],
    }

    // ASOSIY words massivida yangilaymiz
    const newWords = words.map((w) => (w.id === current.id ? updated : w))
    setWords(newWords)

    setFlipped(false)
    if (index < todayWords.length - 1) {
      setIndex(index + 1)
    } else {
      setTodayWords([])
    }
  }

  return (
    <div className='mt-8'>
      {/* 3D Flip Card */}
      <div className='relative w-full h-64' style={{ perspective: '1000px' }}>
        <div
          onClick={() => setFlipped(!flipped)}
          className='relative w-full h-full cursor-pointer transition-transform duration-700'
          style={{
            transformStyle: 'preserve-3d',
            transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          {/* OLD TOMON */}
          <div
            className='absolute inset-0 flex flex-col justify-center items-center bg-white rounded-2xl shadow-xl p-6'
            style={{ backfaceVisibility: 'hidden' }}
          >
            <h2 className='text-4xl font-extrabold text-purple-700'>
              {current.word}
            </h2>
            <p className='text-sm text-gray-500 mt-2'>
              {current.pronunciation}
            </p>
            <p className='text-sm text-gray-600 mt-1 italic'>
              {current.partOfSpeech}
            </p>
            <p className='text-xs text-gray-400 mt-4'>
              (Bosib og‘izini aylantiring)
            </p>
          </div>

          {/* ORQA TOMON */}
          <div
            className='absolute inset-0 flex flex-col justify-center items-center bg-gradient-to-br from-purple-50 to-blue-100 rounded-2xl shadow-xl p-6'
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <p className='text-gray-800 mt-2 font-bold'>
              {current.definitionUz}
            </p>
            <p className='text-gray-800 text-center font-medium'>
              {current.definition}
            </p>
            <p className='text-sm text-gray-600 mt-3 italic'>
              "{current.example}"
            </p>
            <div className='mt-4 flex gap-2 flex-wrap justify-center'>
              {current.chunks.map((c, i) => (
                <span
                  key={i}
                  className='bg-purple-200 text-purple-800 px-3 py-1 rounded-full text-xs font-semibold'
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* TUGMALAR */}
      <div className='flex gap-4 mt-6 justify-center'>
        <button
          onClick={() => handleAnswer(false)}
          className='bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition shadow-md'
        >
          ❌ Bilmadim
        </button>
        <button
          onClick={() => handleAnswer(true)}
          className='bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition shadow-md'
        >
          ✅ Bildim
        </button>
      </div>
    </div>
  )
}