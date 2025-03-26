const JobListingPage =()=>{
    return(
        <div className="joblisting">
            <div className="header">

            </div>
            <div className="jobs">
                <Job/>
            </div>
        </div>
    )
}
export default JobListingPage;

const Job =()=>{
    return(
        <div className="job">
            <div className="profile">
                <div className="profile-info">
                    <img src="" alt="" />
                    <div className="names">
                        <p>Tayu Prosper</p>
                    </div>
                </div>
                

            </div>
        </div>
    )
}