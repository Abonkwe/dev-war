import { useEffect, useState } from "react";
import ButtonPrimary from "../components/ButtonPrimary";
import { getalljobs } from "../CrudOperations/crud";

const JobListingPage =()=>{
    const [job, setJobs] = useState({})
    const [getError, setGetError] = useState('')

    useEffect(async ()=>{
        res = await getAllJobs();
        const res = await getalljobs(setGetError);
        if (res){
            res = setJobs(res)
        }else{

        }
    },[])
    return(
        <div className="joblisting mx-40">
            <div className="header flex justify-between py-10 rounded-sm">
                    <div className="filters bg-slate-300 flex p-4">
                        <div className="type active rounded-sm p-4 font-bold text-lg">Skill</div>
                        <div className="location rounded-sm p-4 font-bold text-lg">Location</div>
                        <div className="dateposted rounded-sm p-4 font-bold text-lg">Date</div>
                    </div>
                    <div className="post-job">
                        <ButtonPrimary label={"Post a job"}/>
                    </div>
            </div>
            <div className="jobs w-[100%] flex flex-wrap gap-5">
               { 
                job &&
               jobs.forEach((job) => {
                    <Job/>
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

const Job =()=>{
    const applyForJob = async()=>{

    };
    return(
        <div className="job shadow-xl rounded-sm p-4 w-[30%]">
            <div className="profile">
                <div className="profile-info flex items-center gap-4">
                    <img src="user-black.svg" alt="" className="w-10" />
                    <div className="names font-bold">
                        <p>Tayu Prosper</p>
                    </div>
                </div>
                <div className="description font-bold">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Velit, ducimus, eveniet corrupti perspiciatis dicta 
                     cumque reprehenderit quibusdam ea minima repellat soluta, sunt ipsum 
                    sequi nesciunt eligendi molestias numquam impedit vel....
                </div>
                <div className="jobtype bg-slate-300 p-2 rounded-lg text-[#19995C] font-black">
                        painting
                </div>
                <div className="actions py-5 flex justify-between">
                    <button className="bg-[#19995C] p-3 rounded-sm  font-bold text-white" onClick={applyForJob}>Apply</button>
                    <button className="bg-[#19995C] p-3 rounded-sm  font-bold text-white">Save for later</button>
                </div>
            </div>
        </div>
    )
}