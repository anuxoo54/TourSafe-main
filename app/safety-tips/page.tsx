"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SafetyTipsPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('general');

  const categories = [
    { id: 'general', name: 'General Safety', icon: '🛡️' },
    { id: 'transport', name: 'Transportation', icon: '🚗' },
    { id: 'accommodation', name: 'Hotels & Stays', icon: '🏨' },
    { id: 'health', name: 'Health & Medical', icon: '🏥' },
    { id: 'digital', name: 'Digital Safety', icon: '📱' },
  ];

  const tips = {
    general: [
      "Keep copies of important documents in a secure digital location",
      "Share your itinerary with trusted contacts before traveling",
      "Stay aware of your surroundings and trust your instincts",
      "Use official transportation services and avoid unlicensed taxis",
      "Keep emergency contact numbers saved in your phone",
      "Carry a basic first-aid kit with essential medications",
      "Learn basic local phrases in the destination language",
      "Respect local customs and dress codes",
    ],
    transport: [
      "Use reputable transportation companies and apps",
      "Never share rides with strangers",
      "Keep your belongings secure and in sight",
      "Have your destination address in local language",
      "Use airport shuttles or official taxis from terminals",
      "Check transportation schedules in advance",
      "Have a backup transportation plan",
      "Keep vehicle doors locked while traveling",
    ],
    accommodation: [
      "Book through reputable platforms with reviews",
      "Check hotel safety features and emergency exits",
      "Use hotel safes for valuables",
      "Verify check-in/check-out procedures",
      "Keep room doors locked at all times",
      "Report any suspicious activity to hotel staff",
      "Test smoke detectors and know fire escape routes",
      "Keep curtains closed for privacy",
    ],
    health: [
      "Get required vaccinations before travel",
      "Carry travel health insurance information",
      "Know location of nearest hospitals and clinics",
      "Stay hydrated and be mindful of local water quality",
      "Carry prescription medications in original containers",
      "Know your blood type and any allergies",
      "Have emergency medical contact numbers",
      "Be aware of local health risks and precautions",
    ],
    digital: [
      "Use strong, unique passwords for all accounts",
      "Enable two-factor authentication where possible",
      "Be cautious with public Wi-Fi networks",
      "Keep devices updated with latest security patches",
      "Use VPN when connecting to public networks",
      "Avoid sharing personal information online",
      "Regularly backup important data",
      "Be wary of phishing attempts and scams",
    ],
  };

  return (
    <div className="min-h-screen bg-green-gradient dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              🛡️ Travel Safety Tips
            </h1>
            <button
              onClick={() => router.push('/tourist')}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition duration-300"
            >
              ← Back
            </button>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition duration-300 ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                <span>{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Tips Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tips[activeCategory as keyof typeof tips].map((tip, index) => (
              <div
                key={index}
                className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border-l-4 border-blue-500 hover:shadow-md transition duration-300"
              >
                <div className="flex items-start gap-3">
                  <span className="text-blue-600 dark:text-blue-400 text-xl">💡</span>
                  <p className="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">
                    {tip}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Emergency Section */}
          <div className="mt-8 p-6 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="text-xl font-semibold text-red-800 dark:text-red-200 mb-4 flex items-center gap-2">
              🚨 Emergency Preparedness
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Always Carry:</h4>
                <ul className="text-red-600 dark:text-red-400 space-y-1">
                  <li>• Emergency contact numbers</li>
                  <li>• Travel insurance details</li>
                  <li>• Basic first aid supplies</li>
                  <li>• Cash in small denominations</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-red-700 dark:text-red-300 mb-2">Know How To:</h4>
                <ul className="text-red-600 dark:text-red-400 space-y-1">
                  <li>• Contact local emergency services</li>
                  <li>• Find nearest embassy/consulate</li>
                  <li>• Use translation apps</li>
                  <li>• Access emergency medical care</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Download Tips */}
          <div className="mt-8 text-center">
            <button
              onClick={() => window.print()}
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              📄 Download Safety Tips
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
