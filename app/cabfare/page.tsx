"use client";
import React, { useState } from "react";
import { FaMapMarkerAlt, FaCarSide, FaClock } from "react-icons/fa";

// Sample data for popular routes in Bhubaneswar
const popularRoutes = [
  { id: 1, route: "Master Canteen to Kalpana Square", distance: 3, fare: 10 },
  { id: 2, route: "Jaydev Vihar to KIIT University", distance: 10, fare: 25 },
  { id: 3, route: "Bapuji Nagar to Rasulgarh", distance: 5, fare: 12 },
  { id: 4, route: "Railway Station to Airport", distance: 6, fare: 15 },
  { id: 5, route: "Baramunda to Patia", distance: 12, fare: 30 },
  { id: 6, route: "CRP Square to Vani Vihar", distance: 4, fare: 8 },
  { id: 7, route: "Khandagiri to Chandrasekharpur", distance: 8, fare: 18 },
  { id: 8, route: "Kalpana Square to Saheed Nagar", distance: 2, fare: 6 },
  { id: 9, route: "Jaydev Vihar to Baramunda", distance: 5, fare: 12 },
  { id: 10, route: "Patia to KIIT Square", distance: 3, fare: 7 },
];

const CabFare = () => {
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [traffic, setTraffic] = useState("normal");
  const [travelTime, setTravelTime] = useState(""); // Travel time input
  const [fare, setFare] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Your DistanceMatrix API key
  const apiKey = "Hn35QAGQ2WpW1e5es6eD73fGNRkBZwyLWjDOSKuxWZvd1aBf3iPxtCozSwOrXXaG"; /

  // Function to fetch distance between source and destination
  const getDistance = async () => {
    try {
      const response = await fetch(
        `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${source}&destinations=${destination}&key=${apiKey}`
      );

      const data = await response.json();

      if (data.rows[0].elements[0].status === "OK") {
        const distanceInMeters = data.rows[0].elements[0].distance.value;
        return distanceInMeters / 1000; // Convert to kilometers
      } else {
        throw new Error("Invalid address or route not found.");
      }
    } catch (error) {
      console.error("Error fetching distance:", error);
      throw error;
    }
  };

  // Function to calculate the fare based on distance, traffic, and time
  const calculateFare = async () => {
    try {
      const distance = await getDistance();

  let fareRate = 2.5; // Mo Bus rate per km (approx)

      // Check if it's nighttime (12 AM to 5 AM) and apply night fare rate
      const [hour] = travelTime.split(":").map(Number);
      if (hour >= 0 && hour < 5) {
  fareRate = 3; // Night fare (bus)
      } else if (traffic === "heavy") {
  fareRate = 4; // Increased rate for heavy traffic (bus)
      } else if (traffic === "light") {
  fareRate = 2; // Reduced rate for light traffic (bus)
      }

  const estimatedFare = distance * fareRate + 5; // Adding ₹5 to the fare (Mo Bus minimum)
      setFare(estimatedFare);
      setError(null);
    } catch (err) {
      setError("Failed to calculate the fare. Please check your input.");
      setFare(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-teal-100 to-green-100 flex flex-col items-center py-12">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-2xl mb-10 animate-fade-in">
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-8 flex items-center justify-center gap-2">
          <FaCarSide className="text-teal-500" /> Cab Fare Estimator
        </h1>
        <div className="mb-6">
          <label className="block text-lg mb-2 font-semibold flex items-center gap-2">
            <FaMapMarkerAlt className="text-green-500" /> Source Address (in Bhubaneswar):
          </label>
          <select
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="border border-blue-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Source</option>
            <option value="Master Canteen">Master Canteen</option>
            <option value="Kalpana Square">Kalpana Square</option>
            <option value="Jaydev Vihar">Jaydev Vihar</option>
            <option value="KIIT University">KIIT University</option>
            <option value="Bapuji Nagar">Bapuji Nagar</option>
            <option value="Rasulgarh">Rasulgarh</option>
            <option value="Railway Station">Railway Station</option>
            <option value="Airport">Airport</option>
            <option value="Baramunda">Baramunda</option>
            <option value="Patia">Patia</option>
            <option value="CRP Square">CRP Square</option>
            <option value="Vani Vihar">Vani Vihar</option>
            <option value="Khandagiri">Khandagiri</option>
            <option value="Chandrasekharpur">Chandrasekharpur</option>
            <option value="Saheed Nagar">Saheed Nagar</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-lg mb-2 font-semibold flex items-center gap-2">
            <FaMapMarkerAlt className="text-red-500" /> Destination Address (in Bhubaneswar):
          </label>
          <select
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="border border-blue-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select Destination</option>
            <option value="Master Canteen">Master Canteen</option>
            <option value="Kalpana Square">Kalpana Square</option>
            <option value="Jaydev Vihar">Jaydev Vihar</option>
            <option value="KIIT University">KIIT University</option>
            <option value="Bapuji Nagar">Bapuji Nagar</option>
            <option value="Rasulgarh">Rasulgarh</option>
            <option value="Railway Station">Railway Station</option>
            <option value="Airport">Airport</option>
            <option value="Baramunda">Baramunda</option>
            <option value="Patia">Patia</option>
            <option value="CRP Square">CRP Square</option>
            <option value="Vani Vihar">Vani Vihar</option>
            <option value="Khandagiri">Khandagiri</option>
            <option value="Chandrasekharpur">Chandrasekharpur</option>
            <option value="Saheed Nagar">Saheed Nagar</option>
          </select>
        </div>
        <div className="mb-6">
          <label className="block text-lg mb-2 font-semibold flex items-center gap-2">
            <FaClock className="text-yellow-500" /> Time of Travel (24-hour format):
          </label>
          <input
            type="time"
            value={travelTime}
            onChange={(e) => setTravelTime(e.target.value)}
            className="border border-blue-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="mb-6">
          <label className="block text-lg mb-2 font-semibold">Traffic Condition:</label>
          <select
            value={traffic}
            onChange={(e) => setTraffic(e.target.value)}
            className="border border-blue-300 rounded-lg p-3 w-full focus:ring-2 focus:ring-blue-400"
          >
            <option value="normal">Normal</option>
            <option value="light">Light</option>
            <option value="heavy">Heavy</option>
          </select>
        </div>
        <button
          onClick={calculateFare}
          className="bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 px-8 rounded-xl font-bold text-lg shadow-lg hover:scale-105 transition-transform duration-300 animate-bounce"
        >
          Calculate Fare
        </button>
        {fare !== null && (
          <div className="mt-8 flex items-center justify-center">
            <div className="p-8 bg-green-200 rounded-2xl shadow-xl max-w-md border-4 border-green-400 animate-fade-in">
              <h3 className="text-2xl font-bold text-green-900 mb-2 flex items-center gap-2">
                <FaCarSide className="text-green-700" /> Estimated Fare
              </h3>
              <p className="text-xl text-green-900 font-semibold">
                Your estimated fare is ₹{fare.toFixed(2)}.
              </p>
            </div>
          </div>
        )}
        {error && (
          <div className="mt-8 p-4 bg-red-200 text-red-900 rounded-xl border-2 border-red-400 animate-fade-in">
            <p>{error}</p>
          </div>
        )}
      </div>
      {/* Popular Routes Section */}
      <section className="w-full max-w-3xl mt-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-teal-700">Popular Routes in Bhubaneswar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {popularRoutes.map((route) => (
            <div key={route.id} className="bg-gradient-to-r from-blue-200 to-green-200 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300">
              <h3 className="text-xl font-bold text-blue-800 mb-2">{route.route}</h3>
              <p className="text-gray-700">Distance: {route.distance} km</p>
              <p className="text-gray-700">Approx Fare: ₹{route.fare}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CabFare;
