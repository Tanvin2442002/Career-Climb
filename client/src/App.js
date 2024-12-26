import React from 'react'
import Myprofile from './Component/Myprofile'
import Navbar from './Component/Navbar'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Landing from './Component/LandingComponents/Landing'

export default function App() {
  return (
    <div className='font-Poppins bg-background'>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Myprofile />} />
        </Routes>
      </Router>
    </div>
  )
}