"use client";

import { useRouter } from "next/navigation";

export default function TermsPrivacyPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              📋 Terms & Privacy Policy
            </h1>
            <button
              onClick={() => router.push('/tourist')}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition duration-300"
            >
              ← Back
            </button>
          </div>

          {/* Terms of Service */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              📜 Terms of Service
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  1. Acceptance of Terms
                </h3>
                <p>
                  By accessing and using TourSafe, you accept and agree to be bound by the terms and provision
                  of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  2. Use License
                </h3>
                <p>
                  Permission is granted to temporarily use TourSafe for personal, non-commercial transitory
                  viewing only. This is the grant of a license, not a transfer of title, and under this license
                  you may not:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose</li>
                  <li>Attempt to decompile or reverse engineer any software</li>
                  <li>Remove any copyright or other proprietary notations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  3. Emergency Services Disclaimer
                </h3>
                <p>
                  TourSafe provides emergency assistance features but does not guarantee immediate response
                  times or successful outcomes. Emergency services availability depends on your location
                  and local infrastructure. Always contact local emergency services directly when in danger.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  4. User Responsibilities
                </h3>
                <p>
                  Users are responsible for maintaining the confidentiality of their account information
                  and for all activities that occur under their account. Users must provide accurate
                  information and update it as necessary.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  5. Service Availability
                </h3>
                <p>
                  While we strive for 99.9% uptime, TourSafe does not guarantee uninterrupted service.
                  We reserve the right to modify or discontinue the service with reasonable notice.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Policy */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
              🔒 Privacy Policy
            </h2>

            <div className="space-y-6 text-gray-600 dark:text-gray-300">
              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  1. Information We Collect
                </h3>
                <p>
                  We collect information you provide directly to us, such as when you create an account,
                  use our services, or contact us for support. This includes:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Name, email address, and contact information</li>
                  <li>Location data for safety and emergency services</li>
                  <li>Device information and usage data</li>
                  <li>Emergency contact information</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  2. How We Use Your Information
                </h3>
                <p>
                  We use the information we collect to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Send you technical notices and support messages</li>
                  <li>Respond to your comments and questions</li>
                  <li>Provide emergency assistance when requested</li>
                  <li>Monitor and analyze usage patterns</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  3. Information Sharing
                </h3>
                <p>
                  We do not sell, trade, or otherwise transfer your personal information to third parties
                  except in the following circumstances:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>With your explicit consent</li>
                  <li>To comply with legal obligations</li>
                  <li>To protect the rights and safety of users</li>
                  <li>During emergency situations to provide assistance</li>
                  <li>With trusted service providers who assist our operations</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  4. Data Security
                </h3>
                <p>
                  We implement appropriate security measures to protect your personal information against
                  unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  5. Your Rights
                </h3>
                <p>
                  You have the right to:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                  <li>Access and update your personal information</li>
                  <li>Request deletion of your data</li>
                  <li>Opt out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Lodge a complaint with supervisory authorities</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
              📞 Contact Us
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              If you have any questions about these Terms and Privacy Policy, please contact us:
            </p>
            <div className="space-y-2 text-gray-600 dark:text-gray-300">
              <p><strong>Email:</strong> privacy@toursafe.com</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
              <p><strong>Address:</strong> 123 Safety Street, Secure City, SC 12345</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Last updated: December 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
