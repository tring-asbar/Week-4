import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Header'
import Register from './Register'
import SignIn from './SignIn'
import UserPage from './UserPage'
import {Routes,Route} from 'react-router-dom'
import UpdatePersona from './UpdatePersona'
function App() {

  return (
    <>
      <Routes>
        <Route path='/'index element={<Header/>}></Route>
        <Route path="/SignIn" element={<SignIn/>}></Route>
        <Route path="/Register" element={<Register/>}></Route>
        <Route path="/UserPage" element={<UserPage/>}></Route>
        <Route path="/UpdatePersona" element={<UpdatePersona/>}></Route>

      </Routes>
    
    </>
  )
}

export default App
