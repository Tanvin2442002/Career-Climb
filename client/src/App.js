import React from "react";
import Myprofile from "./Component/UserProfile";
import Empro from "./Component/EmployerProfile";
import Login from "./Component/login";
import Signup from "./Component/signup";
import Application from "./Component/ApplicationComponent/Application";
import ResetPassword from "./Component/resetpass";
import ForgotPassword from "./Component/forgetpass";
import JobPortal from "./Component/Jobportal";
import EmployeeDashboard from "./Component/EmployeeDashboard";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import EmployerDashboard from "./Component/employerdashboard"

import Landing from "./Component/LandingComponents/Landing";
import CareerRoadMap from "./Component/CareerComponents/CareerRoadMap";


export default function App() {
  return (
    <div className="font-Poppins bg-background">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/profile" element={<Myprofile />} />
          <Route path="/emp/profile" element={<Empro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgetpass" element={<ForgotPassword />} />
          <Route path="/resetpass" element={<ResetPassword />} />
          <Route path="/career" element={<CareerRoadMap />} />
          <Route path="/application" element={<Application />} />
          <Route path="/employeedashboard" element={<EmployeeDashboard />} />
          <Route path="/jobportal" element={<JobPortal />} />
          <Route path="/employerdashboard" element={<EmployerDashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
