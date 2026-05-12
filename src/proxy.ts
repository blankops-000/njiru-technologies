import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Create response
  const response = NextResponse.next();

  // Handle CORS for API routes
  if (pathname.startsWith('/api/')) {
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    const origin = request.headers.get('origin') || '';
    
    const allowedOrigins = [
      'https://njirutechnologies.co.ke',
      'http://localhost:3000'
    ];
    
    if (allowedOrigins.includes(origin)) {
      response.headers.set('Access-Control-Allow-Origin', origin);
    } else {
      // In production, you might want to be strict. For development, we can be more lenient
      // or rely on Next.js default CORS.
    }
    
    response.headers.set('Access-Control-Allow-Methods', 'GET,DELETE,PATCH,POST,PUT');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
    );
    
    // Handle preflight requests
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, { headers: response.headers, status: 200 });
    }
  }

  // Admin UI Protection: Require refresh_token cookie
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    const hasRefreshToken = request.cookies.has('refresh_token');
    
    if (!hasRefreshToken) {
      const url = new URL('/admin/login', request.url);
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/:path*'
  ],
};
