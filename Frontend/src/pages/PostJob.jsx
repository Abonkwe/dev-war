import React from 'react';

const PostJob = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg md:m-5 rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Post Job</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              placeholder="e.g. Frontend Developer"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="companyName">Company Name</label>
            <input
              type="text"
              id="companyName"
              placeholder="e.g. Google"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="mb-1 text-green-600" htmlFor="jobDescription">Job Description</label>
            <textarea
              id="jobDescription"
              placeholder="e.g. Responsible for developing user interfaces..."
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              placeholder="e.g. Remote"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="employmentType">Employment Type</label>
            <select
              id="employmentType"
              name="employmentType"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            >
              <option value="full-time">Full-time</option>
              <option value="part-time">Part-time</option>
              <option value="contract">Contract</option>
              <option value="internship">Internship</option>
              <option value="freelance">Freelance</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="salaryRange">Salary Range</label>
            <input
              type="text"
              id="salaryRange"
              placeholder="e.g. $50,000 - $70,000"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="applicationDeadline">Application Deadline</label>
            <input
              type="date"
              id="applicationDeadline"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              placeholder="e.g. example@company.com"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col col-span-1 md:col-span-2">
            <button
              type="submit"
              className="mt-4 bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              Post Job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;