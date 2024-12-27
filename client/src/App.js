import React from 'react'
import Myprofile from './Component/UserProfile'
import Empro from './Component/EmployerProfile';
import Login from './Component/Login';
import Signup from './Component/Signup';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Landing from './Component/LandingComponents/Landing'

export default function App() {
  return (
    <div className='font-Poppins bg-background'>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Myprofile />} />
          <Route path="/emp/profile" element={<Empro />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
        </Routes>
      </Router>
    </div>
  )
}