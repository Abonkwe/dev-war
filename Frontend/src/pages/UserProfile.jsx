import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { get_my_jobs } from "../CrudOperations/crud";

const UserProfile = () => {
  const [activeTab, setActiveTab] = useState("active");
  const [user, setUser] = useState(null);
const [fetchError, setFetchError] = useState("");
  const [activeJobs, setActiveJobs] = useState([]);

  const [postedJobs, setPostedJobs] = useState([]);

  const [completedJobs, setCompletedJobs] = useState([]);

  const markAsCompleted = (jobId) => {
    const jobToMove = activeJobs.find((job) => job.id === jobId);
    if (jobToMove) {
      setActiveJobs(activeJobs.filter((job) => job.id !== jobId));
      setCompletedJobs([...completedJobs, jobToMove]);
    }
  };

  const getAllJobs = async ()=>{
    const data = await get_my_jobs();
    if (!data){
      setFetchError("Failed to fetch get your Jobs");
    }else{
      console.log(data.posted_jobs);
      setPostedJobs(data.posted_jobs);
      console.log(postedJobs);
      setActiveJobs(data.taken_jobs);
      // console.log(activeJobs);
    }
  }

  const fetchAllData = async ()=>{
      await getAllJobs();
      // await getPostedJobs();

  }
  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="min-h-screen px-40 flex flex-col">
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
        <div className="flex justify-between mt-5 px-30 border-b-7 border-slate-500 border-b-opacity-3">
          <button
            className={`py-2 px-4 font-bold text-xl bg-transparent  ${activeTab === "active" ? " text-[#19995C] border-b-7 border-b-[#19995c]": "text-slate-500"}`}
            onClick={() => setActiveTab("active")}
          >
            Active Jobs
          </button>
          <button
            className={`py-2 px-4 font-bold text-xl bg-transparent  ${activeTab === "posted" ? "text-blue-600 border-b-7 border-b-blue-600" : "text-slate-400"}`}
            onClick={() => setActiveTab("posted")}
          >
            Posted Jobs
          </button>
          <button
            className={`py-2 px-4 font-bold text-xl bg-transparent  ${activeTab === "completed" ? "text-yellow-600 border-b-7 border-b-yellow-600": "text-slate-400" }`}
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
                activeJobs.map((job, i) => (
                  // {console.log(job)}
                  <div key={i} className="bg-gray-100 p-4 rounded-lg shadow-md mb-3">
                    <h4 className="text-lg font-semibold">{job.job_title}</h4>
                    <p className="text-gray-600">{job.description}</p>
                    <span className="text-sm bg-blue-200 text-blue-800 px-2 py-1 rounded">{job.date_posted}</span>
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
                    <h4 className="text-lg font-semibold">{job.job_title}</h4>
                    <p className="text-gray-600">{job.description}</p>
                    <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded">{job.contact_email}</span>
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