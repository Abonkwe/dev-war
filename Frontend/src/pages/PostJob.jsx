import React, { useState } from 'react';
import { Create_job } from '../CrudOperations/crud';
import { Navigate, useNavigate } from 'react-router-dom';

const PostJob = () => {
    const navigator = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        job_title: '',
         job_type: '',
         location: '',
         contact_email: '',
         salary: 0,
    })

   
 const handleChange = (e)=>{
        const field_name = e.target.name;
        const field_value = e.target.value;
        setFormData({...formData, [field_name]: field_value});
    }

    const createJob = async (e)=>{
        setLoading(true);
        e.preventDefault();
        const res = await Create_job(
            formData.description,
            formData.job_title,
            formData.job_type,
            formData.location,
            formData.contact_email,
        )
        if (res){
            setLoading(false);
            Navigate("/explore");
        }else{
            setLoading(false)
        }
    }

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
              name="job_title"
              placeholder="e.g. Frontend Developer"
              value = {formData.job_title}
              onChange={(e)=>handleChange(e)}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="mb-1 text-green-600" htmlFor="jobDescription">Job Description</label>
            <textarea
            name='description'
              id="jobDescription"
              value={formData.description}
              onChange={(e)=>handleChange(e)}
              placeholder="e.g. Responsible for developing user interfaces..."
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={(e)=>handleChange(e)}
              placeholder="e.g. Remote"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="salaryRange">Salary Range</label>
            <input
              type="number"
              id="salaryRange"
              name="salary"
              value={formData.salary}
              onChange={(e)=>handleChange(e)}
              placeholder="e.g. $50,000 - $70,000"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="contactEmail">Contact Email</label>
            <input
              type="email"
              id="contactEmail"
              name="contact_email"
              value={formData.contact_email}
              onChange={(e)=>handleChange(e)}
              placeholder="e.g. example@company.com"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col col-span-1 md:col-span-2">
            <button
            onClick={(e)=>createJob(e)}
            disabled={loading}
              className="mt-4 bg-green-600 text-white font-bold  py-2 rounded-md hover:bg-green-700 transition duration-200"
            >{
                loading ? "Posting... ": "Post Job"
            }
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PostJob;