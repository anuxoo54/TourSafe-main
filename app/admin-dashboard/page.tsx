"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";


// Dynamically import Map to avoid SSR issues
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

interface Tourist {
  id: string;
  name: string;
  photo: string;
  tags: string[];
  status: string;
  location: { lat: number; lng: number };
}

interface Alert {
  id: string;
  type: string;
  message: string;
  location: { lat: number; lng: number };
  timestamp: string;
  status: string;
}

interface Zone {
  name: string;
  coordinates: number[];
  type: "safe" | "danger";
}

const AdminDashboard = () => {
  const router = useRouter();
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [efirForm, setEfirForm] = useState({
    name: '',
    age: '',
    lastSeen: '',
    description: '',
    contact: '',
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [touristsRes, alertsRes, zonesRes] = await Promise.all([
          fetch('/api/tourists'),
          fetch('/api/alerts'),
          fetch('/api/safety-zones'),
        ]);
        const touristsData = await touristsRes.json();
        const alertsData = await alertsRes.json();
        const zonesData = await zonesRes.json();
        setTourists(touristsData);
        setAlerts(alertsData);
        setZones(zonesData.zones || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEfirSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock E-FIR generation
    alert('E-FIR generated successfully! FIR ID: ' + Date.now());
    setEfirForm({ name: '', age: '', lastSeen: '', description: '', contact: '' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              {darkMode ? '☀️ Light' : '🌙 Dark'}
            </button>
            <button
              onClick={() => router.push('/sign-in')}
              className="bg-red-600 hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:scale-105"
            >
              Logout
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tourist Clusters Visualization */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-blue-500 transform hover:-translate-y-1 hover:bg-blue-50 dark:hover:bg-blue-900/20">
            <h2 className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400 flex items-center">
              <span className="mr-2">📍</span> Tourist Clusters
            </h2>
            <div className="h-96 rounded-lg overflow-hidden shadow-inner">
              <Map
                center={[20.2961, 85.8245]}
                zones={zones}
                markers={tourists.map(tourist => ({
                  position: [tourist.location.lat, tourist.location.lng],
                  popup: `${tourist.name} - ${tourist.status}`,
                }))}
              />
            </div>
          </div>

          {/* Digital ID Records */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-green-200 dark:hover:border-green-500 transform hover:-translate-y-1 hover:bg-green-50 dark:hover:bg-green-900/20">
            <h2 className="text-2xl font-semibold mb-4 text-green-700 dark:text-green-400 flex items-center">
              <span className="mr-2">🆔</span> Digital ID Records
            </h2>
            <div className="max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              {tourists.map(tourist => (
                <div key={tourist.id} className="border-b border-gray-200 dark:border-gray-600 py-3 hover:bg-white dark:hover:bg-gray-600 rounded-lg px-3 mb-2 transition-colors duration-200">
                  <div className="font-semibold text-gray-800 dark:text-gray-200">{tourist.name}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">ID: {tourist.id}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Status:
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                      tourist.status === 'approved' ? 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200' : 'bg-yellow-100 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200'
                    }`}>
                      {tourist.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Location: {tourist.location.lat.toFixed(4)}, {tourist.location.lng.toFixed(4)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alert History */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-red-200 dark:hover:border-red-500 transform hover:-translate-y-1 hover:bg-red-50 dark:hover:bg-red-900/20">
            <h2 className="text-2xl font-semibold mb-4 text-red-700 dark:text-red-400 flex items-center">
              <span className="mr-2">🚨</span> Alert History
            </h2>
            <div className="max-h-96 overflow-y-auto bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              {alerts.map(alert => (
                <div key={alert.id} className="border-b border-gray-200 dark:border-gray-600 py-3 hover:bg-white dark:hover:bg-gray-600 rounded-lg px-3 mb-2 transition-colors duration-200">
                  <div className="font-semibold text-gray-800 dark:text-gray-200 flex items-center">
                    <span className={`mr-2 px-2 py-1 rounded-full text-xs font-medium ${
                      alert.type === 'sos' ? 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200' : 'bg-orange-100 dark:bg-orange-800 text-orange-800 dark:text-orange-200'
                    }`}>
                      {alert.type.toUpperCase()}
                    </span>
                    {alert.message}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Location: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Time: {new Date(alert.timestamp).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">Status:
                    <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                      alert.status === 'active' ? 'bg-red-100 dark:bg-red-800 text-red-800 dark:text-red-200' : 'bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200'
                    }`}>
                      {alert.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* E-FIR Generation */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 dark:border-gray-700 hover:border-purple-200 dark:hover:border-purple-500 transform hover:-translate-y-1 hover:bg-purple-50 dark:hover:bg-purple-900/20">
            <h2 className="text-2xl font-semibold mb-4 text-purple-700 dark:text-purple-400 flex items-center">
              <span className="mr-2">📋</span> Generate E-FIR
            </h2>
            <form onSubmit={handleEfirSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={efirForm.name}
                onChange={(e) => setEfirForm({...efirForm, name: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
              <input
                type="number"
                placeholder="Age"
                value={efirForm.age}
                onChange={(e) => setEfirForm({...efirForm, age: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
              <input
                type="text"
                placeholder="Last Seen Location"
                value={efirForm.lastSeen}
                onChange={(e) => setEfirForm({...efirForm, lastSeen: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
              <textarea
                placeholder="Description"
                value={efirForm.description}
                onChange={(e) => setEfirForm({...efirForm, description: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                rows={3}
                required
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={efirForm.contact}
                onChange={(e) => setEfirForm({...efirForm, contact: e.target.value})}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                required
              />
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 dark:from-purple-500 dark:to-blue-500 dark:hover:from-purple-600 dark:hover:to-blue-600 text-white py-3 px-4 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Generate E-FIR
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
