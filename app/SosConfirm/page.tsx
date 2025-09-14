"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';

const SosConfirm = () => {
  const [isAlertSent, setIsAlertSent] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback or handle error
        }
      );
    }

    // Send SOS alert
    const sendAlert = async () => {
      try {
        const response = await fetch('/api/sos', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            location: location,
            timestamp: new Date().toISOString(),
            message: 'SOS Alert: Tourist in distress',
          }),
        });
        if (response.ok) {
          setIsAlertSent(true);
        } else {
          console.error('Failed to send SOS alert');
        }
      } catch (error) {
        console.error('Error sending SOS alert:', error);
      }
    };

    // Delay to simulate sending
    const timer = setTimeout(() => {
      sendAlert();
    }, 3000);

    return () => clearTimeout(timer);
  }, [location]);

  const handleCancel = () => {
    // Redirect user to homepage or any other page if they cancel the SOS
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white p-12 flex flex-col items-center justify-center">
      {!isAlertSent ? (
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-red-600 mb-8">Sending SOS Alert...</h1>
          <p className="text-lg text-gray-300 mb-6">
            Please wait while we notify the nearest responders.
          </p>
          <div className="w-16 h-16 border-4 border-t-4 border-t-red-600 border-gray-200 rounded-full animate-spin mx-auto"></div>
        </div>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-green-500 mb-8">SOS Alert Sent!</h1>
          <p className="text-lg text-gray-300 mb-6">
            Your location and details have been shared with the nearest emergency responders. Help is on the way!
          </p>
          <FiCheckCircle className="text-green-500 text-6xl mb-6 mx-auto" />
          <button
            onClick={handleCancel}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-all duration-300 mt-8 flex items-center gap-2"
          >
            <FiXCircle className="text-2xl" />
            Cancel SOS Alert
          </button>
        </div>
      )}
    </div>
  );
};

export default SosConfirm;
