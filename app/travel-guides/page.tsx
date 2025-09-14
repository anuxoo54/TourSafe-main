"use client";

import { useRouter } from "next/navigation";

export default function TravelGuidesPage() {
  const router = useRouter();

  const guides = [
    {
      title: "Cultural Etiquette",
      description: "Learn about local customs, greetings, and respectful behavior in different countries.",
      icon: "🤝",
      tips: [
        "Research greeting customs (handshakes, bows, etc.)",
        "Dress modestly in religious sites",
        "Learn basic phrases in local language",
        "Respect local dining customs",
        "Be mindful of photography permissions"
      ]
    },
    {
      title: "Currency & Money",
      description: "Essential tips for handling money, ATMs, and financial transactions abroad.",
      icon: "💰",
      tips: [
        "Notify your bank about travel plans",
        "Carry some cash in local currency",
        "Use ATMs during business hours",
        "Keep receipts for expenses",
        "Be aware of currency exchange rates"
      ]
    },
    {
      title: "Packing Essentials",
      description: "What to pack for different types of travel and climates.",
      icon: "🎒",
      tips: [
        "Check weather forecasts",
        "Pack versatile clothing",
        "Include travel-sized toiletries",
        "Carry important documents copies",
        "Don't forget adapters and chargers"
      ]
    },
    {
      title: "Communication",
      description: "Stay connected with family and handle communication challenges.",
      icon: "📱",
      tips: [
        "Get an international SIM card",
        "Use translation apps",
        "Know roaming charges",
        "Have backup communication methods",
        "Share itinerary with family"
      ]
    },
    {
      title: "Food & Dining",
      description: "Safe eating practices and culinary experiences abroad.",
      icon: "🍽️",
      tips: [
        "Drink bottled water",
        "Try street food from clean vendors",
        "Be aware of dietary restrictions",
        "Learn food allergy phrases",
        "Respect dining etiquette"
      ]
    },
    {
      title: "Sustainable Travel",
      description: "Travel responsibly and minimize your environmental impact.",
      icon: "🌱",
      tips: [
        "Reduce single-use plastics",
        "Support local businesses",
        "Use public transportation",
        "Respect wildlife and nature",
        "Learn about local conservation efforts"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              🗺️ Travel Guides
            </h1>
            <button
              onClick={() => router.push('/tourist')}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition duration-300"
            >
              ← Back
            </button>
          </div>

          <div className="mb-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-4">
              🌟 Travel Smart, Travel Safe
            </h3>
            <p className="text-green-700 dark:text-green-300">
              Our comprehensive travel guides are designed to help you make the most of your journey while staying safe and respectful.
              Whether you're a first-time traveler or a seasoned explorer, these tips will enhance your travel experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition duration-300 hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4 text-center">{guide.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-3 text-center">
                  {guide.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 text-center">
                  {guide.description}
                </p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 dark:text-gray-200 text-sm">Key Tips:</h4>
                  <ul className="text-gray-600 dark:text-gray-400 text-xs space-y-1">
                    {guide.tips.map((tip, tipIndex) => (
                      <li key={tipIndex} className="flex items-start gap-2">
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
              📚 Additional Resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Before You Travel:</h4>
                <ul className="text-blue-600 dark:text-blue-400 space-y-1 text-sm">
                  <li>• Check travel advisories</li>
                  <li>• Get necessary visas</li>
                  <li>• Purchase travel insurance</li>
                  <li>• Update vaccinations</li>
                  <li>• Make accommodation bookings</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">During Your Trip:</h4>
                <ul className="text-blue-600 dark:text-blue-400 space-y-1 text-sm">
                  <li>• Stay hydrated</li>
                  <li>• Take regular breaks</li>
                  <li>• Keep valuables secure</li>
                  <li>• Backup digital photos</li>
                  <li>• Stay in touch with loved ones</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center space-y-4">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => router.push('/safety-tips')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🛡️ Safety Tips
              </button>
              <button
                onClick={() => router.push('/emergency-contacts')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🚨 Emergency Contacts
              </button>
              <button
                onClick={() => router.push('/feedback')}
                className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                💬 Feedback
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
