import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import FAQ from '@/lib/models/FAQ';
import { requireAuth } from '@/lib/auth';

export async function GET(request) {
  try {
    await connectDB();
    // If admin is requesting (has auth header), return ALL faqs including hidden
    const user = requireAuth(request);
    const filter = user ? {} : { active: true };
    const faqs = await FAQ.find(filter).sort({ order: 1, createdAt: 1 });
    return NextResponse.json({ success: true, data: faqs });
  } catch (error) {
    console.error('FAQs GET Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await connectDB();
    const body = await request.json();
    const { q, a, order = 0, active = true } = body;
    
    if (!q || !a) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }
    
    const faq = await FAQ.create({ q, a, order, active });
    return NextResponse.json({ success: true, data: faq }, { status: 201 });
  } catch (error) {
    console.error('FAQs POST Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await connectDB();
    const body = await request.json();
    const { id, q, a, active, order } = body;
    
    if (!id) return NextResponse.json({ error: 'FAQ ID required' }, { status: 400 });
    
    const faq = await FAQ.findByIdAndUpdate(
      id, 
      { ...(q && { q }), ...(a && { a }), ...(active !== undefined && { active }), ...(order !== undefined && { order }) }, 
      { new: true }
    );
    
    return NextResponse.json({ success: true, data: faq });
  } catch (error) {
    console.error('FAQs PUT Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const user = requireAuth(request);
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    
    await connectDB();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');
    
    if (!id) return NextResponse.json({ error: 'FAQ ID required' }, { status: 400 });
    
    await FAQ.findByIdAndDelete(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('FAQs DELETE Error:', error);
    return NextResponse.json({ error: error.message || 'Server error' }, { status: 500 });
  }
}
