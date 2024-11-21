import { headers } from 'next/headers'

export async function POST(request: Request) {
  const headersList = headers()
  const origin = headersList.get('origin')
  
  // Only allow requests from same origin
  if (origin !== process.env.APP_URL && origin !== 'http://localhost:3000') {
    return new Response(
      JSON.stringify({ error: "Unauthorized origin" }), 
      {
        status: 403,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }

  try {
    const { text } = await request.json()
    
    // Placeholder URL - replace with actual endpoint
    const EXTERNAL_API_URL = 'https://api.example.com/transmit'
    
    return new Response(
      JSON.stringify({ error: "Transmission functionality not yet implemented" }), 
      {
        status: 501,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': origin || '*',
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
          'Access-Control-Allow-Origin': origin || '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    )
  }
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS(request: Request) {
  const headersList = headers()
  const origin = headersList.get('origin')

  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': origin || '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}
