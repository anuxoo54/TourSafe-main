"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

export default function SafetyMapPage() {
  const [zones, setZones] = useState<{
    name: string;
    coordinates: number[];
    type: "safe" | "danger";
  }[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Example API call to fetch zones (replace with your real API endpoint)
    fetch("/api/safety-zones?city=bhubaneswar")
      .then((res) => res.json())
      .then((data) => setZones(data.zones || []));
  }, []);

  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <h1 className="text-4xl font-bold mb-6 text-blue-900">
        Bhubaneswar Safety Map
      </h1>
      <p className="mb-4 text-lg text-blue-700">
        Safe zones are marked in green, danger zones in red.
      </p>
      <input
        type="text"
        placeholder="Search zones..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 px-4 py-2 rounded-lg border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <div className="w-full max-w-4xl h-[500px] rounded-lg shadow-lg overflow-hidden">
        <Map center={[20.2961, 85.8245]} zones={filteredZones} />
      </div>
    </main>
  );
}
