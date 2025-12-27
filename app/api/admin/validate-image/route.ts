import { NextRequest, NextResponse } from 'next/server'
import { existsSync } from 'fs'
import { join } from 'path'

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()
    
    if (!url) {
      return NextResponse.json(
        { error: 'URL is required' },
        { status: 400 }
      )
    }

    // Check if it's a local image
    if (url.startsWith('/uploads/')) {
      const imagePath = join(process.cwd(), 'public', url)
      const exists = existsSync(imagePath)
      
      return NextResponse.json({
        valid: exists,
        url,
        message: exists ? 'Image exists' : 'Image not found on server'
      })
    }

    // For external URLs, try to fetch them
    try {
      const response = await fetch(url, { 
        method: 'HEAD',
        signal: AbortSignal.timeout(5000) // 5 second timeout
      })
      
      return NextResponse.json({
        valid: response.ok,
        url,
        status: response.status,
        message: response.ok ? 'Image accessible' : `HTTP ${response.status}`
      })
    } catch (error) {
      return NextResponse.json({
        valid: false,
        url,
        message: 'Image not accessible'
      })
    }

  } catch (error) {
    console.error('Error validating image:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
