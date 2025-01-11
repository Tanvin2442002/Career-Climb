import { React } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import Applicants from './Component/ApplicationComponent/Applicants';
import Application from './Component/ApplicationComponent/Application';
import CareerRoadMap from './Component/CareerComponents/CareerRoadMap';
import SkillBoost from './Component/CareerComponents/SkillBoost';
import SkillBoostTable from './Component/CareerComponents/SkillBoostTable';
import Dashboard from './Component/DashboardComponents/Dashboard';
import Landing from './Component/LandingComponents/Landing';
import Profile from './Component/ProfileComponents/Profile';
import AboutUs from './Component/RandomComponents/AboutUs';
import ForgotPassword from './Component/RandomComponents/forgetpass';
import Login from './Component/RandomComponents/login';
import NotificationList from './Component/RandomComponents/Notifications';
import ResetPassword from './Component/RandomComponents/resetpass';
import Signup from './Component/RandomComponents/signup';
import JobPortal from './Component/JobPortal';

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
          <Route path="/jobs" element={<JobPortal />} />
         </Routes>
      </Router>
    </div>
  );
}

