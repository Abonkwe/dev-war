import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import ButtonPrimary from "../components/ButtonPrimary";
import { useNavigate } from "react-router-dom";
import JobCard from "../components/JobCard";
import jobs from "../data/jobs"; // Import local jobs data

const JobListingPage = () => {
    const [jobs, setJobs] = useState([]);
    const [getError, setGetError] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({
        skill: "",
        location: "",
        datePosted: "",
    });

    const fetchAllJobs = async () => {
        try {
            const res = await getalljobs();
            if (res.jobs) {
                setJobs(res.jobs);
                setFilteredJobs(res.jobs);
            }
        } catch (err) {
            setGetError("Failed to fetch jobs. Please try again later.");
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        let filtered = jobs;
        if (filters.skill) {
            filtered = filtered.filter((job) =>
                job.skills.includes(filters.skill)
            );
        }
        if (filters.location) {
            filtered = filtered.filter(
                (job) => job.location === filters.location
            );
        }
        if (filters.datePosted) {
            filtered = filtered.filter(
                (job) => new Date(job.datePosted) >= new Date(filters.datePosted)
            );
        }
        setFilteredJobs(filtered);
    };

    const handlePostJobClick = () => {
        // Navigate to post job page
    };

    useEffect(() => {
        // Initialize jobs with local data
        setJobs(jobs);
        setFilteredJobs(jobs);
    }, []);

    if (getError) {
        return <div className="text-red-500 text-center mt-10">{getError}</div>;
    }

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
