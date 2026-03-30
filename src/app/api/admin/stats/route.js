import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Admission from '@/lib/models/Admission';
import Contact from '@/lib/models/Contact';
import { requireAuth } from '@/lib/auth';

export async function GET(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    await connectDB();
    const [totalAdmissions, pendingAdmissions, approvedAdmissions, totalContacts, newContacts] = await Promise.all([
      Admission.countDocuments(),
      Admission.countDocuments({ status: 'pending' }),
      Admission.countDocuments({ status: 'approved' }),
      Contact.countDocuments(),
      Contact.countDocuments({ status: 'new' }),
    ]);
    const recentAdmissions = await Admission.find().sort({ createdAt: -1 }).limit(5);
    const recentContacts = await Contact.find().sort({ createdAt: -1 }).limit(5);
    return NextResponse.json({
      success: true,
      data: { totalAdmissions, pendingAdmissions, approvedAdmissions, totalContacts, newContacts, recentAdmissions, recentContacts }
    });
  } catch (error) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
