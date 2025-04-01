import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <footer className="bg-[#19995C] bottom-0 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap justify-between">
                    {/* Company Info */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">LanceCam</h3>
                        <p className="text-white">
                            LanceCam connects freelancers and employers, providing opportunities for growth and collaboration.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="w-full md:w-1/3 mb-6 md:mb-0">
                        <h3 className="text-lg font-bold mb-4">Quick Links</h3>
                        <ul className="text-white">
                            <li className="mb-2">
                                <Link to="/" className="hover:underline">Home</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/explore" className="hover:underline">Explore Jobs</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/createjob" className="hover:underline">Post a Job</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/profile" className="hover:underline">Profile</Link>
                            </li>
                            <li className="mb-2">
                                <Link to="/notifications" className="hover:underline">Notifications</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full md:w-1/3">
                        <h3 className="text-lg font-bold mb-4">Contact Us</h3>
                        <p className="text-white">Email: support@lancecam.com</p>
                        <p className="text-white">Phone: +237 123 456 789</p>
                        <p className="text-white">Address: Douala, Cameroon</p>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-10 text-center text-white">
                    <p>&copy; {new Date().getFullYear()} LanceCam. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;