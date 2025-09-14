"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function HelpSupportPage() {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState('getting-started');
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    { id: 'getting-started', name: 'Getting Started', icon: '🚀' },
    { id: 'account', name: 'Account & Login', icon: '👤' },
    { id: 'safety', name: 'Safety Features', icon: '🛡️' },
    { id: 'emergency', name: 'Emergency Situations', icon: '🚨' },
    { id: 'technical', name: 'Technical Issues', icon: '⚙️' },
    { id: 'billing', name: 'Billing & Payments', icon: '💳' }
  ];

  const faqs = {
    'getting-started': [
      {
        question: "How do I create a TourSafe account?",
        answer: "Click on 'Sign Up' and fill in your details. You'll receive a verification email to activate your account."
      },
      {
        question: "What devices does TourSafe support?",
        answer: "TourSafe works on iOS and Android smartphones, tablets, and web browsers on desktop computers."
      },
      {
        question: "Is TourSafe free to use?",
        answer: "Basic safety features are free. Premium features like advanced tracking and priority support require a subscription."
      }
    ],
    'account': [
      {
        question: "How do I reset my password?",
        answer: "Go to the login page and click 'Forgot Password'. Enter your email and follow the reset instructions."
      },
      {
        question: "Can I change my email address?",
        answer: "Yes, go to your profile settings and update your email. You'll need to verify the new email address."
      },
      {
        question: "How do I delete my account?",
        answer: "Contact our support team through the feedback form. Account deletion requires verification for security."
      }
    ],
    'safety': [
      {
        question: "How does the SOS feature work?",
        answer: "Tap the SOS button to send your location and emergency alert to pre-selected contacts and authorities."
      },
      {
        question: "What information is shared during an emergency?",
        answer: "Your GPS location, emergency contacts list, and basic profile information are shared with emergency services."
      },
      {
        question: "How accurate is the location tracking?",
        answer: "Location accuracy depends on GPS signal strength. In urban areas, accuracy is typically within 10-50 meters."
      }
    ],
    'emergency': [
      {
        question: "What should I do in an emergency?",
        answer: "Stay calm, activate SOS if safe to do so, move to a safe location, and follow instructions from authorities."
      },
      {
        question: "How quickly does emergency response work?",
        answer: "Emergency alerts are sent instantly. Response time depends on local emergency services and your location."
      },
      {
        question: "Can I cancel a false emergency alert?",
        answer: "Yes, you can cancel within 30 seconds of sending. Contact emergency services immediately if sent by mistake."
      }
    ],
    'technical': [
      {
        question: "The app is not loading properly",
        answer: "Clear your browser cache, ensure you have a stable internet connection, and try refreshing the page."
      },
      {
        question: "Location services are not working",
        answer: "Check that location permissions are enabled in your device settings and browser permissions."
      },
      {
        question: "I'm experiencing slow performance",
        answer: "Close other apps, ensure you have good internet connectivity, and try restarting your device."
      }
    ],
    'billing': [
      {
        question: "How do I upgrade my plan?",
        answer: "Go to your account settings and select 'Upgrade Plan'. Choose your preferred subscription."
      },
      {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period."
      },
      {
        question: "What payment methods do you accept?",
        answer: "We accept major credit cards, PayPal, and digital wallets. All payments are processed securely."
      }
    ]
  };

  const filteredFaqs = faqs[activeCategory as keyof typeof faqs]?.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              ❓ Help & Support
            </h1>
            <button
              onClick={() => router.push('/tourist')}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition duration-300"
            >
              ← Back
            </button>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Search for help..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              />
              <div className="absolute left-4 top-3.5 text-gray-400">
                🔍
              </div>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mb-8">
            {faqCategories.map((category) => (
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

          {/* FAQ Content */}
          <div className="space-y-4">
            {filteredFaqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-md transition duration-300"
              >
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Contact Support */}
          <div className="mt-12 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
              🤝 Still Need Help?
            </h3>
            <p className="text-blue-700 dark:text-blue-300 mb-4">
              Can't find what you're looking for? Our support team is here to help 24/7.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => router.push('/feedback')}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                📧 Contact Support
              </button>
              <button
                onClick={() => router.push('/emergency-contacts')}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🚨 Emergency Help
              </button>
              <button
                onClick={() => router.push('/safety-tips')}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                🛡️ Safety Resources
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 text-center">
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
              Quick Links
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => router.push('/terms-privacy')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Terms & Privacy
              </button>
              <button
                onClick={() => router.push('/about-us')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                About Us
              </button>
              <button
                onClick={() => router.push('/travel-guides')}
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
              >
                Travel Guides
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
