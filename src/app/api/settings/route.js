import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import SiteSetting from '@/lib/models/SiteSetting';
import { requireAuth } from '@/lib/auth';

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSetting.findOne({ key: 'global' });
    if (!settings) {
      settings = await SiteSetting.create({ key: 'global' });
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Settings GET Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await connectDB();
    const body = await request.json();
    
    // Whitelist updates
    const allowedUpdates = {};
    const fields = ['heroHeadline', 'heroSubheadline', 'aboutText', 'contactPhone', 'contactEmail', 'contactAddress'];
    fields.forEach(f => {
      if (body[f] !== undefined) allowedUpdates[f] = body[f];
    });
    
    let settings = await SiteSetting.findOneAndUpdate(
      { key: 'global' },
      { $set: allowedUpdates },
      { new: true, upsert: true }
    );
    
    return NextResponse.json({ success: true, data: settings });
  } catch (error) {
    console.error('Settings PUT Error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
