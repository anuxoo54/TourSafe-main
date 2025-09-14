import { NextRequest, NextResponse } from 'next/server';

// In-memory storage for SOS alerts (in production, use database)
let sosAlerts: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { location, timestamp, message } = body;

    // Validate required fields
    if (!location || !timestamp || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Create SOS alert object
    const alert = {
      id: Date.now().toString(),
      location,
      timestamp,
      message,
      status: 'active',
      notified: {
        police: false,
        emergencyContacts: false,
      },
    };

    // Store the alert
    sosAlerts.push(alert);

    // In a real implementation, you would:
    // 1. Send notification to nearest police station
    // 2. Notify emergency contacts
    // 3. Trigger automated response systems

    console.log('SOS Alert received:', alert);

    return NextResponse.json({
      success: true,
      alertId: alert.id,
      message: 'SOS alert sent successfully',
    });
  } catch (error) {
    console.error('Error processing SOS alert:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET() {
  // Return recent SOS alerts (for admin dashboard)
  return NextResponse.json({ alerts: sosAlerts.slice(-10) }); // Last 10 alerts
}
