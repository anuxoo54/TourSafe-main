"use client";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { issueTouristID } from "@/lib/blockchain";

export default function TouristIDCard() {
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [kycDocument, setKycDocument] = useState<string>("");
  const [itinerary, setItinerary] = useState("");
  const [emergencyContacts, setEmergencyContacts] = useState("");
  const [validityDays, setValidityDays] = useState(30);
  const [id, setId] = useState<string | null>(null);
  const [showCard, setShowCard] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleKycUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // In real implementation, hash the document for privacy
        setKycDocument(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask to issue blockchain-based ID");
      return;
    }

    setLoading(true);
    try {
      const newId = uuidv4();
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const touristAddress = accounts[0];

      // Hash KYC for privacy (simple hash, in production use proper hashing)
      const kycHash = btoa(kycDocument).substring(0, 32); // Simple hash for demo

      await issueTouristID(
        newId,
        touristAddress,
        name,
        kycHash,
        itinerary,
        emergencyContacts,
        validityDays
      );

      setId(newId);
      setShowCard(true);

      // Also submit to local API for admin approval
      fetch('/api/tourists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: newId,
          name,
          photo,
          kycHash,
          itinerary,
          emergencyContacts,
          validityDays,
          tags,
          status: 'pending',
          blockchainTx: 'issued' // Placeholder
        }),
      });

      alert('Blockchain-based ID card successfully issued');
    } catch (error) {
      console.error('Error issuing ID:', error);
      alert('There was an error issuing your ID card. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 via-teal-100 to-green-100">
      <div className="bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md mb-10">
        <h1 className="text-3xl font-extrabold text-center text-blue-700 mb-6">Blockchain Tourist Digital ID Card</h1>
        {!showCard ? (
          <>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={e => setName(e.target.value)}
              className="border border-blue-300 rounded-lg p-3 w-full mb-4"
            />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="mb-4"
              placeholder="Upload photo"
            />
            <input
              type="file"
              accept=".pdf,.jpg,.png"
              onChange={handleKycUpload}
              className="mb-4"
              placeholder="Upload KYC document (Aadhaar/Passport)"
            />
            <textarea
              placeholder="Trip itinerary"
              value={itinerary}
              onChange={e => setItinerary(e.target.value)}
              className="border border-blue-300 rounded-lg p-3 w-full mb-4"
              rows={3}
            />
            <textarea
              placeholder="Emergency contacts"
              value={emergencyContacts}
              onChange={e => setEmergencyContacts(e.target.value)}
              className="border border-blue-300 rounded-lg p-3 w-full mb-4"
              rows={2}
            />
            <input
              type="number"
              placeholder="Validity days"
              value={validityDays}
              onChange={e => setValidityDays(Number(e.target.value))}
              className="border border-blue-300 rounded-lg p-3 w-full mb-4"
              min={1}
            />
            <select
              multiple
              value={tags}
              onChange={(e) => {
                const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
                setTags(selectedOptions);
              }}
              className="border border-blue-300 rounded-lg p-3 w-full mb-4"
            >
              <option value="adventure">Adventure</option>
              <option value="culture">Culture</option>
              <option value="food">Food</option>
              <option value="nature">Nature</option>
              <option value="history">History</option>
              <option value="shopping">Shopping</option>
              <option value="relaxation">Relaxation</option>
            </select>
            <button
              onClick={handleGenerate}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-bold hover:bg-blue-800 transition w-full"
              disabled={!name || !photo || !kycDocument || loading}
            >
              {loading ? 'Issuing on Blockchain...' : 'Generate Blockchain ID Card'}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="bg-gradient-to-r from-blue-400 via-teal-300 to-green-400 rounded-xl p-6 shadow-lg w-full">
              {photo && (
                <Image src={photo} alt="Tourist Photo" width={100} height={100} className="rounded-full mx-auto mb-4" />
              )}
              <h2 className="text-xl font-bold text-white mb-2">{name}</h2>
              <p className="text-white font-mono">Blockchain ID: {id}</p>
              <p className="text-white text-sm">Validity: {validityDays} days</p>
              {tags.length > 0 && (
                <p className="text-white text-sm">Tags: {tags.join(', ')}</p>
              )}
            </div>
            <button
              onClick={() => setShowCard(false)}
              className="mt-6 bg-gray-300 px-4 py-2 rounded-lg hover:bg-gray-400"
            >
              Create Another
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
