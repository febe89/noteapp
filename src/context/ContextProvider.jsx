import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'
const AuthContext = createContext()
const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const login = (user) => {
    setUser(user)
  }
  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
  }
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/auth/verify', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        })
        if (res.data.success) {
          setUser(res.data.user)
        } else {
          setUser(null)
        }
      } catch (e) {
        console.log(e)
      }
    }
    verifyUser()
  }, [])
  return <AuthContext.Provider value={{ user, login,logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
export default ContextProvider
