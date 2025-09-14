import { ethers } from "ethers";

// Extend window type for ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

// TouristID Contract ABI
const touristIDABI = [
  "function issueTouristID(bytes32 touristId, address touristAddress, string name, string kycHash, string itinerary, string emergencyContacts, uint256 validityDays) public",
  "function verifyTouristID(bytes32 touristId) public view returns (bool)",
  "function getTouristDetails(bytes32 touristId) public view returns (string name, string kycHash, string itinerary, string emergencyContacts, uint256 issueDate, uint256 expiryDate, bool isActive, address issuer)",
  "function revokeTouristID(bytes32 touristId) public",
  "function addAuthorizedIssuer(address issuer) public",
  "function removeAuthorizedIssuer(address issuer) public"
];

// Fare Logging Contract ABI
const fareABI = [
  "function logFare(address user, uint256 amount, string memory route) public"
];

const touristIDContractAddress = "0xYourTouristIDContractAddressHere"; // Replace with deployed TouristID contract address
const fareContractAddress = "0xYourFareContractAddressHere"; // Replace with deployed fare contract address

export async function issueTouristID(
  touristId: string,
  touristAddress: string,
  name: string,
  kycHash: string,
  itinerary: string,
  emergencyContacts: string,
  validityDays: number
) {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(touristIDContractAddress, touristIDABI, signer);
  const tx = await contract.issueTouristID(
    ethers.encodeBytes32String(touristId),
    touristAddress,
    name,
    kycHash,
    itinerary,
    emergencyContacts,
    validityDays
  );
  return tx.hash;
}

export async function verifyTouristID(touristId: string): Promise<boolean> {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(touristIDContractAddress, touristIDABI, provider);
  return await contract.verifyTouristID(ethers.encodeBytes32String(touristId));
}

export async function getTouristDetails(touristId: string) {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(touristIDContractAddress, touristIDABI, provider);
  return await contract.getTouristDetails(ethers.encodeBytes32String(touristId));
}

export async function logFareOnBlockchain(userAddress: string, amount: number, route: string) {
  if (!window.ethereum) throw new Error("MetaMask not detected");
  const provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(fareContractAddress, fareABI, signer);
  const tx = await contract.logFare(userAddress, amount, route);
  return tx.hash;
}
