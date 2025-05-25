import { NextRequest, NextResponse } from 'next/server'
import { ocr } from '@/lib/genkit'

export async function POST(request: NextRequest) {
  try {
    const { image } = await request.json()
    
    // Mock OCR result
    const text = image
      .replace(/[^0-9\+\-\*\/=\.xX]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    
    return NextResponse.json({
      text,
      confidence: 0.95
    })
  } catch (error) {
    console.error('OCR Error:', error)
    return NextResponse.json(
      { error: 'Failed to process OCR' },
      { status: 500 }
    )
  }
}
