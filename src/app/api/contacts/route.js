import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Contact from '@/lib/models/Contact';
import { requireAuth } from '@/lib/auth';

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, phone, message } = body;
    if (!name || !phone || !message) return NextResponse.json({ error: 'Required fields missing' }, { status: 400 });
    const contact = await Contact.create({ name, phone, email: body.email, message });
    return NextResponse.json({ success: true, data: contact }, { status: 201 });
  } catch (error) {
    console.error("Contacts POST Error:", error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const contacts = await Contact.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: contacts });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
