import { useEffect, useState } from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import { getalljobs } from "../CrudOperations/crud";
import Job from "../components/JobCard";
import { Link } from "react-router-dom";

const JobListingPage =()=>{
    const [job, setJobs] = useState([])
    const [getError, setGetError] = useState('')

    const fetchAllJobs = async ()=>{
        const res = await getalljobs(setGetError);
        if (res){
            setJobs(res.data)
            console.log(res.data)
        }else{
            return;
        }
    }

    useEffect(()=>{
        fetchAllJobs();
    },[])
    return(
        <div className="joblisting mx-40">
            <div className="header flex justify-between items-center py-10 rounded-sm">
                    <div className="filters bg-slate-300 flex p-2 rounded">
                        <div className="type active rounded-sm p-4 font-bold text-lg">Skill</div>
                        <div className="location rounded-sm p-4 font-bold text-lg">Location</div>
                        <div className="dateposted rounded-sm p-4 font-bold text-lg">Date</div>
                    </div>
                    <div className="post-job">
                        <Link to={"/postjob"}><ButtonPrimary label={"Post a job"}/></Link>
                    </div>
            </div>
            <div className="jobs w-[100%] lg:flex lg:flex-wrap gap-5">
               { 
                job &&
               job.map((j,i) => {
                return <Job key={i}/>
                    
                })
                }
                {
                    getError && <p>
                    </p>
                }
            </div>
        </div>
    )
}
export default JobListingPage;
