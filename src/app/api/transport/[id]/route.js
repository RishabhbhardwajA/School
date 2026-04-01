import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import TransportRoute from '@/lib/models/TransportRoute';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const data = await request.json();
    const updated = await TransportRoute.findByIdAndUpdate(params.id, data, { new: true });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    await TransportRoute.findByIdAndDelete(params.id);
    return NextResponse.json({ success: true, message: 'Deleted' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
