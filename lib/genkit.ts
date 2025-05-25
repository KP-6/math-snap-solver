// Mock implementation for local development
export const genkit = {
  create: () => ({
    run: async ({ input }) => ({
      text: input,
      confidence: 0.95,
      steps: [input]
    })
  })
}

// Mock OCR pipeline
export const ocr = {
  run: async ({ input }) => {
    // Mock OCR result - extract numbers and common math symbols
    const text = input
      .replace(/[^0-9\+\-\*\/=\.xX]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
    return {
      text,
      confidence: 0.95
    }
  }
}

// Mock solver pipeline
export const solver = {
  run: async ({ input }) => {
    // Mock solution steps
    const steps = [
      `Step 1: ${input}`,
      `Step 2: ${input} = ${Math.floor(Math.random() * 100)}`,
      `Step 3: Final Answer = ${Math.floor(Math.random() * 100)}`
    ]
    return { steps }
  }
}

// Mock corrector pipeline
export const corrector = {
  run: async ({ input }) => ({
    text: input
      .replace(/\s+/g, ' ')
      .trim()
  })
}

export default genkit
