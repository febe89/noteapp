import { Link } from 'react-router-dom'
import { useAuth } from '../context/ContextProvider'

const Navbar = ({ setQuery }) => {
  const { user,logout } = useAuth()
  const handleLogout = () => [
    localStorage.removeItem('token')
  ]
  return (
    <nav className='bg-gray-800 p-4 flex items-center justify-between text-white '>
      <div className='text-xl font-bold'>
        <Link to='/'>NoteApp</Link>
      </div>
      <input type='text' onChange={(e)=>setQuery(e.target.value)} className='bg-gray-600 px-4 py-2 rounded' />
      <div className=''>
        {!user ? (
          <>
            <Link to='/login' className='bg-blue-500 px-4 py-2 rounded mr-4'>
              Login
            </Link>
            <Link to='/register' className='bg-green-500 px-4 py-2 rounded mr-4'>
              Signup
            </Link>
          </>
        ) : (
          <>
            <span className='mr-4'>{user.name}</span>
            <button onClick={logout} className='bg-red-500 px-4 py-2 rounded'>Logout</button>
          </>
        )}
      </div>
    </nav>
  )
}

export default Navbar
