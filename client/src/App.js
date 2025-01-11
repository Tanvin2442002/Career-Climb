import { React, useState, useEffect } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import Profile from './Component/ProfileDashboardComponents/Profile';
import Login from './Component/RandomComponents/login';
import Signup from './Component/RandomComponents/signup';
import Application from './Component/ApplicationComponent/Application';
import ResetPassword from './Component/RandomComponents/resetpass';
import ForgotPassword from './Component/RandomComponents/forgetpass';
import Landing from './Component/LandingComponents/Landing'
import CareerRoadMap from './Component/CareerComponents/CareerRoadMap'
import SkillBoost from './Component/CareerComponents/SkillBoost';
import SkillBoostTable from './Component/CareerComponents/SkillBoostTable';
import Applicants from './Component/ApplicationComponent/Applicants';
import AboutUs from './Component/RandomComponents/AboutUs';
import NotificationList from './Component/RandomComponents/Notifications';
import Dashboard from './Component/Employer/Dashboard';

export default function App() {

  return (
    <div className="font-Poppins bg-background">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpass" element={<ForgotPassword />} />
          <Route path="/resetpass" element={<ResetPassword />} />
          <Route path="/roadmap" element={<CareerRoadMap />} />
          <Route path="/applications" element={<Application />} />
          <Route path="/applicants" element={<Applicants />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/skill-gap" element={<SkillBoost />} />
          <Route path="/skill-boostTable" element={<SkillBoostTable />} />
          <Route path="/notification" element={<NotificationList />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobportal" element={<JobPortal />} />
         </Routes>
      </Router>
    </div>
  );
}

