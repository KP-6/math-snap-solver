import { NextRequest, NextResponse } from 'next/server'
import { solver } from '@/lib/genkit'

export async function POST(request: NextRequest) {
  try {
    const { problem } = await request.json()
    
    // Mock solution steps
    const steps = [
      `Step 1: ${problem}`,
      `Step 2: ${problem} = ${Math.floor(Math.random() * 100)}`,
      `Step 3: Final Answer = ${Math.floor(Math.random() * 100)}`
    ]
    
    return NextResponse.json({
      steps
    })
  } catch (error) {
    console.error('Solver Error:', error)
    return NextResponse.json(
      { error: 'Failed to solve the problem' },
      { status: 500 }
    )
  }
}
