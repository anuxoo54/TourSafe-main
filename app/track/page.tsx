// pages/track.tsx
"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// Dynamically import all Leaflet components
const Map = dynamic(
  () => import("@/components/Map"),
  { ssr: false }
);

const TrackPage = () => {
  const center = [20.2961, 85.8245]; // Coordinates for Bhubaneswar

  // Areas to highlight in Bhubaneswar
  const zones: { name: string; coordinates: number[]; type: "danger" | "safe" }[] = [
    { name: "Master Canteen", coordinates: [20.2689, 85.8415], type: "danger" },
    { name: "Kalpana Square", coordinates: [20.2487, 85.8336], type: "danger" },
    { name: "Bapuji Nagar", coordinates: [20.2632, 85.8412], type: "danger" },
    { name: "Rasulgarh", coordinates: [20.2966, 85.8700], type: "danger" },
    { name: "Jaydev Vihar", coordinates: [20.2940, 85.8186], type: "danger" },
  ];

  return (
    <div className="relative bg-gray-100 min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-teal-500 mb-2">Track Scam Areas</h1>
        <p className="text-lg text-gray-700">
          Here are some areas in Bhubaneswar where scams have been reported.
        </p>
      </div>

      {/* Map Section */}
      <div className="w-full max-w-4xl h-[500px] shadow-lg rounded-lg overflow-hidden">
        <Map center={center} zones={zones} />
      </div>
    </div>
  );
};

export default TrackPage;
