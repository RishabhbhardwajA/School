import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TransportRoute from '@/lib/models/TransportRoute';

export async function GET() {
  try {
    await connectDB();
    const routes = await TransportRoute.find({ active: true }).sort({ monthlyFee: 1 });
    return NextResponse.json({ success: true, data: routes });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const newRoute = await TransportRoute.create(data);
    return NextResponse.json({ success: true, data: newRoute });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
