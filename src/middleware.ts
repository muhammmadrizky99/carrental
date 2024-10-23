import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import prisma from './prisma';

const SECRET_KEY = process.env.JWT_SECRET || '7v7rrh56eXRmUiNLxs8Sz/3PA5lmhQlRTfChrfwQEmE=';

export async function middleware(request: NextRequest) {
  // 1. Cek token dari berbagai sumber
  const token = 
    request.cookies.get('token')?.value || 
    request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return new NextResponse(
      JSON.stringify({ message: 'Token tidak ditemukan' }), 
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }

  try {
    // 2. Verifikasi token
    const decoded = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;

    // 3. Cek user di database
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId }
    });

    if (!user) {
      return new NextResponse(
        JSON.stringify({ message: 'User tidak ditemukan' }), 
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // 4. Set user info ke request headers
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set('userId', user.id);

    // 5. Lanjutkan request dengan headers baru
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

  } catch (error) {
    console.error('Middleware error:', error);
    return new NextResponse(
      JSON.stringify({ message: 'Token tidak valid' }), 
      { 
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}

// 6. Definisikan route yang perlu middleware
export const config = {
  matcher: [
    '/api/protected/:path*',  // Proteksi API routes
    '/dashboard/:path*',      // Proteksi halaman dashboard
    // Tambahkan route lain yang perlu diproteksi
  ]
};