import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const [activeJobs, setActiveJobs] = useState([
    { id: 1, title: "Web Developer", description: "Build a portfolio website", type: "Freelance" },
    { id: 2, title: "Graphic Designer", description: "Design a company logo", type: "Design" },
  ]);

  const [postedJobs, setPostedJobs] = useState([
    { id: 3, title: "SEO Specialist", description: "Improve search rankings", type: "Marketing" },
  ]);

  const [completedJobs, setCompletedJobs] = useState([
    { id: 4, title: "Mobile App Developer", description: "Create an iOS app", type: "Development" },
  ]);

  const markAsCompleted = (jobId) => {
    const jobToMove = activeJobs.find((job) => job.id === jobId);
    if (jobToMove) {
      setActiveJobs(activeJobs.filter((job) => job.id !== jobId));
      setCompletedJobs([...completedJobs, jobToMove]);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow p-6 bg-white shadow-lg rounded-xl">
        {/* Profile Header */}
        <div className="flex md:flex-row items-center justify-between border-b pb-4">
          <div className="flex items-center">
            <img src="/profile.jpg" alt="Profile" className="w-20 h-20 rounded-full object-cover border-2 border-gray-300" />
            <div className="ml-4 text-left">
              <h3 className="text-2xl font-semibold text-gray-800">{user ? user.name : "Username"}</h3>
              <p className="text-gray-600">{user ? user.email : "email@gmail.com"}</p>
            </div>
          </div>
          <div className="space-x-2">
            <Link to="/profile">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition">Edit</button>
            </Link>
            <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mt-5 space-x-5">
          <button
            className={`py-2 px-4 rounded-md ${activeTab === "active" ? "bg-green-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("active")}
          >
            Active Jobs
          </button>
          <button
            className={`py-2 px-4 rounded-md ${activeTab === "posted" ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("posted")}
          >
            Posted Jobs
          </button>
          <button
            className={`py-2 px-4 rounded-md ${activeTab === "completed" ? "bg-yellow-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Jobs
          </button>
        </div>

        {/* Job List */}
        <div className="mt-5 space-y-4 p-3 border border-gray-300 rounded-lg">
          {activeTab === "active" && (
            <div>
              <h3 className="text-lg font-semibold text-green-600">Active Jobs</h3>
              {activeJobs.length > 0 ? (
                activeJobs.map((job) => (
                  <div key={job.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-3">
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <p className="text-gray-600">{job.description}</p>
                    <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded">{job.type}</span>
                    <button
                      onClick={() => markAsCompleted(job.id)}
                      className="block mt-2 px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
                    >
                      Mark as Completed
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No active jobs</p>
              )}
            </div>
          )}

          {activeTab === "posted" && (
            <div>
              <h3 className="text-lg font-semibold text-blue-600">Posted Jobs</h3>
              {postedJobs.length > 0 ? (
                postedJobs.map((job) => (
                  <div key={job.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-3">
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <p className="text-gray-600">{job.description}</p>
                    <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{job.type}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No posted jobs</p>
              )}
            </div>
          )}

          {activeTab === "completed" && (
            <div>
              <h3 className="text-lg font-semibold text-yellow-600">Completed Jobs</h3>
              {completedJobs.length > 0 ? (
                completedJobs.map((job) => (
                  <div key={job.id} className="bg-gray-100 p-4 rounded-lg shadow-md mb-3">
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <p className="text-gray-600">{job.description}</p>
                    <span className="text-sm bg-green-200 text-green-800 px-2 py-1 rounded">{job.type}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No completed jobs</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;