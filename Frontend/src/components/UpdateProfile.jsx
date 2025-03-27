import React, { useState } from 'react';

const CreateProfile = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "beginner",
    bio: "",
    portfolio: "",
    image: null,
    imagePreview: null,
    active: true,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Send profile data to parent component
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-green-100">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-lg w-full md:my-5">
        <h2 className="text-2xl font-semibold text-center mb-6 text-green-600">Create Freelancer Profile</h2>
        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-green-600">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-green-600">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-green-600">Skills (comma separated)</label>
            <input
              type="text"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              required
            />
          </div>

          <div>
            <label className="block font-medium text-green-600">Experience Level</label>
            <select
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="expert">Expert</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium text-green-600">Bio</label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
              rows="3"
            ></textarea>
          </div>

          {/* Image Upload */}
          <div className="md:col-span-2">
            <label className="block font-medium text-green-600">Upload an Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
            {formData.imagePreview && (
              <img src={formData.imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md border border-gray-300" />
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium text-green-600">Portfolio Link</label>
            <input
              type="url"
              name="portfolio"
              value={formData.portfolio}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700 transition duration-200"
          >
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;