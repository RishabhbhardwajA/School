import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/lib/mongodb';
import { User } from '@/models/User';
import { signToken } from '@/lib/auth';

export async function POST(request) {
  try {
    const { name, email, password, secretKey } = await request.json();

    // Verify Admin Secret Key
    const ADMIN_SECRET = process.env.ADMIN_SECRET_KEY || 'DEPS2026ADMIN';
    if (!secretKey || secretKey !== ADMIN_SECRET) {
      return NextResponse.json({ error: 'Invalid Admin Secret Key. Contact the school IT department.' }, { status: 403 });
    }

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email is already registered' }, { status: 400 });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create the user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // Automatically sign them in
    const token = signToken({ email: newUser.email, role: newUser.role, id: newUser._id });
    
    const response = NextResponse.json({ success: true, token, user: { name: newUser.name, email: newUser.email } });
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });
    return response;
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Failed to create account. Please try again later.' }, { status: 500 });
  }
}
