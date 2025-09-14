'use client';

import { SignUp } from '@clerk/nextjs';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img className="mx-auto h-12 w-auto" src="/assets/images/toursafe.png" alt="TourSafe" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">Join TourSafe</h2>
          <p className="mt-2 text-gray-300">Create your account to get started</p>
        </div>
        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/"
          // onError prop removed because it is not supported by SignUp component
          // You may handle errors differently if needed

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
      </div>
    </div>
  );
}
