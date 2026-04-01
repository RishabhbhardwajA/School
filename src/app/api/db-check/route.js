import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import mongoose from 'mongoose';

export async function GET() {
  try {
    // If already connected, return success immediately
    if (mongoose.connection.readyState === 1) {
      return NextResponse.json({ status: 'connected', msg: 'MongoDB is connected remotely.' });
    }
    
    // Set a short timeout so the UI doesn't hang forever
    const connectPromise = connectDB();
    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Connection timed out. Check your .env.local string.")), 5000));
    
    await Promise.race([connectPromise, timeoutPromise]);
    
    if (mongoose.connection.readyState === 1) {
      return NextResponse.json({ status: 'connected', msg: 'MongoDB is successfully connected.' });
    } else {
      return NextResponse.json({ status: 'disconnected', error: 'No active connection state.' }, { status: 503 });
    }
  } catch (error) {
    console.error('DB Check Error:', error);
    return NextResponse.json({ status: 'error', error: error.message || 'Failed to connect to Cluster.' }, { status: 500 });
  }
}
