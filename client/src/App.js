import React from 'react'
import Landing from './Component/Landing'
import Myprofile from './Component/Myprofile'
import Navbar from './Component/Navbar'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from './Component/LandingComponents/Landing'

export default function App() {
  return (
    <div className='font-Poppins bg-background'>
      <BrowserRouter>
      
        <Routes>
        {<Route path="/" element={<Landing />} /> }
        {<Route path="/" element={<Landing />} /> }
        <Route path="/Myprofile" element={<Myprofile />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}