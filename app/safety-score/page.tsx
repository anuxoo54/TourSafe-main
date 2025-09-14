"use client";
import { useState, useEffect } from "react";

interface Zone {
  name: string;
  coordinates: number[];
  type: "safe" | "danger";
}

export default function SafetyScore() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [safetyScore, setSafetyScore] = useState<number | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [loading, setLoading] = useState(false);
  const historicalIncidents = [
    { lat: 20.3000, lng: 85.8300, type: "theft" },
    { lat: 20.2920, lng: 85.8180, type: "assault" },
    // Add more as needed
  ];
  const [manualLocation, setManualLocation] = useState({ lat: "", lng: "" });
  const [timeOfDay, setTimeOfDay] = useState("day");
  const [activity, setActivity] = useState("tourism");
  const [weather, setWeather] = useState("clear");
  const [crowdDensity, setCrowdDensity] = useState("low");
  const [recommendations, setRecommendations] = useState<string[]>([]);

  useEffect(() => {
    // Fetch safety zones
    fetch('/api/safety-zones')
      .then(res => res.json())
      .then(data => setZones(data.zones));
  }, []);

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to get your location. Please enter manually.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const calculateSafetyScore = () => {
    const location = currentLocation || (manualLocation.lat && manualLocation.lng ? {
      lat: parseFloat(manualLocation.lat),
      lng: parseFloat(manualLocation.lng)
    } : null);

    if (!location) {
      alert("Please provide your location.");
      return;
    }

    setLoading(true);

    // Simple scoring algorithm
    let score = 100; // Start with perfect score
    let recs: string[] = [];

    // Check proximity to danger zones
    zones.forEach(zone => {
      const distance = getDistance(location.lat, location.lng, zone.coordinates[0], zone.coordinates[1]);
      if (zone.type === "danger" && distance < 1) { // Within 1km of danger zone
        score -= 30;
        recs.push("Avoid danger zones; stay in well-lit areas.");
      }
    });

    // Check proximity to historical incidents
    historicalIncidents.forEach(incident => {
      const distance = getDistance(location.lat, location.lng, incident.lat, incident.lng);
      if (distance < 0.5) { // Within 500m of incident
        score -= 15;
        recs.push(`Historical ${incident.type} incident nearby; be cautious.`);
      }
    });

    // Time of day factor
    if (timeOfDay === "night") {
      score -= 20;
      recs.push("Travel in groups at night; use well-lit paths.");
    }

    // Activity factor
    if (activity === "adventure") {
      score -= 10;
      recs.push("Adventure activities carry risks; ensure proper safety measures.");
    }

    // Weather factor
    if (weather === "rainy" || weather === "stormy") {
      score -= 15;
      recs.push("Bad weather increases risks; plan indoor activities.");
    }

    // Crowd density factor
    if (crowdDensity === "high") {
      score -= 10;
      recs.push("High crowds can lead to pickpocketing; secure belongings.");
    }

    // Ensure score is between 0 and 100
    score = Math.max(0, Math.min(100, score));

    setSafetyScore(score);
    setRecommendations(recs);
    setLoading(false);
  };

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    // Haversine formula for distance calculation
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreMessage = (score: number) => {
    if (score >= 80) return "Safe - Enjoy your trip!";
    if (score >= 60) return "Moderate risk - Stay alert";
    return "High risk - Take precautions";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex flex-col items-center justify-center p-8">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Tourist Safety Score</h1>

        <div className="space-y-4">
          <button
            onClick={getCurrentLocation}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition w-full"
          >
            Get Current Location
          </button>

          <div className="text-center text-gray-600">OR</div>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Latitude"
              value={manualLocation.lat}
              onChange={(e) => setManualLocation({ ...manualLocation, lat: e.target.value })}
              className="border border-gray-300 rounded-lg p-2"
            />
            <input
              type="text"
              placeholder="Longitude"
              value={manualLocation.lng}
              onChange={(e) => setManualLocation({ ...manualLocation, lng: e.target.value })}
              className="border border-gray-300 rounded-lg p-2"
            />
          </div>

          <select
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="day">Day Time</option>
            <option value="night">Night Time</option>
          </select>

          <select
            value={activity}
            onChange={(e) => setActivity(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="tourism">General Tourism</option>
            <option value="adventure">Adventure Activities</option>
            <option value="shopping">Shopping</option>
            <option value="dining">Dining</option>
          </select>

          <select
            value={weather}
            onChange={(e) => setWeather(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="clear">Clear</option>
            <option value="cloudy">Cloudy</option>
            <option value="rainy">Rainy</option>
            <option value="stormy">Stormy</option>
          </select>

          <select
            value={crowdDensity}
            onChange={(e) => setCrowdDensity(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 w-full"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <button
            onClick={calculateSafetyScore}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition w-full"
            disabled={loading}
          >
            {loading ? 'Calculating...' : 'Calculate Safety Score'}
          </button>
        </div>

        {safetyScore !== null && (
          <div className="mt-8 text-center">
            <div className={`text-6xl font-bold ${getScoreColor(safetyScore)}`}>
              {safetyScore}/100
            </div>
            <p className="text-lg mt-2">{getScoreMessage(safetyScore)}</p>
            <div className="mt-4 text-sm text-gray-600">
              <p>Location: {currentLocation ? `${currentLocation.lat.toFixed(4)}, ${currentLocation.lng.toFixed(4)}` : `${manualLocation.lat}, ${manualLocation.lng}`}</p>
              <p>Time: {timeOfDay}</p>
              <p>Activity: {activity}</p>
              <p>Weather: {weather}</p>
              <p>Crowd Density: {crowdDensity}</p>
            </div>
            {recommendations.length > 0 && (
              <div className="mt-4 text-left">
                <h3 className="text-lg font-semibold text-gray-700">Recommendations:</h3>
                <ul className="list-disc list-inside text-sm text-gray-600">
                  {recommendations.map((rec, index) => (
                    <li key={index}>{rec}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
