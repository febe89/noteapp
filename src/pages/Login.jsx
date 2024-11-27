import { useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth}from '../context/ContextProvider'
const Login = () => {
  const navigate = useNavigate()
  const {login}=useAuth()

  const [user, setUser] = useState({
    email: '',
    password: ''
  })
  const { email, password } = user
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:8000/api/auth/login', { ...user })
    
    if (response.data.success) {
      login(response.data.user)
      localStorage.setItem('token', response.data.token)
      navigate('/')
      
    }
    console.log(response.data.user)
  }
  return (
    <div className='min-h-screen bg-gray-200 flex items-center justify-center'>
      <div className='bg-white p-4 w-80 '>
        <h2 className='text-2xl font-bold mb-4'>Login</h2>
        <form onSubmit={handleSubmit}>
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
            <button className='bg-teal-400 mb-2 w-full text-white px-4 py-1'>Login</button>
            <p className='text-gray-500'>
              Don't have an account ? <Link to='/register'> Signup</Link>{' '}
            </p>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
