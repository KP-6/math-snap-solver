"use client"

import { FileUpload } from '@/components/math-solver/file-upload'
import { OCR } from '@/components/math-solver/ocr'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

export default function Home() {
  const { toast } = useToast()

  const handleFileUpload = (file: File) => {
    toast.toast({
      title: "Processing",
      description: "Your image is being processed...",
      duration: 3000,
    })
  }

  const handleOCRComplete = () => {
    toast.success("OCR processing completed successfully!")
  }

  const handleOCRError = (error: Error) => {
    toast.error(error.message)
  }

  const handleSolveClick = () => {
    toast.toast({
      title: "Solving",
      description: "Your problem is being solved...",
      duration: 3000,
    })
  }

  return (
    <div className="container mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Panel - File Upload */}
        <Card className="col-span-1 h-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary">Upload Your Problem</h2>
            <p className="text-muted-foreground">Drag & drop or capture an image of your math problem</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="relative aspect-square rounded-lg border-2 border-dashed border-input bg-muted">
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <FileUpload onFileSelect={handleFileUpload} />
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => navigator.mediaDevices.getUserMedia({ video: true })}
              >
                <Loader2 className="mr-2 h-4 w-4" />
                Capture from Camera
              </Button>
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Clear",
                    description: "All fields have been cleared",
                  })
                }}
              >
                Clear
              </Button>
            </div>
          </div>
        </Card>

        {/* Middle Panel - OCR Results */}
        <Card className="col-span-1 h-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary">Extracted Text</h2>
            <p className="text-muted-foreground">Review and edit the extracted text before solving</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Full Text</label>
              <textarea
                className="min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="OCR text will appear here..."
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Math Expression</label>
              <textarea
                className="min-h-[60px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Isolated math expression..."
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant="default"
                className="flex-1"
                onClick={handleOCRComplete}
              >
                <Loader2 className="mr-2 h-4 w-4" />
                Correct with AI
              </Button>
              <Button
                variant="ghost"
                className="flex-1"
                onClick={() => {
                  toast({
                    title: "Clear",
                    description: "Text fields have been cleared",
                  })
                }}
              >
                Clear Text
              </Button>
            </div>
          </div>
        </Card>

        {/* Right Panel - Solutions */}
        <Card className="col-span-1 h-full">
          <div className="p-6">
            <h2 className="text-2xl font-bold text-primary">Step-by-Step Solution</h2>
            <p className="text-muted-foreground">Your problem will be solved here</p>
          </div>
          <div className="p-6 space-y-4">
            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium">Problem Statement</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6"
                >
                  <Loader2 className="h-4 w-4 animate-spin" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                <p>No problem uploaded yet</p>
              </div>
            </div>
            <div className="space-y-2">
              <Button
                variant="default"
                className="w-full"
                onClick={handleSolveClick}
                disabled
              >
                <Loader2 className="mr-2 h-4 w-4" />
                Solve Problem
              </Button>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  toast({
                    title: "Clear All",
                    description: "All data has been cleared",
                  })
                }}
              >
                Clear All
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
