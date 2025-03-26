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
        imagePreview: URL.createObjectURL(file), // Show preview
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Send profile data to parent component
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold text-center mb-4 text-[#199956]">Create Freelancer Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Full Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full p-2 border rounded-md" required />
        </div>

        <div>
          <label className="block font-medium">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full p-2 border rounded-md" required />
        </div>

        <div>
          <label className="block font-medium">Skills (comma separated)</label>
          <input type="text" name="skills" value={formData.skills} onChange={handleChange} className="w-full p-2 border rounded-md" required />
        </div>

        <div>
          <label className="block font-medium">Experience Level</label>
          <select name="experience" value={formData.experience} onChange={handleChange} className="w-full p-2 border rounded-md">
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="expert">Expert</option>
          </select>
        </div>

        <div>
          <label className="block font-medium">Bio</label>
          <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full p-2 border rounded-md" rows="3"></textarea>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block font-medium">Upload an Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} className="w-full p-2 border rounded-md" />
          {formData.imagePreview && (
            <img src={formData.imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded-md" />
          )}
        </div>

        <div>
          <label className="block font-medium">Portfolio Link</label>
          <input type="url" name="portfolio" value={formData.portfolio} onChange={handleChange} className="w-full p-2 border rounded-md" />
        </div>

        <button type="submit" className="w-full bg-[#199956] text-white p-2 rounded-md hover:bg-blue-600 transition">Update Profile</button>
      </form>
    </div>
  );
};

export default CreateProfile;
