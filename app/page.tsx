import Link from "next/link";
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function Home() {
  return (
    <>
      <SignedIn>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          <div className="container mx-auto px-4 py-16">
            <div className="text-center">
              <img className="mx-auto h-16 w-auto mb-8" src="/assets/images/toursafe.png" alt="TourSafe" />
              <h1 className="text-4xl font-bold text-white mb-4">Tourist Dashboard</h1>
              <p className="text-xl text-gray-300 mb-8">Access all your safety and travel features</p>

              <div className="mb-12 text-center">
                <p className="text-lg text-gray-200 mb-4">
                  TourSafe is designed to ensure your safety while traveling. Use the features below to stay protected, report issues, and manage your travel documents.
                </p>
                <p className="text-md text-gray-400">
                  Explore real-time safety maps, track your location, access emergency SOS, report scams, manage your ID card, and calculate your safety score.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <Link href="/safety-map">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                    <h3 className="text-xl font-semibold text-white mb-4">Safety Map</h3>
                    <p className="text-gray-300">View safe zones and potential risks in your area.</p>
                  </div>
                </Link>

                <Link href="/track">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                    <h3 className="text-xl font-semibold text-white mb-4">Real-time Tracking</h3>
                    <p className="text-gray-300">Share your location with trusted contacts for safety.</p>
                  </div>
                </Link>

                <Link href="/sos">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                    <h3 className="text-xl font-semibold text-white mb-4">Emergency SOS</h3>
                    <p className="text-gray-300">Quick access to emergency services when needed.</p>
                  </div>
                </Link>

                <Link href="/report-scam">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                    <h3 className="text-xl font-semibold text-white mb-4">Report Scams</h3>
                    <p className="text-gray-300">Report suspicious activities and scams.</p>
                  </div>
                </Link>

                <Link href="/id-card">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                    <h3 className="text-xl font-semibold text-white mb-4">ID Card</h3>
                    <p className="text-gray-300">Manage your tourist ID and documents.</p>
                  </div>
                </Link>

                <Link href="/safety-score">
                  <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20 hover:bg-white/20 transition cursor-pointer">
                    <h3 className="text-xl font-semibold text-white mb-4">Tourist Safety Score</h3>
                    <p className="text-gray-300">Calculate your safety score based on location and conditions.</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
