import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface OCRPanelProps {
  imageSrc?: string
  onTextChange?: (text: string) => void
}

export function OCRPanel({ imageSrc, onTextChange }: OCRPanelProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [ocrText, setOcrText] = useState('')
  const [confidence, setConfidence] = useState(0)
  const { toast } = useToast()

  const handleOCR = async () => {
    if (!imageSrc) return

    setIsProcessing(true)
    try {
      // TODO: Implement Genkit + Gemini OCR
      // This is a placeholder implementation
      const response = await fetch('/api/ocr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageSrc }),
      })

      if (!response.ok) throw new Error('OCR failed')

      const data = await response.json()
      setOcrText(data.text)
      setConfidence(data.confidence)
      onTextChange?.(data.text)

      toast({
        title: "Success",
        description: "OCR processing completed successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to process OCR",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>OCR Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Button
              onClick={handleOCR}
              disabled={!imageSrc || isProcessing}
              className="w-full md:w-auto"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing OCR...
                </>
              ) : (
                'Extract Text'
              )}
            </Button>
            <div className="text-sm text-muted-foreground">
              Confidence: {confidence * 100}%
            </div>
          </div>

          <div className="space-y-2">
            <Textarea
              value={ocrText}
              onChange={(e) => setOcrText(e.target.value)}
              placeholder="OCR text will appear here..."
              className="min-h-[100px]"
            />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(ocrText)
                toast({
                  title: "Copied",
                  description: "OCR text copied to clipboard",
                })
              }}
            >
              Copy Text
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setOcrText('')
                setConfidence(0)
              }}
            >
              Clear
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
