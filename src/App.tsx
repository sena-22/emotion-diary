import React, {useEffect} from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import "./App.css"
import {auth} from "./firebase"
import {Diary, Edit, Home, New, Login} from "./pages/index"
import useLoginStore from "./zustand/userStore"

function App() {
  const {user, login, logout} = useLoginStore()

  useEffect(() => {
    auth.onAuthStateChanged((loginUser) => {
      if (loginUser) {
        login({
          uid: loginUser.uid,
          photo: loginUser.photoURL,
          email: loginUser.email,
          displayName: loginUser.displayName,
        })
      } else {
        logout()
      }
    })
  }, [])

  return (
    <>
      <BrowserRouter>
        <div className="min-h-screen px-5 sm:w-[90vw] md:w-[640px]">
          <Routes>
            <>
              <Route path="/" element={user ? <Home /> : <Login />} />
              <Route path="/new" element={<New />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="/diary/:id" element={<Diary />} />
              <Route path="/login" element={<Login />} />
            </>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
