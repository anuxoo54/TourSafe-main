"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useClerk } from "@clerk/nextjs";

export default function TouristLanding() {
  const [showTourSafe, setShowTourSafe] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const { signOut } = useClerk();

  useEffect(() => {
    setShowTourSafe(true);
    const timer = setTimeout(() => {
      setShowTourSafe(false);
    }, 3000); // Show for 3 seconds
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen flex items-center justify-center transition-colors duration-500 ${
        darkMode ? 'dark bg-gray-900' : 'bg-green-gradient'
      }`}
    >
      {showTourSafe && (
        <div className="fixed top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none">
          <h1 className="text-6xl font-extrabold text-white drop-shadow-lg animate-fade-in-out">
            TourSafe
          </h1>
        </div>
      )}
      <div className="absolute top-4 right-4 z-10 flex space-x-2">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="bg-gray-800/70 hover:bg-gray-700/70 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button
          onClick={() => signOut()}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          Logout
        </button>
      </div>
      <div className="bg-black/50 backdrop-blur-sm rounded-lg p-8 max-w-2xl mx-4 text-center transition-all duration-500 hover:bg-black/60 hover:scale-105 shadow-2xl">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Welcome to TourSafe
        </h1>
        <p className="text-xl text-gray-200 mb-8 drop-shadow-md">
          Your trusted companion for safe and secure travel. Explore our features designed to protect tourists worldwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
              Learn More
            </button>
          </Link>
          <Link href="/contact">
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
              Contact Us
            </button>
          </Link>
          <Link href="/feedback">
            <button className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
              Feedback & Report
            </button>
          </Link>
          <Link href="/safety-tips">
            <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
              Safety Tips
            </button>
          </Link>
          <button
            onClick={() => window.open('/safety-tips', '_blank')}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
          >
            📄 Download Safety Tips
          </button>
          <Link href="/SosConfirm">
            <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl">
              Emergency SOS
            </button>
          </Link>
        </div>
      </div>
      <style jsx>{`
        @keyframes fade-in-out {
          0%, 100% { opacity: 0; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        .animate-fade-in-out {
          animation: fade-in-out 3s ease-in-out forwards;
        }
      `}</style>
    </div>
  );
}
