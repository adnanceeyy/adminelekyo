import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Toaster, ToastBar, toast } from 'react-hot-toast';
import Logingpage from './pages/logingpage'
import Mainpage from './pages/mainpage'

export default function App() {
  return (
    <div className="font-montserrat">
      <Toaster position="top-right" reverseOrder={false}>
        {(t) => (
          <div
            onClick={() => toast.dismiss(t.id)}
            className="cursor-pointer transition-transform active:scale-95"
          >
            <ToastBar toast={t} />
          </div>
        )}
      </Toaster>
      <Routes>
        <Route path="/" element={<Logingpage />} />
        <Route path="/main" element={<Mainpage />} />
      </Routes>
    </div>
  )
}
