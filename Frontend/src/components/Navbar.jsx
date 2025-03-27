import React, { useState } from 'react';
import ButtonPrimary from "./ButtonPrimary";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="navbar flex justify-between items-center my-4 mx-5 md:mx-40">
            <div className="logo font-black text-[#19995C] text-xl">
                <h1>LanceCam</h1>
            </div>
            <div className="hidden md:flex menu">
                <ul className="flex gap-5 font-bold text-xl">
                    <li>Home</li>
                    <li>About</li>
                    <li>Contacts</li>
                    <li>FAQs</li>
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
                <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden">
                    <ul className="flex flex-col gap-5 p-5 font-bold text-xl">
                        <li>Home</li>
                        <li>About</li>
                        <li>Contacts</li>
                        <li>FAQs</li>
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Navbar;