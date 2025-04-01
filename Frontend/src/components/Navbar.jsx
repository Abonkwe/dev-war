import React, { useState, useEffect } from 'react';
import ButtonPrimary from "./ButtonPrimary";
import { Link, useNavigate } from 'react-router-dom';
// import {FaBeer} from "react-icons/md"
import { FaBell, FaUser } from "react-icons/fa";
import { getCurrentUser } from '../auth/auth';
// import Fa

const Navbar = () => {
    const user = getCurrentUser()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("access_token");
        setIsAuthenticated(!!accessToken); // Check if the user is authenticated
    }, []);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handlePostJobClick = () => {
        if (isAuthenticated) {
            navigate("/createjob");
        } else {
            navigate("/login"); // Redirect to login if not authenticated
        }
    };

    return (
        <div className="navbar flex justify-between items-center my-4 mx-5 md:mx-40 relative">
            <div className="logo font-black text-[#19995C] text-xl">
                <h1>LanceCam</h1>
            </div>
            <div className="hidden md:flex menu">
                <ul className="flex gap-5 font-bold text-xl">
                    <li>
                        <Link to="/" className="hover:underline">Home</Link>
                    </li>
                    <li>
                        <Link to="/explore" className="hover:underline">Explore</Link>
                    </li>
                    <li>
                        <Link to="/profile" className="hover:underline">Profile</Link>
                    </li>
                    <li>
                        <Link to="/about" className="hover:underline">About</Link>
                    </li>
                    <li>
                        <Link to="/faqs" className="hover:underline">FAQs</Link>
                    </li>
                </ul>
            </div>
            <div className="postjob hidden md:flex md:gap-4 md:items-center">
                {

                user ? 
                <>
           <Link className='bg-[#19995C] p-3  rounded-full flex flex-col' to={"/notification"}>
           <div className="new-notification h-2 w-2 bg-red-500 self-end rounded-full"></div> 
           <FaBell style={{ color: "white"}}/>
           </Link> 
           <Link className='bg-[#19995C] p-4 rounded-full' to={"/userprofile"}>
           <FaUser style={{ color: "white"}}/></Link> 
                <button
                    onClick={handlePostJobClick}
                    className="p-2 bg-[#19995C] border-3 border-[#19995c] text-white rounded hover:bg-green-600"
                >
                    Post a Job
                </button>
                </>:
                <>
                <Link to={"/login"}>
                <button className='bg-[#19995C] font-bold p-3 text-white rounded hover:bg-green-600"'>Login</button>
               </Link>
               <Link to={"/signup"}>
                <button className='px-4 py-2 border-2 border-[#19995C] font-bold rounded hover:bg-green-600"'>Signup</button>
               </Link>
                </>
               
}
                
            </div>
            
            
            {/* Hamburger Icon for Mobile */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-gray-500 focus:outline-none">
                    {isMenuOpen ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                </button>
            </div>
            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden z-50">
                    <ul className="flex flex-col gap-5 p-5 font-bold text-xl">
                        {["Home", "Explore", "Profile", "Notifications"].map((item, index) => (
                            <li key={index} className="hover:underline transition duration-300 ease-in-out">
                                <Link to={`/${item.toLowerCase()}`} className="block">{item}</Link>
                            </li>
                        ))}
                        <li>
                            <button
                                onClick={handlePostJobClick}
                                className="block px-4 py-2 bg-[#19995c] text-white rounded hover:bg-green-600 text-center"
                            >
                                Post a Job
                            </button>
                        </li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;