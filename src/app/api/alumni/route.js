import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Alumni from '@/lib/models/Alumni';

export async function GET() {
  try {
    await connectDB();
    const alumni = await Alumni.find({ active: true }).sort({ passingYear: -1 });
    return NextResponse.json({ success: true, data: alumni });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const newAlumni = await Alumni.create(data);
    return NextResponse.json({ success: true, data: newAlumni });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
