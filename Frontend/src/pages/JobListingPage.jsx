import { useEffect, useState } from "react";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
// Remove the import of local jobs data, you should use the api instead.
// import jobs from "../data/jobs";
import { useNavigate } from "react-router-dom";

const JobListingPage = () => {
    const [jobs, setJobs] = useState([]); // Store all jobs
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [filters, setFilters] = useState({
        skill: "",
        location: "",
        datePosted: "",
    });
    const [getError, setGetError] = useState("");
    const navigate = useNavigate();

    const fetchAllJobs = async () => {
        try {
            // replace the getalljobs() function with your real api call
            // Example of an API call, replace it with yours.
            const response = await fetch('/api/jobs');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            if (data) {
                // Assuming the response has a `jobs` array
                setJobs(data);
                setFilteredJobs(data);
            }
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
            setGetError("Failed to fetch jobs. Please try again later.");
        }
    };

    useEffect(() => {
        fetchAllJobs(); // Call the API function when the component mounts
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const applyFilters = () => {
        let filtered = jobs;

        // Filter by skill
        if (filters.skill) {
            filtered = filtered.filter((job) =>
              // Assuming job.skills is an array of strings or the job title if not
              (Array.isArray(job.skills) ? job.skills : [job.job_title || '']).some((skill) =>
                skill.toLowerCase().includes(filters.skill.toLowerCase())
              )
            );
        }

        // Filter by location
        if (filters.location) {
            filtered = filtered.filter((job) =>
                job.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        // Filter by date posted
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
            navigate("/login");
        }
    };

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
