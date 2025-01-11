import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify';

const PostJobForm = ({ onClose }) => {
  const [userInfo, setUserInfo] = useState({ name: '', email: '' });
  const [companyInfo, setCompanyInfo] = useState({ companyName: '', location: '' });
  const [jobInfo, setJobInfo] = useState({
    jobRole: '',
    salary: '',
    jobType: 'full-time',
    workingHours: '',
  });
  const [jobDescription, setJobDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('User Info:', userInfo);
    console.log('Company Info:', companyInfo);
    console.log('Job Info:', jobInfo);
    console.log('Job Description:', jobDescription);


    toast.success('Job Posted Successfully!', {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    setUserInfo({ name: '', email: '' });
    setCompanyInfo({ companyName: '', location: '' });
    setJobInfo({ jobRole: '', salary: '', jobType: 'full-time', workingHours: '' });
    setJobDescription('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="overflow-x-auto">
        <h2 className="text-2xl font-semibold mb-6">Post a Job</h2>
        
 
        <div className="mb-6 overflow-auto">
          <h3 className="text-xl font-semibold mb-4">User Info</h3>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold mb-2">Name</label>
            <input
              type="text"
              id="name"
              value={userInfo.name}
              onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">Email</label>
            <input
              type="email"
              id="email"
              value={userInfo.email}
              onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Company Details</h3>
          <div className="mb-4">
            <label htmlFor="companyName" className="block text-gray-700 font-semibold mb-2">Company Name</label>
            <input
              type="text"
              id="companyName"
              value={companyInfo.companyName}
              onChange={(e) => setCompanyInfo({ ...companyInfo, companyName: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter company name"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Location</label>
            <input
              type="text"
              id="location"
              value={companyInfo.location}
              onChange={(e) => setCompanyInfo({ ...companyInfo, location: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter location"
              required
            />
          </div>
        </div>

        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Job Info</h3>
          <div className="mb-4">
            <label htmlFor="jobRole" className="block text-gray-700 font-semibold mb-2">Job Role</label>
            <input
              type="text"
              id="jobRole"
              value={jobInfo.jobRole}
              onChange={(e) => setJobInfo({ ...jobInfo, jobRole: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter job role"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="salary" className="block text-gray-700 font-semibold mb-2">Salary</label>
            <input
              type="text"
              id="salary"
              value={jobInfo.salary}
              onChange={(e) => setJobInfo({ ...jobInfo, salary: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter salary range"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="jobType" className="block text-gray-700 font-semibold mb-2">Job Type</label>
            <select
              id="jobType"
              value={jobInfo.jobType}
              onChange={(e) => setJobInfo({ ...jobInfo, jobType: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              required
            >
              <option value="full-time">Full-time</option>
              <option value="intern">Intern</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="workingHours" className="block text-gray-700 font-semibold mb-2">Working Hours</label>
            <input
              type="text"
              id="workingHours"
              value={jobInfo.workingHours}
              onChange={(e) => setJobInfo({ ...jobInfo, workingHours: e.target.value })}
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Enter working hours"
              required
            />
          </div>
        </div>

        
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-4">Job Description</h3>
          <textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg"
            rows="6"
            placeholder="Enter job description"
            required
          />
        </div>

        
        <button
          type="submit"
          className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Post Job
        </button>
      </form>

      
      <ToastContainer />
    </>
  );
};

export default PostJobForm;
