
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

export default Job;