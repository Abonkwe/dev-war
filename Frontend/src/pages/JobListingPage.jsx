import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import jobs from "../data/jobs"; // Import local jobs data

const JobListingPage = () => {
    const [allJobs, setAllJobs] = useState([]); // Store all jobs, including newly added ones
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({ skill: "", location: "", datePosted: "" });
    const navigate = useNavigate();

    useEffect(() => {
        // Initialize jobs with local data
        setAllJobs(jobs);
        setFilteredJobs(jobs);
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const applyFilters = () => {
        let filtered = allJobs;

        if (filters.skill) {
            filtered = filtered.filter((job) =>
                job.job_title.toLowerCase().includes(filters.skill.toLowerCase())
            );
        }

        if (filters.location) {
            filtered = filtered.filter((job) =>
                job.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        if (filters.datePosted) {
            filtered = filtered.filter((job) =>
                new Date(job.date_posted) >= new Date(filters.datePosted)
            );
        }

        setFilteredJobs(filtered);
    };

    const handlePostJobClick = () => {
        const isAuthenticated = !!localStorage.getItem("access_token");
        if (isAuthenticated) {
            navigate("/createjob");
        } else {
            navigate("/login"); // Redirect to login if not authenticated
        }
    };

    return (
        <>
            <Navbar />
            <div className="joblisting mx-10 md:mx-40">
                <div className="header flex flex-wrap justify-between items-center py-10 rounded-sm">
                    <div className="filters bg-slate-300 flex flex-wrap p-4 rounded gap-4 w-full md:w-auto">
                        <input
                            type="text"
                            name="skill"
                            placeholder="Filter by skill"
                            value={filters.skill}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="text"
                            name="location"
                            placeholder="Filter by location"
                            value={filters.location}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <input
                            type="date"
                            name="datePosted"
                            value={filters.datePosted}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={applyFilters}
                            className="bg-green-600 text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                        >
                            Apply Filters
                        </button>
                    </div>
                </div>
                <div className="post-job flex justify-center my-6">
                    <button
                        onClick={handlePostJobClick}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Post a Job
                    </button>
                </div>
                <div className="jobs w-[100%] lg:flex lg:flex-wrap gap-5">
                    {filteredJobs.length > 0 ? (
                        filteredJobs.map((job, index) => (
                            <JobCard info={job} key={index} />
                        ))
                    ) : (
                        <p className="text-center text-gray-500">No jobs found. Try adjusting your filters.</p>
                    )}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default JobListingPage;
