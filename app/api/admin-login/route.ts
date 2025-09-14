import { NextRequest, NextResponse } from 'next/server';

// Example admin credentials - in real app, use secure storage and hashing
const admins = [
  { id: 'admin1', password: 'password123' },
  { id: 'admin2', password: 'securepass' },
];

export async function POST(request: NextRequest) {
  try {
    const { adminId, adminPassword } = await request.json();

    const admin = admins.find(
      (a) => a.id === adminId && a.password === adminPassword
    );

    if (admin) {
      // Authentication successful
      return NextResponse.json({ success: true, message: 'Login successful' });
    } else {
      // Authentication failed
      return NextResponse.json(
        { success: false, message: 'Invalid admin ID or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Invalid request' },
      { status: 400 }
    );
  }
}
