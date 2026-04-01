import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Faculty from '@/lib/models/Faculty';

export async function GET() {
  try {
    await connectDB();
    const faculty = await Faculty.find({ active: true }).sort({ createdAt: 1 });
    return NextResponse.json({ success: true, data: faculty });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const newFaculty = await Faculty.create(data);
    return NextResponse.json({ success: true, data: newFaculty });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
