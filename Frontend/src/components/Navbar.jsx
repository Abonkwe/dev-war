import ButtonPrimary from "./ButtonPrimary";
import { Link } from "react-router-dom";
const Navbar  = ()=>{
    return(
        <div className="navbar flex justify-between mx-40 items-center mt-4">
                <div className="logo font-black text-[#19995C] text-xl">
                        <h1>LanceCam</h1>
                </div>
                <div className="menu">
                    <ul className="flex gap-5 font-bold text-xl">
                        <li className="active">Home</li>
                        <li>About</li>
                        <li>Contacts</li>
                        <li>FAQs</li>
                    </ul>
                </div>
                <div className="postjob">
                   <Link to={"/createjob"}><ButtonPrimary label={"Post a Job"}/></Link> 
                </div>
        </div>
    )
}

export default Navbar;