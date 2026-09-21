import { NextRequest, NextResponse } from 'next/server';

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

    const rawFormData = await req.formData();
    const file = rawFormData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'File tidak ditemukan' }, { status: 400 });
    }

    // Convert Web File object to Buffer and Blob with explicit filename for undici fetch
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const blob = new Blob([buffer], { type: file.type });

    const forwardFormData = new FormData();
    forwardFormData.append('file', blob, file.name || 'image.jpg');

    // Resolusi URL backend: dukung berbagai env var, strip trailing slash dan /api jika ada
    const envBackend = 
      process.env.BACKEND_URL || 
      process.env.API_URL || 
      process.env.NEXT_PUBLIC_API_URL ||
      (process.env.NODE_ENV === 'production' ? 'http://52.64.193.232:3011' : 'http://localhost:3011');
      
    const cleanBase = envBackend.replace(/\/+$/, '').replace(/\/api$/, '');
    const uploadUrl = `${cleanBase}/api/upload`;

    console.log('[Upload API] Forwarding to:', uploadUrl, 'File:', file.name, 'Size:', file.size);

    const response = await fetch(uploadUrl, {
      method: 'POST',
      headers: { Authorization: token },
      body: forwardFormData,
    });

    console.log('[Upload API] Backend response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { message: errorText || `Upload gagal (${response.status})` };
      }
      console.error('[Upload API] Backend error:', errorData);
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('[Upload API] Exception:', error);
    return NextResponse.json(
      { message: error.message || 'Internal server error saat upload' },
      { status: 500 }
    );
  }
}

