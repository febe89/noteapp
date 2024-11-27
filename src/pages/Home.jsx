import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import NoteModal from '../components/NoteModal'
import axios from 'axios'
import NoteCard from '../components/NoteCard'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [filteredNote,setFilteredNote]=useState(false)
  const [notes, setNotes] = useState([])
  const [currentNote, setCurrentNote] = useState(null)
  const [query,setQuery]=useState('')
  useEffect(() => {
    fetchNotes()
  }, [])
  useEffect(() => {
    

    setFilteredNote(
      notes.filter(note =>

        note.title.toLowerCase().includes(query.toLocaleLowerCase())
        ||
        note.description.toLowerCase().includes(query.toLocaleLowerCase())
      )
    )
  },[query,notes])
  const fetchNotes = async () => {
    try {
      const { data } = await axios.get('http://localhost:8000/api/note', {
        
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
          
        }
      }
      )

      setNotes(data.notes)
    } catch (e) {
      console.log(e)
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  const onEdit = async (note) => {
    setCurrentNote(note)
    setIsModalOpen(true)
  }
  const addNote = async (title, description) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/note/add',
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (response.data.success) {
        fetchNotes()
        closeModal()
      }
    } catch (e) {
      console.log(e)
    }
  }
  const deleteNote = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:8000/api/note/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      if (response.data.success) {
        fetchNotes()
      }
    } catch (e) {
      console.log(e)
    }
  }
  const editNote = async (id, title, description) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/api/note/${id}`,
        { title, description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      )
      if (response.data.success) {
        fetchNotes()
        closeModal()
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className='bg-gray-100 min-h-screen'>
      <Navbar setQuery
        ={ setQuery} />

      <div className='grid grid-cols-1 md:grid-cols-3 pt-4 px-8 gap-6'>
        { filteredNote.length >0 ? filteredNote.map((note) => (
          <NoteCard key={note._id} note={note} onEdit={onEdit} deleteNote={deleteNote} />
        )) : <p>No Note</p>
      }
      </div>

      <button onClick={() => setIsModalOpen(true)} className='bg-teal-500 text-white font-bold p-4 rounded-full fixed bottom-4 right-4 text-2xl'>
        +
      </button>
      {isModalOpen && <NoteModal closeModal={closeModal} addNote={addNote} currentNote={currentNote} editNote={editNote} />}
    </div>
  )
}

export default Home
