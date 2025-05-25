import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'

interface OCRProps {
  imageSrc: string | null
  onTextChange?: (text: string) => void
}

export function OCR({ imageSrc, onTextChange }: OCRProps) {
  const [rawText, setRawText] = useState('')
  const [isolatedText, setIsolatedText] = useState('')
  const [editableText, setEditableText] = useState('')
  const [editableExpression, setEditableExpression] = useState('')
  const [preprocessedImage, setPreprocessedImage] = useState<string | null>(null)

  // Simulate OCR processing (in real app, this would call an OCR API)
  const processOCR = async (imageData: string) => {
    try {
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // In a real app, you would:
      // 1. Send the image to an OCR service
      // 2. Process the response
      // 3. Extract both full text and mathematical expressions
      
      // For now, we'll just simulate some text
      const text = "The equation is: 2x + 3 = 7\nSolve for x"
      const expression = "2x + 3 = 7"
      
      setRawText(text)
      setIsolatedText(expression)
      setEditableText(text)
      setEditableExpression(expression)
      
      // Simulate preprocessed image
      setPreprocessedImage(imageData)
      
      // Notify parent of text change
      onTextChange?.(text)
    } catch (error) {
      console.error('OCR processing failed:', error)
    }
  }

  // Process image when it changes
  useEffect(() => {
    if (imageSrc) {
      processOCR(imageSrc)
    } else {
      setRawText('')
      setIsolatedText('')
      setEditableText('')
      setEditableExpression('')
      setPreprocessedImage(null)
    }
  }, [imageSrc])

  return (
    <Card className="space-y-4">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Verify & Edit Text</h3>
        <p className="text-sm text-muted-foreground">
          Review extracted text. Edit if needed before solving.
        </p>
      </div>

      <div className="space-y-4">
        {/* Raw OCR - Full Text */}
        <div>
          <h4 className="font-medium">Raw OCR - Full Text</h4>
          <Textarea
            value={editableText}
            onChange={(e) => setEditableText(e.target.value)}
            className="min-h-[100px]"
          />
        </div>

        {/* Raw OCR - Isolated Expression */}
        <div>
          <h4 className="font-medium">Raw OCR - Isolated Expression</h4>
          <Textarea
            value={editableExpression}
            onChange={(e) => setEditableExpression(e.target.value)}
            className="min-h-[50px]"
          />
        </div>

        {/* Preprocessed Image Preview */}
        {preprocessedImage && (
          <div>
            <h4 className="font-medium">Preprocessed Image Preview</h4>
            <div className="relative aspect-square">
              <img
                src={preprocessedImage}
                alt="Preprocessed"
                className="w-full rounded-md"
              />
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            // Clear all fields
            setRawText('')
            setIsolatedText('')
            setEditableText('')
            setEditableExpression('')
            setPreprocessedImage(null)
          }}
        >
          Clear
        </Button>
        <Button
          onClick={() => {
            // In a real app, this would trigger the AI solver
            console.log('Solving problem:', editableExpression)
          }}
        >
          Solve Problem
        </Button>
      </div>
    </Card>
  )
}
