import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Create_job } from '../CrudOperations/crud';

const townsInCameroon = [
  "Douala", "Yaoundé", "Bamenda", "Buea", "Limbe", "Kribi", "Garoua", "Maroua",
  "Ngaoundéré", "Ebolowa", "Bafoussam", "Kumba", "Dschang", "Bertoua", "Foumban",
  "Nkongsamba", "Tiko", "Mbalmayo", "Bafia", "Mamfe"
];

const PostJob = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    description: '',
    job_title: '',
    location: '',
    contact_email: '',
    price_range: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const createJobHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await Create_job(formData.description, formData.job_title,formData.location, formData.contact_email)
    if (res){
      navigate("/profile");
    }else{
      setError("Failed to post job, please try again!!");
    }
    setLoading(false)
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg md:m-5 rounded-lg p-6 max-w-4xl w-full">
        <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Post Job</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={createJobHandler}>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="job_title"
              placeholder="e.g. Frontend Developer"
              value={formData.job_title}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col col-span-1 md:col-span-2">
            <label className="mb-1 text-green-600" htmlFor="jobDescription">Job Description</label>
            <textarea
              name="description"
              id="jobDescription"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g. Responsible for developing user interfaces..."
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="location">Location</label>
            <select
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="">Select a town</option>
              {townsInCameroon.map((town, index) => (
                <option key={index} value={town}>{town}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col">
            <label className="mb-1 text-green-600" htmlFor="priceRange">Price Range</label>
            <input
              type="text"
              id="priceRange"
              name="price_range"
              value={formData.price_range}
              onChange={handleChange}
              placeholder="e.g. 50,000 FCFA - 100,000 FCFA"
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
              onChange={handleChange}
              placeholder="e.g. example@company.com"
              className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="flex flex-col col-span-1 md:col-span-2">
            <button
              type="submit"
              disabled={loading}
              className="mt-4 bg-green-600 text-white font-bold py-2 rounded-md hover:bg-green-700 transition duration-200"
            >
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default PostJob;