const JobCard = ({ info }) => {
    return (
        <div className="job shadow-lg rounded-lg p-6 bg-white lg:w-[30%] my-4 border">
            <div className="profile-info mb-4">
                <h3 className="text-xl font-bold text-[#19995C]">{info.job_title}</h3>
                <p className="text-gray-600">{info.description}</p>
            </div>
            <div className="details text-sm text-gray-500">
                <p><strong>Location:</strong> {info.location}</p>
                <p><strong>Posted on:</strong> {new Date(info.date_posted).toLocaleDateString()}</p>
                <p><strong>Contact:</strong> {info.contact_email}</p>
            </div>
            <div className="actions mt-4 flex justify-between">
                <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
                    Apply Now
                </button>
                <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400">
                    Save for Later
                </button>
            </div>
        </div>
    );
};

export default JobCard;