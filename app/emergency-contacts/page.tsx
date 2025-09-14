"use client";

import { useRouter } from "next/navigation";

export default function EmergencyContactsPage() {
  const router = useRouter();

  const emergencyContacts = [
    {
      country: "India",
      police: "100",
      ambulance: "102",
      fire: "101",
      touristHelpline: "1363",
      embassy: "+91-11-2301-4000"
    },
    {
      country: "United States",
      police: "911",
      ambulance: "911",
      fire: "911",
      touristHelpline: "1-888-407-4747",
      embassy: "+1-202-939-7000"
    },
    {
      country: "United Kingdom",
      police: "999",
      ambulance: "999",
      fire: "999",
      touristHelpline: "0300 790 6800",
      embassy: "+44-20-7499-9000"
    },
    {
      country: "Australia",
      police: "000",
      ambulance: "000",
      fire: "000",
      touristHelpline: "131 881",
      embassy: "+61-2-6214-5600"
    },
    {
      country: "Canada",
      police: "911",
      ambulance: "911",
      fire: "911",
      touristHelpline: "1-800-267-8097",
      embassy: "+1-613-238-5335"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-8 mt-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
              🚨 Emergency Contacts
            </h1>
            <button
              onClick={() => router.push('/tourist')}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg transition duration-300"
            >
              ← Back
            </button>
          </div>

          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
            <h3 className="text-lg font-semibold text-red-800 dark:text-red-200 mb-2">
              ⚠️ Important Notice
            </h3>
            <p className="text-red-700 dark:text-red-300 text-sm">
              In case of emergency, always call the local emergency number first (usually 911, 112, 999, or 000 depending on your location).
              Save these numbers in your phone and keep them accessible at all times.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg border border-gray-200 dark:border-gray-600 hover:shadow-lg transition duration-300"
              >
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 text-center">
                  {contact.country}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Police:</span>
                    <a
                      href={`tel:${contact.police}`}
                      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-bold"
                    >
                      {contact.police}
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Ambulance:</span>
                    <a
                      href={`tel:${contact.ambulance}`}
                      className="text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300 font-bold"
                    >
                      {contact.ambulance}
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Fire:</span>
                    <a
                      href={`tel:${contact.fire}`}
                      className="text-orange-600 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300 font-bold"
                    >
                      {contact.fire}
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Tourist Helpline:</span>
                    <a
                      href={`tel:${contact.touristHelpline}`}
                      className="text-purple-600 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300 font-bold text-sm"
                    >
                      {contact.touristHelpline}
                    </a>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600 dark:text-gray-300 font-medium">Embassy:</span>
                    <a
                      href={`tel:${contact.embassy}`}
                      className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-bold text-sm"
                    >
                      {contact.embassy}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
              🌍 International Emergency Numbers
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Global Numbers:</h4>
                <ul className="text-blue-600 dark:text-blue-400 space-y-1 text-sm">
                  <li>• <strong>112</strong> - European Emergency Number</li>
                  <li>• <strong>911</strong> - North America</li>
                  <li>• <strong>000</strong> - Australia</li>
                  <li>• <strong>999</strong> - UK and Commonwealth</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">Travel Tips:</h4>
                <ul className="text-blue-600 dark:text-blue-400 space-y-1 text-sm">
                  <li>• Save local emergency numbers</li>
                  <li>• Know your location and address</li>
                  <li>• Have travel insurance details ready</li>
                  <li>• Learn basic emergency phrases</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => router.push('/SosConfirm')}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              🚨 Send Emergency SOS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
