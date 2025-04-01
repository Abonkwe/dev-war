import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import JobCard from "../components/JobCard";
import { townsInCameroon } from "./PostJob";
import { getAccessToken, getCurrentUser } from "../auth/auth";
// Remove the import of local jobs data, you should use the api instead.
// import jobs from "../data/jobs";
import { useNavigate } from "react-router-dom";

const JobListingPage = () => {

    
   
    const [jobs, setJobs] = useState([]); // Store all jobs
    const [filteredJobs, setFilteredJobs] = useState([]);
    const [isFiltered, setIsFiltered] = useState(false);
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
            const response = await fetch('http://127.0.0.1:5000/get-all-jobs');
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            
            if (data) {
                // Assuming the response has a `jobs` array
                // setIsFiltered(false)
                console.log(data)
                setJobs(data);
                // setFilteredJobs(data);
                // applyFilters()
            }
        } catch (err) {
            console.error("Failed to fetch jobs:", err);
            setGetError("Failed to fetch jobs. Please try again later.");
        }
    };

    useEffect(() => {
        fetchAllJobs(); // Call the API function when the component mounts;
    }, []);

    const handleFilterChange = (e) => {
        setIsFiltered(true);
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
        applyFilters();
    };


    const applyFilters = () => {
        // filters.array.forEach(element => {
        // console.log(element.value)
        // });
        let filtered = jobs.jobs;
        if (!isFiltered){
            console.log("no filters selected!!")
            setFilteredJobs(filtered);
        }else{
        // console.log(filtered);
        // Filter by skill
        if (filters.skill) {
            filtered = filtered.filter((job) =>{
              // Assuming job.skills is an array of strings or the job title if not
                   return  job.skill.toLowerCase().includes(filters.skill.toLowerCase())
               }
             )}

        // Filter by location
        if (filters.location) {
            filtered = filtered.filter((job) =>{
                return job.location.toLowerCase().includes(filters.location.toLowerCase())}
            );
        }

        // Filter by date posted
        if (filters.datePosted) {
            filtered = filtered.filter((job) =>
                new Date(job.date_posted) >= new Date(filters.datePosted)
            );
        }

        setFilteredJobs(filtered);
    }
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

    const removeAllFilters = ()=>{
        setFilters(()=> ({
            datePosted: "",
            location: "",
            skill: ""
        }))

        applyFilters();
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
                       <select
                                    id="location"
                                    name="location"
                                    value={filters.skill}
                                    onChange={handleFilterChange}
                                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                                  >
                                    <option value="">Select a town</option>
                                    {townsInCameroon.map((town, index) => (
                                      <option key={index} value={town}>{town}</option>
                                    ))}
                                  </select>
                        <input
                            type="date"
                            name="datePosted"
                            value={filters.datePosted}
                            onChange={handleFilterChange}
                            className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        <button
                            onClick={removeAllFilters}
                            className="bg-[#19995c] text-white font-bold py-2 px-4 rounded-md hover:bg-green-700 transition duration-200"
                        >
                            Remove Filters
                        </button>
                    </div>
                </div>
                <div className="post-job mx-30 flex justify-between my-6">
                    <h1 className="font-bold text-2xl">{filteredJobs.length} Total Jobs Available</h1>
                    <button
                        onClick={handlePostJobClick}
                        className="px-4 font-bold py-2 bg-[#19995c] text-white rounded hover:bg-green-600"
                    >
                        Post a Job
                    </button>
                </div>
                <div className="jobs w-[100%] lg:flex lg:flex-wrap gap-5">
                    {filteredJobs.length > 0 ? (
                        // applyFilters();
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
