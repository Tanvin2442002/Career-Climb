import React from 'react'
import Myprofile from './Component/UserProfile'
import Empro from './Component/EmployerProfile';
import Login from './Component/RandomComponents/login';
import Signup from './Component/RandomComponents/signup';
import Application from './Component/ApplicationComponent/Application';
import ResetPassword from './Component/RandomComponents/resetpass';
import ForgotPassword from './Component/RandomComponents/forgetpass';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Landing from './Component/LandingComponents/Landing'
import CareerRoadMap from './Component/CareerComponents/CareerRoadMap'

import SkillBoost from './Component/CareerComponents/SkillBoost';
import SkillBoostTable from './Component/CareerComponents/SkillBoostTable';

import Applicants from './Component/ApplicationComponent/Applicants';
import AboutUs from './Component/RandomComponents/AboutUs';
import NotificationList from './Component/Notifications';


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
          <Route path="/forgetpass" element={<ForgotPassword />}/>
          <Route path="/resetpass" element={<ResetPassword />}/>
          <Route path="/roadmap" element={<CareerRoadMap />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/career" element={<CareerRoadMap />} />
          <Route path="/skill-boost" element={<SkillBoost />} />
          <Route path="/skill-boostTable" element={<SkillBoostTable />} />
          <Route path="/application" element={<Application />} />
          <Route path="/candidate" element={<Applicants />} />
          <Route path="/notification" element={<NotificationList />} />
         </Routes>

      </Router>
    </div>
  )
}
