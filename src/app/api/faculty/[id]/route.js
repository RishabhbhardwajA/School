import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Faculty from '@/lib/models/Faculty';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const data = await request.json();
    const updated = await Faculty.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await Faculty.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
