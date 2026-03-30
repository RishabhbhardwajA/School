import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/lib/models/Announcement';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    const announcements = await Announcement.find({ active: true }).sort({ priority: -1, createdAt: -1 });
    if (announcements.length === 0) {
      return NextResponse.json({ success: true, data: [
        { text: '🎓 Admissions Open for 2026-27 — Limited Seats Available!', active: true },
        { text: '🏆 100% Board Results — 5th Consecutive Year of Excellence', active: true },
        { text: '📅 Annual Sports Day — March 15, 2026', active: true },
        { text: '📞 Call +91 11-2345-6789 for Admission Enquiry', active: true },
      ]});
    }
    return NextResponse.json({ success: true, data: announcements });
  } catch (error) {
    return NextResponse.json({ success: true, data: [
      { text: '🎓 Admissions Open for 2026-27', active: true },
    ]});
  }
}

export async function POST(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const body = await request.json();
    const announcement = await Announcement.create(body);
    return NextResponse.json({ success: true, data: announcement }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const body = await request.json();
    if (body.id) {
      const updated = await Announcement.findByIdAndUpdate(body.id, body, { new: true });
      return NextResponse.json({ success: true, data: updated });
    }
    return NextResponse.json({ error: 'ID required' }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
