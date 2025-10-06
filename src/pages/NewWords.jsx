import React, { useState } from 'react'
import WordCard from '../components/WordCard'

/* ---------- Modal (inline) ---------- */
function AddWordModal({ open, onClose, setWords }) {
  const [mode, setMode] = useState('form') // 'form' | 'json'
  const [form, setForm] = useState({
    word: '',
    pronunciation: '',
    partOfSpeech: '',
    definition: '',
    definitionUz: '',
    example: '',
    chunks: '',
  })
  const [jsonText, setJsonText] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleAddForm = () => {
    if (!form.word.trim()) return setError('So‘zni kiriting')
    const chunks = form.chunks
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean)
    const newWord = {
      ...form,
      id: Date.now().toString(),
      chunks,
      currentDay: 0,
      nextReviewDate: null,
      history: [],
    }
    setWords((prev) => [newWord, ...prev])
    setSuccess('✅ So‘z qoʻshildi!')
    setTimeout(() => {
      setSuccess('')
      onClose()
      setForm({
        word: '',
        pronunciation: '',
        partOfSpeech: '',
        definition: '',
        definitionUz: '',
        example: '',
        chunks: '',
      })
    }, 800)
  }

  const handleAddJson = () => {
    try {
      const parsed = JSON.parse(jsonText)
      if (!Array.isArray(parsed)) throw new Error('Massiv boʻlishi kerak')
      const items = parsed.map((w, i) => ({
        ...w,
        id: Date.now() + i,
        currentDay: 0,
        nextReviewDate: null,
        history: [],
      }))
      setWords((prev) => [...items, ...prev])
      setSuccess(`✅ ${items.length} ta so‘z qoʻshildi!`)
      setTimeout(() => {
        setSuccess('')
        onClose()
        setJsonText('')
      }, 800)
    } catch (e) {
      setError(e.message)
    }
  }

  if (!open) return null

  return (
    <div
      className='fixed inset-0 z-50 flex items-end justify-center md:items-center'
      onClick={onClose}
    >
      {/* fon */}
      <div className='absolute inset-0 bg-black/50 backdrop-blur-sm' />
      {/* kontent */}
      <div
        className='relative bg-white w-full max-w-2xl max-h-[90vh] rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col'
        onClick={(e) => e.stopPropagation()}
      >
        {/* header */}
        <div className='px-4 py-3 border-b flex items-center justify-between'>
          <h3 className='text-lg font-semibold text-purple-800'>
            Yangi so‘z qo‘shish
          </h3>
          <button
            onClick={onClose}
            className='text-gray-500 hover:text-black text-2xl leading-none'
          >
            ✕
          </button>
        </div>

        {/* rejim tanlash */}
        <div className='px-4 py-2 border-b flex gap-2'>
          <button
            onClick={() => {
              setMode('form')
              setError('')
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              mode === 'form'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            Forma
          </button>
          <button
            onClick={() => {
              setMode('json')
              setError('')
            }}
            className={`px-3 py-1 rounded-full text-sm ${
              mode === 'json'
                ? 'bg-purple-600 text-white'
                : 'bg-gray-100 text-gray-700'
            }`}
          >
            JSON (mass)
          </button>
        </div>

        {/* body */}
        <div className='flex-1 overflow-y-auto p-4'>
          {mode === 'form' ? (
            <div className='space-y-3'>
              <input
                placeholder='So‘z'
                value={form.word}
                onChange={(e) =>
                  setForm({ ...form, word: e.target.value })
                }
                className='w-full border rounded-lg px-3 py-2'
              />
              <input
                placeholder='Talaffuz (masalan /ˈwɜːd/)'
                value={form.pronunciation}
                onChange={(e) =>
                  setForm({ ...form, pronunciation: e.target.value })
                }
                className='w-full border rounded-lg px-3 py-2'
              />
              <input
                placeholder='So‘z turkumi (noun, adj …)'
                value={form.partOfSpeech}
                onChange={(e) =>
                  setForm({ ...form, partOfSpeech: e.target.value })
                }
                className='w-full border rounded-lg px-3 py-2'
              />
              <textarea
                placeholder='Inglizcha ta’rif'
                value={form.definition}
                onChange={(e) =>
                  setForm({ ...form, definition: e.target.value })
                }
                className='w-full border rounded-lg px-3 py-2 h-18'
              />
              <textarea
                placeholder='O‘zbekcha ta’rif'
                value={form.definitionUz}
                onChange={(e) =>
                  setForm({ ...form, definitionUz: e.target.value })
                }
                className='w-full border rounded-lg px-3 py-2 h-18'
              />
              <textarea
                placeholder='Misol jumla'
                value={form.example}
                onChange={(e) =>
                  setForm({ ...form, example: e.target.value })
                }
                className='w-full border rounded-lg px-3 py-2 h-18'
              />
              <input
                placeholder='Chunks (vergul bilan ajrating)'
                value={form.chunks}
                onChange={(e) =>
                  setForm({ ...form, chunks: e.target.value })
                }
                className='w-full border rounded-lg px-3 py-2'
              />
            </div>
          ) : (
            <div>
              <p className='text-sm text-gray-600 mb-2'>
                JSON massiv shaklida kiriting (eski namuna bilan bir xil)
              </p>
              <textarea
                className='w-full h-64 border rounded font-mono text-sm'
                placeholder='[ { "word":"Apple", ... }, ... ]'
                value={jsonText}
                onChange={(e) => setJsonText(e.target.value)}
              />
            </div>
          )}

          {error && <p className='text-red-600 text-sm mt-2'>{error}</p>}
          {success && <p className='text-green-600 text-sm mt-2'>{success}</p>}
        </div>

        {/* footer */}
        <div className='px-4 py-3 border-t flex gap-2 justify-end'>
          <button
            onClick={onClose}
            className='px-4 py-2 rounded text-gray-700 hover:bg-gray-100'
          >
            Bekor
          </button>
          <button
            onClick={mode === 'form' ? handleAddForm : handleAddJson}
            className='px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700'
          >
            Qo‘shish
          </button>
        </div>
      </div>
    </div>
  )
}

/* ---------- Asosiy sahifa ---------- */
export default function NewWords({ words, setWords }) {
  const [modalOpen, setModalOpen] = useState(false)

  const newWords = words.filter((w) => w.currentDay === 0 && !w.nextReviewDate)

  return (
    <div className='px-4 py-6'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-bold text-purple-800'>Yangi So‘zlar</h2>
        <button
          onClick={() => setModalOpen(true)}
          className='bg-green-600 text-white px-3 py-2 rounded-lg shadow hover:bg-green-700 transition text-sm'
        >
          ➕ Yangi so‘z qo‘shish
        </button>
      </div>

      {newWords.map((word) => (
        <WordCard key={word.id} word={word} />
      ))}

      {newWords.length === 0 && (
        <p className='text-center text-gray-500 mt-10'>
          Yangi so‘zlar qolmadi, ertaga takrorlashga boradi!
        </p>
      )}

      <div className='mt-6 text-center'>
        <a
          href='/flashcard-new'
          className='bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition'
        >
          ✅ Tayyorman, flashcardga o‘tish
        </a>
      </div>

      <AddWordModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        setWords={setWords}
      />
    </div>
  )
}