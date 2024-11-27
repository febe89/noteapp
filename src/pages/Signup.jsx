import { useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Signup = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = user
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:8000/api/auth/register', { ...user })
    console.log(response.data)
  }
  return (
    <div className='min-h-screen bg-gray-200 flex items-center justify-center'>
      <div className='bg-white p-4 w-80 '>
        <h2 className='text-2xl font-bold mb-4'>Signup</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='name' className='text-gray-400 block'>
              Name
            </label>
            <input name='name' onChange={handleChange} value={name} className='px-4 py-1 border w-full' type='text' />
          </div>
          <div className='mb-4'>
            <label htmlFor='name' className='text-gray-400 block'>
              Email
            </label>
            <input className='px-4 py-1 border w-full' name='email' onChange={handleChange} value={email} type='text' />
          </div>
          <div className='mb-4'>
            <label htmlFor='name' className='text-gray-400 block'>
              Password
            </label>
            <input name='password' onChange={handleChange} value={password} className='px-4 py-1 border w-full' type='text' />
          </div>
          <div className=''>
            <button className='bg-teal-400 mb-2 w-full text-white px-4 py-1'>Signup</button>
            <p className='text-gray-500'>
              Already have an account ? <Link to='/login'> Login</Link>{' '}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Signup
