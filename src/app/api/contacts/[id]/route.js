import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { requireAuth } from '@/lib/auth';

export async function PATCH(request, { params }) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const contact = await Contact.findByIdAndUpdate(id, { status: body.status }, { new: true });
    return NextResponse.json({ success: true, data: contact });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { id } = await params;
    await Contact.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
