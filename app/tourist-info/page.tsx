"use client";

import Link from 'next/link';

export default function TouristInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-sm max-w-4xl mx-auto p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome, Tourist!</h1>
        <p className="mb-6 text-center text-lg">
          Here is some important information for your tour. Stay safe and enjoy your journey!
        </p>
        <div className="flex justify-center gap-6">
          <Link href="/learn-more" legacyBehavior>
            <a className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
              Learn More
            </a>
          </Link>
          <Link href="/contact" legacyBehavior>
            <a className="px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition">
              Contact Us
            </a>
          </Link>
          {/* Add more buttons as needed */}
        </div>
      </div>
    </div>
  );
}
