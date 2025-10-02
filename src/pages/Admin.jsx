// src/pages/Admin.jsx (ixtiyoriy)
import React, { useState } from 'react'
import { addInitialWord, setInitialWords } from '../data/initialWords'

export default function Admin() {
  const [json, setJson] = useState('')

  function handleUpdate() {
    try {
      const parsed = JSON.parse(json)
      setInitialWords(parsed)
      localStorage.removeItem('words') // Tozalash
      alert("✅ So'zlar yangilandi! Sahifani yangilang.")
    } catch (e) {
      alert('❌ JSON formati noto‘g‘ri')
    }
  }

  return (
    <div className='p-6'>
      <h2 className='text-xl font-bold mb-4'>So'zlar massivini yangilash</h2>
      <textarea
        className='w-full h-64 border rounded p-2'
        value={json}
        onChange={(e) => setJson(e.target.value)}
        placeholder='JSON massivini shu yerga joylang'
      />
      <button
        onClick={handleUpdate}
        className='mt-4 bg-purple-600 text-white px-4 py-2 rounded'
      >
        Yangilash
      </button>
    </div>
  )
}
