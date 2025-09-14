// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TouristID {
    struct Tourist {
        string name;
        string kycHash; // Hash of KYC document (Aadhaar/passport)
        string itinerary; // Trip itinerary
        string emergencyContacts; // Emergency contact details
        uint256 issueDate;
        uint256 expiryDate; // Validity period
        bool isActive;
        address issuer;
    }

    mapping(bytes32 => Tourist) public tourists;
    mapping(address => bool) public authorizedIssuers;

    address public admin;

    event TouristIDIssued(bytes32 indexed touristId, address indexed touristAddress);
    event TouristIDRevoked(bytes32 indexed touristId);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }

    modifier onlyAuthorizedIssuer() {
        require(authorizedIssuers[msg.sender], "Not authorized to issue IDs");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function addAuthorizedIssuer(address issuer) public onlyAdmin {
        authorizedIssuers[issuer] = true;
    }

    function removeAuthorizedIssuer(address issuer) public onlyAdmin {
        authorizedIssuers[issuer] = false;
    }

    function issueTouristID(
        bytes32 touristId,
        address touristAddress,
        string memory name,
        string memory kycHash,
        string memory itinerary,
        string memory emergencyContacts,
        uint256 validityDays
    ) public onlyAuthorizedIssuer {
        require(tourists[touristId].issueDate == 0, "Tourist ID already exists");

        tourists[touristId] = Tourist({
            name: name,
            kycHash: kycHash,
            itinerary: itinerary,
            emergencyContacts: emergencyContacts,
            issueDate: block.timestamp,
            expiryDate: block.timestamp + (validityDays * 1 days),
            isActive: true,
            issuer: msg.sender
        });

        emit TouristIDIssued(touristId, touristAddress);
    }

    function revokeTouristID(bytes32 touristId) public onlyAuthorizedIssuer {
        require(tourists[touristId].isActive, "Tourist ID is not active");
        tourists[touristId].isActive = false;
        emit TouristIDRevoked(touristId);
    }

    function verifyTouristID(bytes32 touristId) public view returns (bool) {
        Tourist memory tourist = tourists[touristId];
        return tourist.isActive && block.timestamp <= tourist.expiryDate;
    }

    function getTouristDetails(bytes32 touristId) public view returns (
        string memory name,
        string memory kycHash,
        string memory itinerary,
        string memory emergencyContacts,
        uint256 issueDate,
        uint256 expiryDate,
        bool isActive,
        address issuer
    ) {
        Tourist memory tourist = tourists[touristId];
        return (
            tourist.name,
            tourist.kycHash,
            tourist.itinerary,
            tourist.emergencyContacts,
            tourist.issueDate,
            tourist.expiryDate,
            tourist.isActive,
            tourist.issuer
        );
    }
}
