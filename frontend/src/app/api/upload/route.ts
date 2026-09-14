import { NextRequest, NextResponse } from 'next/server';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get('authorization');
    if (!token) {
      console.error('[Upload API] No authorization token provided');
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Get form data from request
    const formData = await req.formData();
    
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3011';
    const uploadUrl = `${backendUrl}/api/upload`; // FIX: Added /api prefix
    
    console.log('[Upload API] Forwarding to:', uploadUrl);
    console.log('[Upload API] Token:', token.substring(0, 20) + '...');
    
    // Forward to backend
    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: {
        'Authorization': token,
      },
      body: formData,
    });

    console.log('[Upload API] Backend response status:', response.status);

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Upload failed' }));
      console.error('[Upload API] Backend error:', error);
      return NextResponse.json(error, { status: response.status });
    }

    const data = await response.json();
    console.log('[Upload API] Success:', data);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Upload API] Exception:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
