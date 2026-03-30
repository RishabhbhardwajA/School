import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Please provide email and password' }, { status: 400 });
    }

    await connectDB();
    
    // First, check MongoDB for signed-up users
    const user = await User.findOne({ email });
    let isValidUser = false;
    let payload = null;

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        isValidUser = true;
        payload = { email: user.email, role: user.role, id: user._id };
      }
    } else {
      // Fallback to default .env admin
      const adminEmail = process.env.ADMIN_EMAIL || 'admin@delhiexcellence.edu.in';
      const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@2026';
      
      if (email === adminEmail && password === adminPassword) {
        isValidUser = true;
        payload = { email: adminEmail, role: 'admin' };
      }
    }

    if (!isValidUser) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = signToken(payload);
    
    const response = NextResponse.json({ success: true, token, user: { email: payload.email, role: payload.role } });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error. Please try again later.' }, { status: 500 });
  }
}
