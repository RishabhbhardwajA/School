import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admission from '@/lib/models/Admission';
import { requireAuth } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { studentName, parentName, phone, email, classApplying, dob, gender, address, previousSchool, message } = body;
    if (!studentName || !parentName || !phone || !email || !classApplying) {
      return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    }
    const admission = await Admission.create({ studentName, parentName, phone, email, classApplying, dob, gender, address, previousSchool, message });
    return NextResponse.json({ success: true, data: admission }, { status: 201 });
  } catch (error) {
    console.error("Admissions POST Error:", error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    const search = url.searchParams.get('search');
    let query = {};
    if (status && status !== 'all') query.status = status;
    if (search) query.$or = [
      { studentName: { $regex: search, $options: 'i' } },
      { parentName: { $regex: search, $options: 'i' } },
      { email: { $regex: search, $options: 'i' } },
    ];
    const admissions = await Admission.find(query).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: admissions });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
