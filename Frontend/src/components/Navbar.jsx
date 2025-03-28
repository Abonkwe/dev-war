import React, { useState, useEffect } from 'react';
import ButtonPrimary from "./ButtonPrimary";
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
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
                        <Link to="/notifications" className="hover:underline">Notifications</Link>
                    </li>
                </ul>
            </div>
            <div className="postjob hidden md:block">
                <button
                    onClick={handlePostJobClick}
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                    Post a Job
                </button>
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
                                className="block px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 text-center"
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