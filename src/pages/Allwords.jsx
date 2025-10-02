import React, { useState } from 'react'
import WordCard from '../components/WordCard'

export default function AllWords({ words }) {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all') // all | new | reviewed

  const filtered = words
    .filter((w) => w.word.toLowerCase().includes(search.toLowerCase()))
    .filter((w) => {
      if (filter === 'new') return w.currentDay === 0 && !w.nextReviewDate
      if (filter === 'reviewed') return w.nextReviewDate
      return true
    })

  return (
    <div className='px-4 py-6'>
      <h2 className='text-2xl font-bold text-purple-800 mb-4'>
        Barcha So'zlar
      </h2>

      <input
        className='w-full mb-4 px-4 py-2 border rounded-xl'
        placeholder='Qidiruv...'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className='flex gap-2 mb-4'>
        {['all', 'new', 'reviewed'].map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-4 py-2 rounded-lg ${
              filter === type ? 'bg-purple-600 text-white' : 'bg-gray-200'
            }`}
          >
            {type === 'all'
              ? 'Hammasi'
              : type === 'new'
              ? 'Yangi'
              : 'Takrorlanadi'}
          </button>
        ))}
      </div>

      {filtered.map((w) => (
        <WordCard key={w.id} word={w} />
      ))}
    </div>
  )
}
