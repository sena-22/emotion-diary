import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"

import "./App.css"
import {Diary, Edit, Home, New} from "./pages/index"

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/new" element={<New />}></Route>
            <Route path="/edit/:id" element={<Edit />}></Route>
            <Route path="/diary/:id" element={<Diary />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
