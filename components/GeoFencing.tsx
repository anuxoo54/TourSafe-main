"use client";
import { useEffect, useState } from "react";

interface Zone {
  name: string;
  coordinates: number[];
  type: "safe" | "danger";
}

export default function GeoFencing() {
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [zones, setZones] = useState<Zone[]>([]);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);
  const [notifiedZones, setNotifiedZones] = useState<Set<string>>(new Set());
  const [alertRadius, setAlertRadius] = useState<number>(0.5); // Default 500m

  useEffect(() => {
    // Fetch safety zones
    fetch('/api/safety-zones')
      .then(res => res.json())
      .then(data => setZones(data.zones));

    // Start watching position
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
        (position) => {
          const newLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(newLocation);
          checkGeoFencing(newLocation);
        },
        (error) => {
          console.error("Error watching position:", error);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
      setWatchId(id);
    }

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  const checkGeoFencing = (location: { lat: number; lng: number }) => {
    zones.forEach(zone => {
      const distance = getDistance(location.lat, location.lng, zone.coordinates[0], zone.coordinates[1]);
      if (zone.type === "danger" && distance < alertRadius) { // Within alert radius of danger zone
        if (!notifiedZones.has(zone.name)) {
          setAlertMessage(`Warning: You are entering a high-risk area: ${zone.name}`);
          sendPushNotification(`Danger Zone Alert: ${zone.name}`, `You are near a high-risk area. Stay alert!`);
          // Simulate notifying authorities
          notifyAuthorities(location, zone);
          setNotifiedZones(new Set(notifiedZones).add(zone.name));
        }
      } else if (zone.type === "safe" && distance < 0.1) { // Within 100m of safe zone
        if (!notifiedZones.has(zone.name)) {
          setAlertMessage(`You are in a safe zone: ${zone.name}`);
          sendPushNotification(`Safe Zone: ${zone.name}`, `You are in a safe area. Enjoy your visit!`);
          setNotifiedZones(new Set(notifiedZones).add(zone.name));
        }
      }
    });
  };

  const sendPushNotification = (title: string, body: string) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, { body });
    } else if ('Notification' in window && Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(title, { body });
        }
      });
    }
  };

  const notifyAuthorities = (location: { lat: number; lng: number }, zone: Zone) => {
    // Simulate sending alert to authorities
    console.log(`Alerting authorities: Tourist in danger zone ${zone.name} at ${location.lat}, ${location.lng}`);
    // In production, this would send to police API or emergency services
  };

  const getDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    // Haversine formula
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const dismissAlert = () => {
    setAlertMessage(null);
  };

  return (
    <div>
      {alertMessage && (
        <div className="fixed top-4 left-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg z-50">
          <p>{alertMessage}</p>
          <button
            onClick={dismissAlert}
            className="mt-2 bg-red-800 px-4 py-2 rounded hover:bg-red-900"
          >
            Dismiss
          </button>
        </div>
      )}
      {currentLocation && (
        <div className="text-sm text-gray-600">
          Current Location: {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
        </div>
      )}
    </div>
  );
}
