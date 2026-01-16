import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Logingpage from './pages/logingpage'
import Mainpage from './pages/mainpage'

export default function App() {
  return (
    <div className="font-montserrat">
      <Routes>
        <Route path="/" element={<Logingpage />} />
        <Route path="/main" element={<Mainpage />} />
      </Routes>
    </div>
  )
}
