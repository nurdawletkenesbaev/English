import React from 'react'
import { getTodayISO } from '../utils/spacedRepetition'

const INTERVALS = [0, 1, 2, 3, 4, 7, 14, 30]

export default function Statistics({ words }) {
  const today = getTodayISO()

  const total = words.length
  const learned = words.filter((w) => w.currentDay > 0).length
  const newWords = words.filter(
    (w) => w.currentDay === 0 && !w.nextReviewDate
  ).length
  const dueToday = words.filter((w) => w.nextReviewDate === today).length
  const mastered = words.filter((w) => w.currentDay === 7).length

  const progressPercent = total ? Math.round((learned / total) * 100) : 0

  const stageCounts = Array(8).fill(0)
  words.forEach((w) => {
    const idx = w.currentDay
    if (idx >= 0 && idx <= 7) stageCounts[idx]++
  })

  return (
    <div className='px-3 py-4 md:px-4 md:py-6 max-w-5xl mx-auto'>
      {/* SARLAVHA */}
      <h2 className='text-2xl md:text-3xl font-extrabold text-center text-purple-800 mb-4 md:mb-6'>
        📊 Statistika
      </h2>

      {/* KARTALAR - mobil: scroll, desktop: grid */}
      <div className='flex md:grid md:grid-cols-4 gap-3 md:gap-4 overflow-x-auto pb-2 mb-6 md:mb-8'>
        <Card label='Jami' value={total} color='bg-blue-500' />
        <Card label='O‘rganilgan' value={learned} color='bg-green-500' />
        <Card label='Yangi' value={newWords} color='bg-gray-500' />
        <Card label='Bugun' value={dueToday} color='bg-orange-500' />
      </div>

      {/* PROGRESS - mobil: 100% */}
      <div className='mb-6 md:mb-8'>
        <div className='flex justify-between items-center mb-2'>
          <span className='text-sm font-medium text-gray-700'>Progress</span>
          <span className='text-sm font-bold text-purple-700'>
            {progressPercent}%
          </span>
        </div>
        <div className='w-full bg-gray-200 rounded-full h-3 md:h-4 overflow-hidden'>
          <div
            className='h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full'
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <p className='text-xs text-gray-500 mt-1'>
          {learned} / {total} so‘z o‘rganilgan
        </p>
      </div>

      {/* DIAGRAMMA - mobil: scroll + masshtab */}
      <div className='bg-white rounded-2xl shadow p-3 md:p-4 overflow-x-auto'>
        <h3 className='text-base md:text-lg font-bold text-gray-800 mb-3 md:mb-4'>
          Bosqichdagi so‘zlar
        </h3>
        <div className='flex items-end gap-2 justify-start min-h-[12rem] md:min-h-[14rem]'>
          {stageCounts.map((count, idx) => (
            <Bar key={idx} label={`${INTERVALS[idx]}`} count={count} />
          ))}
        </div>
      </div>

      {/* MASTER */}
      <div className='mt-5 md:mt-6 text-center'>
        <p className='text-sm text-gray-600'>
          <span className='text-xl md:text-2xl font-bold text-green-600'>
            {mastered}
          </span>{' '}
          ta so‘z <span className='font-semibold'>master</span> qilingan (
          {INTERVALS[7]} kun)
        </p>
      </div>
    </div>
  )
}

/* ---------- Komponentlar ---------- */
function Card({ label, value, color }) {
  return (
    <div
      className={`${color} text-white rounded-xl p-3 md:p-4 text-center shadow-lg min-w-[5.5rem] md:min-w-0`}
    >
      <div className='text-lg md:text-2xl font-bold'>{value}</div>
      <div className='text-[0.65rem] md:text-xs opacity-90'>{label}</div>
    </div>
  )
}

function Bar({ label, count }) {
  const height = Math.max(count * 2, 4) // mobil: 16 px, kamida 4
  return (
    <div className='flex flex-col items-center flex-1 min-w-[2rem]'>
      <div
        className='w-[80%] bg-gradient-to-t from-purple-400 to-purple-600 rounded-t-md transition-all duration-500'
        style={{ height: `${height}px` }}
      />
      <div className='text-[0.6rem] md:text-xs text-gray-600 mt-1'>{label}</div>
      <div className='text-[0.6rem] md:text-xs font-semibold text-purple-700'>
        {count}
      </div>
    </div>
  )
}
