import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import { useClerk } from '@clerk/nextjs';

const Footer: React.FC = () => {
  const { signOut } = useClerk();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <>
      <footer className="bg-white-1 text-white py-6 border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Logo or Brand Name */}
            <div className="mb-4 md:mb-0">
              <a href="/" className="text-2xl font-bold">
                TourSafe
              </a>
            </div>

            {/* Navigation Links */}
            <div className="flex space-x-4 mb-4 md:mb-0">
              <a href="#" className="hover:underline">
                Home
              </a>
              <a href="#" className="hover:underline">
                About
              </a>
              <a href="#" className="hover:underline">
                Features
              </a>
              <a href="#" className="hover:underline">
                Contact
              </a>
              <a href="/feedback" className="hover:underline">
                Feedback & Report
              </a>
              <a href="/safety-tips" className="hover:underline">
                Safety Tips
              </a>
              <a href="/SosConfirm" className="hover:underline">
                Emergency SOS
              </a>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 items-center">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="bg-gray-800/70 hover:bg-gray-700/70 text-white px-3 py-1 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 mr-4"
              >
                {darkMode ? '☀️ Light' : '🌙 Dark'}
              </button>
              <button
                onClick={() => signOut()}
                className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Logout
              </button>
              <a href="#" aria-label="Facebook" className="hover:text-gray-400 ml-4">
                <FaFacebook />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-gray-400">
                <FaTwitter />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-gray-400">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center mt-4 text-sm">
            © {new Date().getFullYear()} TourSafe. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Removed duplicate blank footer for cleaner layout */}
    </>
  );
};

export default Footer;
