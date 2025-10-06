import React from 'react'
import Flashcard from '../components/FlashCard'

export default function FlashcardNew({ words, setWords }) {
  return <Flashcard words={words} setWords={setWords} onlyNew />
}