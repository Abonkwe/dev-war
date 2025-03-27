
const Job =()=>{
    const applyForJob = async()=>{

    };
    return(
        <div className="job shadow-xl rounded-sm p-7 lg:w-[30%]">
            <div className="profile ">
                <div className="profile-info my-3 bg-slate-200 p-2 rounded flex items-center gap-4">
                    <img src="user-black.svg" alt="" className="w-13" />
                    <div className="names flex flex-col">
                        <p  className="font-bold">Tayu Prosper</p>
                        <p className="text-slate-400">email@someone.com</p>
                    </div>
                </div>
                <div className="description font-bold my-3">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                     Velit, ducimus, eveniet corrupti perspiciatis dicta 
                     cumque reprehenderit quibusdam ea minima repellat soluta, sunt ipsum 
                    sequi nesciunt eligendi molestias numquam impedit vel....
                </div>
                <div className="jobtype  text-[#19995C] font-black">
                        <p className="bg-slate-300 p-1 rounded">painting</p>
                </div>
                <div className="actions py-5 flex justify-around">
                    <button className="bg-[#19995C] p-3 rounded-sm  font-bold text-white" onClick={applyForJob}>Apply</button>
                    <button className="bg-[#19995C] p-3 rounded-sm  font-bold text-white">Save for later</button>
                </div>
            </div>
        </div>
    )
}

export default Job;