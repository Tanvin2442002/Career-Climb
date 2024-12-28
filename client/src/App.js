import React from 'react'
import Myprofile from './Component/UserProfile'
import Empro from './Component/EmployerProfile';
import Login from './Component/login';
import Signup from './Component/signup';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import Landing from './Component/LandingComponents/Landing'
import CareerRoadMap from './Component/CareerComponents/CareerRoadMap'
import SkillBoost from './Component/CareerComponents/SkillBoost';
//import SkillBoostTable from './Component/CareerComponents/SkillBoostTable';


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
          <Route path="/career" element={<CareerRoadMap />} />
          <Route path="/SkillBoost" element={<SkillBoost />} />
        

        </Routes>
      </Router>
    </div>
  )
}