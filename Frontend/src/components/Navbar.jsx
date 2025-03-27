import React, { useState } from 'react';
import ButtonPrimary from "./ButtonPrimary";
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        console.log("Menu Open:", !isMenuOpen); // Debugging line
    };

    return (
        <div className="navbar flex justify-between items-center my-4 mx-5 md:mx-40 relative">
            <div className="logo font-black text-[#19995C] text-xl">
                <h1>LanceCam</h1>
            </div>
            <div className="hidden md:flex menu">
                <ul className="flex gap-5 font-bold text-xl">
                    {["Home", "About", "Contacts", "FAQs"].map((item) => (
                        <li key={item} className="relative group">
                            <span className="transition duration-300 ease-in-out hover:underline md:group-hover:underline">
                                {item}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="postjob hidden md:block">
                <ButtonPrimary label={"Post a Job"} />
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
                        {["Home", "About", "Contacts", "FAQs"].map((item) => (
                            <li key={item} className="hover:underline transition duration-300 ease-in-out">
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;