"use client";

import { useState } from 'react';
import { SignIn } from '@clerk/nextjs';
import Link from 'next/link';
import Footer from '../../../components/Footer';

export default function SignInPage() {
  const [isAdminLogin, setIsAdminLogin] = useState(false);

  return (
    <>
      {/* Do not show Navbar on SignIn page */}
      
      <div className={`min-h-screen flex flex-col items-center justify-center ${
        !isAdminLogin
          ? "bg-cover bg-center bg-no-repeat"
          : "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
      }`} style={{
        backgroundImage: !isAdminLogin ? "url('/assets/images/tourist-bg.jpg')" : "none"
      }}>
        <div className="w-full max-w-md mb-6 text-center z-50 relative">
          <img className="mx-auto h-12 w-auto transition-transform duration-300 hover:scale-110 hover:rotate-3" src="/assets/images/toursafe.png" alt="TourSafe" />
          <h2 className="mt-6 text-3xl font-extrabold text-white animate-pulse">Welcome to TourSafe</h2>
          <div className="mt-4 flex justify-center gap-4">
            <button
              onClick={() => setIsAdminLogin(false)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                !isAdminLogin ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Tourist Login
            </button>
            <button
              onClick={() => setIsAdminLogin(true)}
              className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                isAdminLogin ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
              }`}
            >
              Admin Login
            </button>
          </div>
        </div>

        <div className="w-full max-w-md z-50">
          {!isAdminLogin ? (
            <>
                <SignIn
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                afterSignInUrl="/tourist-info"
                appearance={{
                  elements: {
                    formButtonPrimary: 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700',
                    card: 'bg-white/90 backdrop-blur-sm border border-white/20',
                    headerTitle: 'text-gray-900',
                    headerSubtitle: 'text-gray-600',
                    formFieldLabel: 'text-gray-700',
                    formFieldInput: 'border-gray-300 focus:border-blue-500 focus:ring-blue-500',
                    footerActionLink: 'text-blue-600 hover:text-blue-500'
                  }
                }}
              />
              <div className="mt-6 text-center z-50">
                <Link href="/learn-more" legacyBehavior>
                  <a className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition">
                    Learn More
                  </a>
                </Link>
              </div>
            </>
          ) : (
            <form
              className="bg-white/90 backdrop-blur-sm border border-white/20 p-6 rounded-lg shadow-md"
              onSubmit={async (e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const adminId = form.adminId.value;
                const adminPassword = form.adminPassword.value;

                const res = await fetch('/api/admin-login', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ adminId, adminPassword }),
                });

                const data = await res.json();

                if (data.success) {
                  alert('Login successful');
                  // Redirect to admin dashboard or other page
                  window.location.href = '/admin-dashboard';
                } else {
                  alert(data.message || 'Login failed');
                }
              }}
            >
              <h3 className="text-xl font-semibold mb-4 text-gray-900">Admin Login</h3>
              <label className="block mb-2 text-gray-700" htmlFor="adminId">Admin ID</label>
              <input
                id="adminId"
                name="adminId"
                type="text"
                className="w-full mb-4 p-2 border border-gray-300 rounded transition-colors hover:border-blue-400 focus:border-blue-500"
                placeholder="Enter Admin ID"
              />
              <label className="block mb-2 text-gray-700" htmlFor="adminPassword">Password</label>
              <input
                id="adminPassword"
                name="adminPassword"
                type="password"
                className="w-full mb-4 p-2 border border-gray-300 rounded transition-colors hover:border-blue-400 focus:border-blue-500"
                placeholder="Enter Password"
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-2 px-4 rounded-lg"
              >
                Login
              </button>
              <p className="mt-4 text-sm text-gray-600">
                Not an admin? <Link href="/sign-in" legacyBehavior><a className="text-blue-600 hover:underline">Switch to Tourist Login</a></Link>
              </p>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
