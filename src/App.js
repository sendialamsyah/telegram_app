import React, { useEffect, useState } from 'react'
import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import Chat from './pages/chatRoom'
import Login from './pages/Login'
import Register from './pages/Register/index.js'
import io from 'socket.io-client'
import RequireAuth from './components/requireAuth'
import Profile from './pages/Profile'

const App = () => {
  const [socket, setSocket] = useState(null)
  useEffect(()=>{
    const token = localStorage.getItem('token')
    if(!socket && token){
      const resultSocket = io('https://telegram-chat-apps.herokuapp.com', {
        query: {
          token: token
        }
      })
      setSocket(resultSocket)
    }
  }, [socket])
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/login' element={<Login setSocket={setSocket}/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/chat' element={<RequireAuth> <Chat socket={socket}/> </RequireAuth>}/>
      <Route path="/" element={<Navigate to="/login" replace="true" />} />
      <Route path="/profile/:iduser" element={<Profile/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App