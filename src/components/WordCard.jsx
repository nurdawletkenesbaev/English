import React from 'react'

export default function WordCard({ word }) {
  return (
    <div className='bg-white rounded-xl shadow p-4 mb-4'>
      <h3 className='text-xl font-bold text-purple-700'>{word.word}</h3>
      <p className='text-sm text-gray-500'>{word.pronunciation}</p>
      <p className='text-sm italic text-gray-600'>{word.partOfSpeech}</p>
      <p className='text-gray-800 mt-2 font-bold'>{word.definitionUz}</p>
      <p className='text-gray-800 mt-2'>{word.definition}</p>
      <p className='text-sm text-gray-500 mt-2'>"{word.example}"</p>
      <div className='mt-3 flex flex-wrap gap-2'>
        {word.chunks.map((c, i) => (
          <span
            key={i}
            className='bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs'
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  )
}
