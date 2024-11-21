import { headers } from 'next/headers'
import { validateCSRFToken } from '@/utils/csrf'

// Whitelist of allowed origins
const ALLOWED_ORIGINS = [process.env.APP_URL, 'http://localhost:3000']

// Get CSRF token from cookie
function getStoredCSRFToken(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(/csrf_token=([^;]+)/);
  return match?.[1] ?? null;  // Use optional chaining and nullish coalescing
}

export async function POST(request: Request) {
  const headersList = headers()
  const origin = headersList.get('origin')
  
  // Reject requests with no origin (like curl/terminal requests)
  if (!origin) {
    return new Response(
      JSON.stringify({ error: "Origin header required" }), 
      { status: 403 }
    )
  }

  // Only allow specific origins
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return new Response(
      JSON.stringify({ error: "Unauthorized origin" }), 
      { status: 403 }
    )
  }

  try {
    const { text, csrfToken } = await request.json()
    
    // Validate CSRF token
    const cookieHeader = headersList.get('cookie')
    const storedToken = getStoredCSRFToken(cookieHeader)
    
    if (!validateCSRFToken(csrfToken, storedToken)) {
      return new Response(
        JSON.stringify({ error: "Invalid CSRF token" }), 
        { status: 403 }
      )
    }
    
    // Placeholder URL - replace with actual endpoint
    const EXTERNAL_API_URL = 'https://api.example.com/transmit'
    
    return new Response(
      JSON.stringify({ error: "Transmission functionality not yet implemented" }), 
      {
        status: 501,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to process request" }), 
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin,
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }
}

export async function OPTIONS(request: Request) {
  const headersList = headers()
  const origin = headersList.get('origin')

  // Reject OPTIONS requests with no origin
  if (!origin) {
    return new Response(null, { status: 403 })
  }

  // Only allow specific origins
  if (!ALLOWED_ORIGINS.includes(origin)) {
    return new Response(null, { status: 403 })
  }

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin,
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
