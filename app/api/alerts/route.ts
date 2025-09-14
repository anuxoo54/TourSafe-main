import { NextRequest, NextResponse } from 'next/server';

// Mock alerts data
let alerts = [
  {
    id: '1',
    type: 'sos',
    message: 'Emergency SOS from John Doe',
    location: { lat: 20.2961, lng: 85.8245 },
    timestamp: new Date().toISOString(),
    status: 'active',
  },
  {
    id: '2',
    type: 'scam',
    message: 'Scam reported near Gateway of India',
    location: { lat: 18.9220, lng: 72.8347 },
    timestamp: new Date().toISOString(),
    status: 'resolved',
  },
];

export async function GET() {
  return NextResponse.json(alerts);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { type, message, location } = body;

  if (!type || !message || !location) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const newAlert = {
    id: Date.now().toString(),
    type,
    message,
    location,
    timestamp: new Date().toISOString(),
    status: 'active',
  };

  alerts.push(newAlert);
  return NextResponse.json({ message: 'Alert added', alert: newAlert }, { status: 201 });
}
