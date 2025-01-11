import { React } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';


import Profile from "./Component/ProfileComponents/Profile";
import Login from "./Component/RandomComponents/login";
import Signup from "./Component/RandomComponents/signup";
import Application from "./Component/ApplicationComponent/Application";
import ResetPassword from "./Component/RandomComponents/resetpass";
import ForgotPassword from "./Component/RandomComponents/forgetpass";
import Landing from "./Component/LandingComponents/Landing";
import CareerRoadMap from "./Component/CareerComponents/CareerRoadMap";
import SkillBoost from "./Component/CareerComponents/SkillBoost";
import SkillBoostTable from "./Component/CareerComponents/SkillBoostTable";
import Applicants from "./Component/ApplicationComponent/Applicants";
import AboutUs from "./Component/RandomComponents/AboutUs";
import Dashboard from "./Component/DashboardComponents/Dashboard"
import JobPostsPage from "./Component/JobPost/JobPost";
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
          <Route path="/post" element={<JobPostsPage />} />
          <Route path="/jobs" element={<JobPortal />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
