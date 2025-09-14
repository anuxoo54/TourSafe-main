"use client";

import { useRouter } from "next/navigation";

export default function AboutUsPage() {
  const router = useRouter();

  const features = [
    {
      title: "Real-time Safety Monitoring",
      description: "Advanced GPS tracking and geofencing technology to keep tourists safe.",
      icon: "📍"
    },
    {
      title: "Emergency SOS System",
      description: "One-tap emergency alert system with instant notifications to authorities and contacts.",
      icon: "🚨"
    },
    {
      title: "Digital ID Verification",
      description: "Secure blockchain-based digital identity for seamless travel experiences.",
      icon: "🆔"
    },
    {
      title: "Tour Guide Matching",
      description: "AI-powered matching system to connect tourists with verified local guides.",
      icon: "👥"
    },
    {
      title: "Safety Zone Mapping",
      description: "Interactive maps showing safe areas, emergency services, and tourist hotspots.",
      icon: "🗺️"
    },
    {
      title: "Multi-language Support",
      description: "Comprehensive support for multiple languages and cultural contexts.",
      icon: "🌐"
    }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Chief Technology Officer",
      expertise: "AI & Machine Learning",
      image: "👩‍💼"
    },
    {
      name: "Michael Chen",
      role: "Head of Security",
      expertise: "Cybersecurity & Blockchain",
      image: "👨‍💻"
    },
    {
      name: "Priya Patel",
      role: "Travel Safety Expert",
      expertise: "Risk Assessment & Emergency Response",
      image: "👩‍⚕️"
    },
    {
      name: "Ahmed Hassan",
      role: "International Relations",
      expertise: "Global Partnerships & Compliance",
      image: "👨‍💼"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              ℹ️ About TourSafe
            </h1>
            <button
              onClick={() => router.push('/tourist')}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition duration-300"
            >
              ← Back
            </button>
          </div>

          {/* Mission Section */}
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              TourSafe is revolutionizing travel safety by combining cutting-edge technology with comprehensive
              support systems. We empower tourists worldwide to explore confidently, knowing they have
              advanced protection and instant access to help when they need it most.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              🚀 Our Technology
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-3xl mb-4 text-center">{feature.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm text-center">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Impact Stats */}
          <div className="mb-12 p-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white">
            <h2 className="text-2xl font-bold mb-8 text-center">
              📊 Our Impact
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">50K+</div>
                <div className="text-blue-100">Tourists Protected</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">120+</div>
                <div className="text-blue-100">Countries Covered</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">24/7</div>
                <div className="text-blue-100">Emergency Support</div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">99.9%</div>
                <div className="text-blue-100">Uptime Reliability</div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 text-center">
              👥 Our Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <div
                  key={index}
                  className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 text-center hover:shadow-lg transition duration-300"
                >
                  <div className="text-4xl mb-4">{member.image}</div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {member.expertise}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Section */}
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Have questions about TourSafe? We&apos;d love to hear from you.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => router.push('/contact')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                📧 Contact Us
              </button>
              <button
                onClick={() => router.push('/feedback')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                💬 Feedback
              </button>
              <button
                onClick={() => router.push('/help-support')}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                ❓ Help & Support
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
