import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: Request) {
  // Check origin
  const headersList = headers()
  const origin = headersList.get('origin')
  
  // Only allow requests from same origin
  if (origin !== process.env.APP_URL && origin !== 'http://localhost:3000') {
    return NextResponse.json(
      { error: "Unauthorized origin" },
      { status: 403 }
    )
  }

  try {
    const { text } = await request.json()
    
    // Placeholder URL - replace with actual endpoint
    const EXTERNAL_API_URL = 'https://api.example.com/transmit'
    
    // TODO: Implement actual transmission logic
    // const response = await fetch(EXTERNAL_API_URL, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ text }),
    // })

    return NextResponse.json(
      { error: "Transmission functionality not yet implemented" },
      { status: 501 }
    )

  } catch (error) {
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 400 }
    )
  }
}
