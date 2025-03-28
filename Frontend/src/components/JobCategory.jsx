import React from 'react';
import { useNavigate } from 'react-router-dom';

const JobCategoryPage = () => {
    const navigate = useNavigate();

    const jobCategories = [
        { id: 1, title: "Software Development", jobs: 120 },
        { id: 2, title: "Marketing", jobs: 75 },
        { id: 3, title: "Design", jobs: 50 },
        { id: 4, title: "Sales", jobs: 90 },
        { id: 5, title: "Human Resources", jobs: 40 },
        { id: 6, title: "Finance", jobs: 30 },
        { id: 7, title: "Customer Service", jobs: 60 },
        { id: 8, title: "IT Support", jobs: 45 },
        // Add more categories as needed
    ];

    const handleCategoryClick = (category) => {
        navigate(`/explore?category=${encodeURIComponent(category)}`);
    };

    return (
        <div className="job-category-page bg-white p-10">
            <h1 className="text-3xl font-bold text-center mb-8 text-[#19995C]">Job Categories</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {jobCategories.map(category => (
                    <div
                        key={category.id}
                        className="bg-[#f9f9f9] p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105 cursor-pointer"
                        onClick={() => handleCategoryClick(category.title)}
                    >
                        <h2 className="text-xl font-semibold text-[#19995C]">{category.title}</h2>
                        <p className="text-gray-600">{category.jobs} jobs available</p>
                        <span className="text-[#19995C] hover:underline font-medium">
                            View Jobs
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default JobCategoryPage;