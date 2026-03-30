import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admission from '@/lib/models/Admission';
import { requireAuth } from '@/lib/auth';

export async function PATCH(request, { params }) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const admission = await Admission.findByIdAndUpdate(id, { status: body.status }, { new: true });
    if (!admission) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: admission });
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
    await Admission.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
