import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-green-600 text-white py-8">
            <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Company Info */}
                <div>
                    <h2 className="text-xl font-bold">LanceCam</h2>
                    <p className="mt-2 text-sm">
                        Helping you find the right job with ease.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold">Quick Links</h3>
                    <ul className="mt-2 space-y-2">
                        <li><a href="#" className="hover:underline">About Us</a></li>
                        <li><a href="#" className="hover:underline">Browse Jobs</a></li>
                        <li><a href="#" className="hover:underline">Post a Job</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </div>

                {/* Social Media */}
                <div>
                    <h3 className="text-lg font-semibold">Follow Us</h3>
                    <div className="mt-2 flex space-x-4">
                        <a href="#" className="text-white text-2xl hover:text-gray-200" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.36 4.64A9 9 0 109 21.36V12H6v-3h3V8.28C9 5.42 10.79 4 13.36 4c1.98 0 3.64.14 4.14.2v3.2h-2.26C14.01 7.5 14 8.3 14 9.28V12h4l-1 3h-3v9.36A9 9 0 0018.36 4.64z" />
                            </svg>
                        </a>
                        <a href="#" className="text-white text-2xl hover:text-gray-200" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 8.59A10.003 10.003 0 0112 21a10.003 10.003 0 01-9-12.44M21 8.59l-3.5 3.5M21 8.59L16.5 4" />
                            </svg>
                        </a>
                        <a href="#" className="text-white text-2xl hover:text-gray-200" aria-label="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16.5 0h-9A1.5 1.5 0 006 1.5v21A1.5 1.5 0 007.5 24h9a1.5 1.5 0 001.5-1.5V1.5A1.5 1.5 0 0016.5 0zM10.5 20h-3v-8h3v8zm-1.5-9.5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM18 20h-3v-4.5c0-1.1-.9-2-2-2s-2 .9-2 2V20h-3v-8h3v1.5c.4-.8 1.4-1.5 2.5-1.5 2.5 0 4.5 2 4.5 4.5V20z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>

            <div className="text-center text-sm mt-8 border-t border-white pt-4">
                &copy; {new Date().getFullYear()} JobSite. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;