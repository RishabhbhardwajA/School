import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/lib/models/Gallery';

export async function GET() {
  try {
    await connectDB();
    const galleryItems = await Gallery.find({ active: true }).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: galleryItems });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const data = await request.json();
    const newItem = await Gallery.create(data);
    return NextResponse.json({ success: true, data: newItem });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
