// Example API route for safety zones in Bhubaneswar
export async function GET(req: Request) {
  return Response.json({
    zones: [
      { name: "Safe Zone 1", coordinates: [20.2975, 85.8248], type: "safe" },
      { name: "Safe Zone 2", coordinates: [20.2950, 85.8200], type: "safe" },
      { name: "Safe Zone 3", coordinates: [20.2990, 85.8260], type: "safe" },
      { name: "Safe Zone 4", coordinates: [20.3100, 85.8300], type: "safe" },
      { name: "Safe Zone 5", coordinates: [20.3200, 85.8400], type: "safe" },
      { name: "Safe Zone 6", coordinates: [20.3050, 85.8150], type: "safe" },
      { name: "Safe Zone 7", coordinates: [20.3150, 85.8250], type: "safe" },
      { name: "Danger Zone 1", coordinates: [20.3000, 85.8300], type: "danger" },
      { name: "Danger Zone 2", coordinates: [20.2920, 85.8180], type: "danger" },
      { name: "Danger Zone 3", coordinates: [20.2940, 85.8280], type: "danger" },
      { name: "Danger Zone 4", coordinates: [20.2980, 85.8220], type: "danger" },
      { name: "Danger Zone 5", coordinates: [20.2960, 85.8290], type: "danger" },
      { name: "Danger Zone 6", coordinates: [20.3120, 85.8350], type: "danger" },
      { name: "Danger Zone 7", coordinates: [20.3180, 85.8450], type: "danger" },
    ],
  });
}
