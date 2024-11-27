import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const NoteModal = ({ closeModal, addNote, currentNote, editNote }) => {
  const navigate = useNavigate()
  const [note, setNote] = useState({
    title: '',
    description: ''
  })
  const { title, description } = note
  useEffect(() => {
    if (currentNote) {
      setNote({
        title: currentNote.title,
        description: currentNote.description
      })
    }
  }, [currentNote])
  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (currentNote) {
      editNote(currentNote._id, title, description)
    } else {
      addNote(title, description)
    }
  }
  return (
    <div className='fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center'>
      <div className='bg-white p-8 rounded'>
        <h2 className='text-xl font-bold mb-4'> {currentNote ? 'Edit Note' : 'Add New Note'}</h2>

        <form onSubmit={handleSubmit}>
          <input type='text' placeholder='Note Title' name='title' value={title} onChange={handleChange} className='border p-2 w-full mb-4' />
          <textarea name='description' value={description} onChange={handleChange} className='border p-2 w-full mb-4' id=''></textarea>
          <button type='submit' className='bg-blue-500 text-white px-4 py-2 rounded'>
            {currentNote ? 'Update Note' : 'Add Note'}
          </button>
        </form>
        <button onClick={closeModal } className='text-red-800 mt-2'>
          Cancel
        </button>
      </div>
    </div>
  )
}

export default NoteModal
